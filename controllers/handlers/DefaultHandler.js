const store = require('store')
let expirePlugin = require('store/plugins/expire')
store.addPlugin(expirePlugin)

module.exports.addUEendpoint = (supi, ip, port) => {
    store.set(supi, {ip: ip, port: port})
}

module.exports.invalidateUEendpoint = (supi) => {
    store.remove(supi)
}

module.exports.retrieveAllUEendpoint = () => {
    const res = []
    store.each((value, key) => {
       res.push({supi: key, ip: value.ip, port: value.port})
    })
    return res
}