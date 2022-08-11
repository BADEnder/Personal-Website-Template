const express = require('express')
const path = require('path')

const router = express.Router()
const articleController = require('../../controllers/articleController')

router.route('/')
    .get(articleController.getArticles)
    .post(articleController.postArticle)



module.exports = router;