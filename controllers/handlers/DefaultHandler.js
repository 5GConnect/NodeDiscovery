const activeUsers = new Map()

removeActiveUser = (supi) => {
    activeUsers.delete(supi)
    global.wss.clients.forEach((client) => { client.send(JSON.stringify({ supi: supi, event: 'ue_expired' })) })
}

sendUEJoined = () => {
    global.wss.clients.forEach((client) => { client.send(JSON.stringify({ event: 'ue_joined' })) })
}

module.exports.addUEendpoint = (supi, ip, port) => {
    let activeUE = activeUsers.get(supi)
    if (activeUE !== undefined) {
        clearTimeout(activeUE.timer)
        activeUE.timer = setTimeout(() => removeActiveUser(supi), process.env.KEEP_ALIVE_TIME_IN_MS)

    } else {
        activeUsers.set(supi, {
            ueInformation: { ip: ip, port: port },
            timer: setTimeout(() => removeActiveUser(supi), process.env.KEEP_ALIVE_TIME_IN_MS)
        })
        sendUEJoined()
    }
}

module.exports.invalidateUEendpoint = (supi) => {
    removeActiveUser(supi);
}

module.exports.retrieveAllUEendpoint = () => {
    const res = []
    for (const [supi, ueInfoAndTimer] of activeUsers.entries()) {
        res.push({ supi: supi, ip: ueInfoAndTimer.ueInformation.ip, port: ueInfoAndTimer.ueInformation.port })
    }
    return res
}