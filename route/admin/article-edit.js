const {Article} = require('./../../model/article.js');
module.exports = async (req, res) => {
    //全局变量，可以在所有的模板中访问，表示当前访问的页面是什么
    req.app.locals.currentLink = 'article';
    let {id} = req.query;
    console.log(id);
    if (id) {
        let article = await Article.findOne({
            '_id': id
        }).populate('author', 'username');
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-edit-fn?id='+id,
            button: '修改'
        });
    } else {
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        })
    }

};
