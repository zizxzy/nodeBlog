const {User} = require('./../../model/user.js');
module.exports = async (req, res) => {
    //全局变量，可以在所有的模板中访问，表示当前访问的页面是什么
    req.app.locals.currentLink = 'user';
    //接受客户端传来的当前页的参数，注意要把page转为Number再传进去，否则可能出现查询'page=1'+1变成查询page = 11
    let page = Number(req.query.page) || 1;
    let pageSize = 10;
    //计算数据库中的记录
    let count = await User.count({});
    //向上取整得到总页数
    let total = Math.ceil(count / pageSize);
    //查询到开始查询的偏移量
    let start = (page - 1) * pageSize;
    //分页查询
    let users = await User.find({}).limit(pageSize).skip(start);
    res.render('admin/user', {
        users: users,
        page: page,
        total: total,
        count:count,
        increase: 1
    });
};
