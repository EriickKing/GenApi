const crypto = require("crypto").randomBytes(256).toString("hex");

module.exports = {
    uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds033907.mlab.com:33907/genapi`,
    secret: crypto,
    db: 'GenApi'
}