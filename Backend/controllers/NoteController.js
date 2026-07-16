const Note = require("../models/NoteModel")
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const generateAccessKey = require("../utils/generateAccessKey");
const generateShareToken = require("../utils/generateShareToken");



const createNote = async (req, res) => {
    try {
        const {
            title,
            content,
            accessType,
            shareType,
            expiryDate
        } = req.body

        // Validation
        if (!title || !content || !accessType || !shareType ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Generate Secure Share Token
        const shareToken = generateShareToken()

        let accessKey = null;
        let hashedAccessKey = null;

        // Generate Password if Password Protected
        if (accessType === "password") {

            accessKey = generateAccessKey();

            hashedAccessKey = await bcrypt.hash(accessKey, 10);
        }

        // Save Note
        const note = await Note.create({
            user: req.user._id,
            title,
            content,
            shareToken,
            accessType,
            shareType,
            accessKey: hashedAccessKey,
            expiryDate
        });

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            noteId: note._id,
            shareLink: `${process.env.CLIENT_URL}/share/${shareToken}`,
            accessKey
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}




const getMyNotes = async (req, res) => {

    try {

        const notes = await Note.find({
            user: req.user._id
        })
            .select("-accessKey")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            notes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



const getNoteById = async (req, res) => {

    try {

        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user._id
        }).select("-accessKey");

        if (!note) {

            return res.status(404).json({
                success: false,
                message: "Note not found"
            });

        }

        res.status(200).json({
            success: true,
            note
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


const revokeShare = async (req, res) => {

    try {

        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.isRevoked = true;

        await note.save();

        res.json({
            success: true,
            message: "Share link revoked"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = { createNote, getMyNotes, getNoteById, revokeShare }