const {Article} = require('./../../model/article.js');
const {User} = require('./../../model/user.js');
module.exports = async (req, res) => {
    //接收客户端传递过来的页码
    let page = Number(req.query.page) || 1;
    let pageSize = 10;
    let count = await Article.count({});
//全局变量，可以在所有的模板中访问，表示当前访问的页面是什么
    req.app.locals.currentLink = 'article';
    //向上取整得到总页数
    let total = Math.ceil(count / pageSize);
    //查询到开始查询的偏移量
    let start = (page - 1) * pageSize;
    //进行多集合联合查询
    let articles = await Article.find({}).limit(pageSize).skip(start).populate('author', 'username');
    res.render('admin/article.html', {
        articles: articles,
        page: page,
        total: total,
        increase: 1,
        count: count
    });
};
