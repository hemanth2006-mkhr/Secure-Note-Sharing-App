const crypto = require("crypto");

const generateAccessKey = () => {
    return crypto.randomBytes(4).toString("hex").toUpperCase();
};

module.exports = generateAccessKey;