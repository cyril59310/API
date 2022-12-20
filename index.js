const config = require("./config")
const express = require('express')
const os = require('os')
const moment = require('moment')

const app = express()
const port=config.port;
const uptimeapi = moment().format("DD/MM/YY, HH:mm")

app.listen(port, () => {
    console.log(`APi démarré: http:localhost:${port}`)
})

app.get('/', (req, res) =>{
    res.end('<html><h1>Bienvenue sur L\'API de Cyril59310</h1></html>')
})

app.get('/info-ram', (req, res) => { 
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usedMemInMB = Math.round(usedMem / 1048576);
    const totalMemInMB = Math.round(totalMem / 1048576);
    const freeMemInMB = Math.round(freeMem / 1048576);
    let json = {
        "TotalRam": totalMemInMB, "UsedRam": usedMemInMB, "FreeRam": freeMemInMB
    }
    let newJson = JSON.stringify(json)
    res.send(newJson)
})

app.get('/vps-uptime', (req, res) => {
    const uptime = os.uptime();
    const days = Math.floor(uptime  / 86400);
    let json = {
        "Uptime": days
    }
    let newJson = JSON.stringify(json)
    res.send(newJson)
})

app.get('/api-uptime', (req, res) => {
    let json = {
        "Uptime": uptimeapi
    }
    let newJson = JSON.stringify(json)
    res.send(newJson)
})

app.use(function(req, res) {
    res.writeHead(404);
    res.end('Erreur API: Page introuvable')
})