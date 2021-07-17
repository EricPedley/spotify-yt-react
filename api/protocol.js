let protocol="https"
if(process.env.NODE_ENV==="development")
    protocol="http"
module.exports = protocol;