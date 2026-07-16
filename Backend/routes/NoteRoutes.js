const router = require("express").Router()
const AuthMiddleware = require("../middleware/AuthMiddleware")
const rateLimiter = require("../middleware/rateLimiter")

const { createNote, getMyNotes, getNoteById, revokeShare  } = require("../controllers/NoteController")

router.post("/", AuthMiddleware, createNote)

router.get("/my-notes", AuthMiddleware, getMyNotes)

router.get("/:id", AuthMiddleware, getNoteById);

router.patch("/revoke/:id", AuthMiddleware, revokeShare);

module.exports = router
 