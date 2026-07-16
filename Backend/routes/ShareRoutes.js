const router = require("express").Router()
const {getSharedNote, unlockSharedNote, revokeShare} = require("../controllers/ShareController");
const AuthMiddleware = require("../middleware/AuthMiddleware")
const rateLimiter = require("../middleware/rateLimiter")


router.get("/:token", getSharedNote);

router.post("/:token/unlock", unlockSharedNote);


module.exports = router