const rateLimit = require("express-rate-limit");

const unlockLimiter = rateLimit({

    windowMs:15*60*1000,

    max:5,

    message:{
        success:false,
        message:"Too many attempts. Try again later."
    }

});

module.exports = unlockLimiter;