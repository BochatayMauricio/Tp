const multer = require('multer');
const path = require('path');

const storadge = multer.diskStorage({
  destination: path.join(__dirname,'../Images'),
  filename: (req:any,file:any,cb:any)=>{
    cb(null,`Image${Date.now()}.${file.mimetype.split('/')[1]}`)
  }
})

module.exports = storadge;