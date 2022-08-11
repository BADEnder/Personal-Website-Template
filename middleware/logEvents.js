const { v4:uuid } = require('uuid')
const { format } = require('date-fns')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvent = async (message, fileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir( path.join(__dirname, '..', 'logs') )
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), logItem)
    } catch(err) {
        console.log(err)
    }

}

const logger = (req, res, next) => {
    message = `${req.method}\t${req.headers.origin}\t${req.url}`
    logEvent(message, 'accessLog.txt')

    next()
}

module.exports = {logEvent, logger}