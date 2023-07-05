const Sock = require("../model/Sock")

module.exports = {
    all: async(req, res) => {
        let socks = await Sock.find({})
        res.send(socks)
    }
}

