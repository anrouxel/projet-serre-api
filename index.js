#!/usr/bin/env node

const express = require('express')
const mariadb = require('mariadb')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.json(JSON.stringify({
        "result": "ok"
    }))
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

app.listen(port, () => {
    console.log('Server app listening at http://localhost:' + port)
})