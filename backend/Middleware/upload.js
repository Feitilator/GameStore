const multer = require("multer")
const path = require("path")
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "uploads/")
    },
    filename:(req,file,cb) =>{
        const ext = path.extname(file.originalname)
        const filename = crypto.randomBytes(16).toString("hex") + ext
        cb(null, filename)
    }
})

const fileFilter = (req,file,cb) =>{
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("Разрешены только JPG, PNG и WEBP"))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 5 * 1024 * 1024
    }
})

module.exports = upload