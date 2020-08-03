const crypto = require("crypto").randomBytes(256).toString("hex");

module.exports = {
    uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.URL}/${process.env.DB_NAME}`,
    secret: crypto,
    db: process.env.DB_NAME
}