const fs = require('fs')
const path = require('path')
const http = require('http')

const getFileName = (url) => {
    switch (url) {
      case '/': {
        return path.join(__dirname, 'index.html')
      }
      case 'server.js': {
        return undefined
      }
      default: {
        return path.join(__dirname, url)
      }
    }
}

const server =  http.createServer(function (req, res) {
    const file = getFileName(req.url)

    fs.readFile(file, function (err,data) {
      if (err) {
        console.error(err.message)
        res.writeHead(404)
        res.end(JSON.stringify(err))
        return
      }
      res.writeHead(200)
      res.end(data)
    })
}).listen(8080)

process.on('SIGINT', () => {
  console.log('Closing server, exiting process...')
  server.close()
  process.exit()
})
