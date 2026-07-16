const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },

    content: {
        type: String,
        required: [true, "Content is required"],
    },

    shareToken: {
        type: String,
        unique: true,
        required: true,
    },

    accessType: {
        type: String,
        enum: ["public", "password"],
        required: true,
    },

    shareType: {
        type: String,
        enum: ["one-time", "time-based"],
        required: true,
    },

    accessKey: {
        type: String,
        default: null,
    },

    expiryDate: {
        type: Date,
        default: null,
    },

    isUsed: {
        type: Boolean,
        default: false,
    },

    isRevoked: {
        type: Boolean,
        default: false,
    },

    viewCount: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    }
)

const NoteModel = mongoose.model('Note', NoteSchema)

module.exports = NoteModel