const express = require('express')
const path = require('path')

const router = express.Router()



router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'index.html'))
})
  
router.get('/explo-num(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'explo-num.html'))
})

router.get('/admin(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin.html'))
})


module.exports = router