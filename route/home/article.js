const {Article} = require('./../../model/article.js');
const {Comment} = require('./../../model/comment.js');
module.exports = async (req, res) => {
    const {id} = req.query;
    let article = await Article.findOne({'_id': id}).populate('author', 'username');
    let comments = await Comment.find({aid: id}).populate('uid');
    console.log(comments);
    res.render('home/article', {
        article: article,
        comments: comments
    });
};
