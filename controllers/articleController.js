const articles = {
    data: require('../data/articles.json'),
    setData: function (data) { this.data = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const {format} = require('date-fns')


const getArticles = (req, res) => {
    res.json(articles.data)
}

const postArticle = async (req, res) => {
    try{

        const newData = {
            id: articles.data.length+1,
            title : req.body.title,
            content : req.body.content,
            time : `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
        }
        
        articles.setData([...articles.data, newData])
        
        const reference = JSON.stringify(articles.data)
        await fsPromises.writeFile(path.join(__dirname, '..', 'data', 'articles.json'), reference)
        

        res.json([
            {
                "message" : "Post success!"
            }
        ])
    }catch(err){
        res.json([
            {
                "message" : "Post failed!"
            }
        ])
    }

}


module.exports = {getArticles, postArticle}