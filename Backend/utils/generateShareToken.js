const crypto = require("crypto");

const generateShareToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

module.exports = generateShareToken;