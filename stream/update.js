const express = require('express')
const app = express()

let multer = require('multer')
let upload = multer()
let child_process = require('child_process')

const ffmpeg = child_process.spawn(
  'ffmpeg -re -i pipe:0 -c:v libx264 -b:v 1600k -preset ultrafast -b:a 128k -x264opts keyint=50 -g 25 -pix_fmt yuv420p -f flv "rtmp://lowlatency.dacast.com:1935/live-181563-565927 flashver=FMLE/3.020(compatible;20FMSc/1.0) live=true pubUser=565927 pubPasswd=356634 playpath=mystream565927"',
  { shell: true }
)

app.post('/update', upload.single('blob'), (req, res) => {
  ffmpeg.stdin.write(req.file.buffer)
  res.status(200).send('ok')
})

module.exports = { path: '/stream', handler: app }
