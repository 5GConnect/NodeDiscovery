const wss = require('../../index') 
var CachemanMemory = require('recacheman-memory');
var cache = new CachemanMemory();
const ttl = 30

module.exports.addUEendpoint = (supi, ip, port) => {
    cache.set(supi, {ip: ip, port: port}, ttl, function (err, value) {
        if (err) throw err;
        console.log('expired:', value);
        wss.clients.forEach(element => {
            wss.clients.forEach((client) => { client.send(JSON.stringify({supi: supi, event: 'ue_expired'})) });
        });
    })
}

module.exports.invalidateUEendpoint = (supi) => {
    cache.del(supi, function (err) {
        if (err) throw err;
        console.log('removed:', supi)
      });
}

module.exports.retrieveAllUEendpoint = () => {
    const res = []
    cache.getAll(function (err, data) {
        if (err) throw err;
        data.forEach(obj => {
            res.push({supi: obj.key, ip: obj.data.ip, port: obj.data.port})
        })
    })
    return res
}