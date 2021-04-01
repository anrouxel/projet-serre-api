#!/usr/bin/env node

const express = require('express')
const mariadb = require('mariadb')
const fs = require('fs')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    let data = JSON.stringify({"result": "ok"})
    res.json(JSON.parse(data))
})

app.get('/config/apply/:serre/:aromate/:config/:o2_min/:o2_max', (req, res) => {
    let files = JSON.stringify({
        "serre": parseInt(req.params.serre),
        "aromate": req.params.aromate,
        "config": parseInt(req.params.config),
        "o2_min": parseInt(req.params.o2_min),
        "o2_max": parseInt(req.params.o2_max)
    })
    fs.writeFileSync('config-projet-serre-api.json', files)
    console.log(JSON.parse(files))
    res.json(JSON.parse(files))
})

app.get('/config/read', (req, res) => {
    let files = JSON.parse(fs.readFileSync('config-projet-serre-api.json'))
    console.log(files)
    res.json(files)
})

app.get('/data', (req, res) => {
    let data = JSON.stringify({
        "o2":75,
        "co2":25,
        "temperature":26,
        "humidity": 50,
        "brightness": 300
    })
    res.json(JSON.parse(data))
})

app.listen(port, () => {
    console.log('Server app listening at http://localhost:' + port)
})