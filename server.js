const express = require('express')
const port = process.env.PORT || 3000
let app = require('express')()
let http = require('http').Server(app)

/*
 *  Serve /dist/ folder
 */
app.use(express.static(__dirname + '/dist'))
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})