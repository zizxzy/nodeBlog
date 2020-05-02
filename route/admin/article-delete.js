const {Article} = require('./../../model/article.js');
module.exports = (req, res) => {
    const id = req.body.deleteId;
    Article.deleteOne({'_id': id}).then((article) => {
        res.redirect('/admin/article')
    }).catch((err) => {
        console.log(err);
    })
};

