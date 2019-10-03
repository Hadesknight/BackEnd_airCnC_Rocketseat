const multer = require('multer')
const path = require('path')

module.exports = {
    storage : multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','upload'),
        filename(req, file, cb){
            const ext = path.extname(file.originalname)
            ext.trim()
            const name = path.basename(file.originalname, ext)
            name.trim()
            cb(null, `${name}-${Date.now()}${ext}`)

        }
    })
}