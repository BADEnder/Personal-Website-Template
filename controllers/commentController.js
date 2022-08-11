const comments = {
    data: require('../data/comments.json'),
    setData: function (data) { this.data = data}
}

const fsPromises = require('fs').promises
const path = require('path')
const {format} = require('date-fns')



// Controller
const getComments = (req, res) => {
    res.json(comments.data)
}

const postComment = async (req, res) => {
    try{

        const newData = {
            id: comments.data.length+1,
            name : req.body.name,
            email : req.body.email,
            message : req.body.message,
            time : `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
        }
        
        comments.setData([...comments.data, newData])
        
        const reference = JSON.stringify(comments.data)
        await fsPromises.writeFile(path.join(__dirname, '..', 'data', 'comments.json'), reference)
        
        

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


module.exports = {getComments, postComment}