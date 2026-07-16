const Note = require("../models/NoteModel")
const bcrypt = require("bcryptjs");

//get shared note controller
const getSharedNote = async (req, res) => {

    try {

        const note = await Note.findOne({
            shareToken: req.params.token
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Invalid share link"
            });
        }

        if (note.isRevoked) {
            return res.status(403).json({
                success: false,
                message: "This link has been revoked"
            });
        }

        if (note.expiryDate != null) {
            if (new Date() > note.expiryDate) {
                return res.status(410).json({
                    success: false,
                    message: "Link expired"
                });
            }
        }


        if (note.shareType === "one-time" && note.isUsed) {
            return res.status(410).json({
                success: false,
                message: "One-time link already used"
            });
        }

        return res.status(200).json({
            success: true,
            accessType: note.accessType
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// unlock shared note controller
const unlockSharedNote = async (req, res) => {
    try {
        const { accessKey } = req.body || {};
        
        // Find the note
        const note = await Note.findOne({
            shareToken: req.params.token
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Invalid share link"
            });
        }

        // Check revoked
        if (note.isRevoked) {
            return res.status(403).json({
                success: false,
                message: "This link has been revoked"
            });
        }

        // Check expiry
        if (
            note.expiryDate &&
            note.expiryDate.getTime() < Date.now()
        ) {
            return res.status(400).json({
                message: "Note has expired",
            });
        }

        // Check password if required
        if (note.accessType === "password") {

            if (!accessKey) {
                return res.status(400).json({
                    success: false,
                    message: "Access key is required"
                });
            }

            const isMatch = await bcrypt.compare(
                accessKey,
                note.accessKey
            );

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid access key"
                });
            }
        }

        // ==========================
        // ONE-TIME LINK
        // ==========================
        if (note.shareType === "one-time") {

            const updatedNote = await Note.findOneAndUpdate(
                {
                    _id: note._id,
                    isUsed: false,
                    isRevoked: false
                },
                {
                    $set: {
                        isUsed: true
                    },
                    $inc: {
                        viewCount: 1
                    }
                },
                {
                    new: true
                }
            );

            if (!updatedNote) {
                return res.status(410).json({
                    success: false,
                    message: "This one-time link has already been used"
                });
            }

            return res.status(200).json({
                success: true,
                note: {
                    title: updatedNote.title,
                    content: updatedNote.content
                }
            });
        }

        // ==========================
        // TIME-BASED LINK
        // ==========================
        await Note.findByIdAndUpdate(
            note._id,
            {
                $inc: {
                    viewCount: 1
                }
            }
        );

        return res.status(200).json({
            success: true,
            note: {
                title: note.title,
                content: note.content
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};





module.exports = { getSharedNote, unlockSharedNote }