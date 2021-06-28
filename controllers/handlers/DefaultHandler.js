const store = require('store')
let expirePlugin = require('store/plugins/expire')
store.addPlugin(expirePlugin)

const expirationInterval = 30000

module.exports.addUEendpoint = (supi, ip, port) => {
    var expiration = new Date().getTime() + expirationInterval
    store.set(supi, {ip: ip, port: port}, expiration)
}

module.exports.invalidateUEendpoint = (supi) => {
    store.remove(supi)
}

module.exports.retrieveAllUEendpoint = () => {
    store.removeExpiredKeys()
    const res = []
    store.each((value, key) => {
        if(!key.includes('expire_mixin')) 
            res.push({supi: key, ip: value.ip, port: value.port})
    })
    return res
}