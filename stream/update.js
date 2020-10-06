const express = require('express')
const app = express()

let multer = require('multer')
let upload = multer()
let child_process = require('child_process')

app.post('/update', upload.single('blob'), (req, res) => {
  const ffmpeg = child_process.spawn('ffmpeg', [
    // ... ffmpeg settings ...
    // Still figuring out
    '-loglevel',
    'warning',
    '-vcodec',
    'libx264',
    '-f',
    'flv',

    // final argument should be the output, which in this case is our RTMP
    'rtmp://lowlatency.dacast.com:1935/live-181563-565927/mystream565927',
  ])
  ffmpeg.stdin.write(req.file.buffer)
  console.log(req.file)
  res.status(200).send('ok')
})

module.exports = { path: '/stream', handler: app }
