const {User} = require('./../../model/user.js');
const bcrypt = require('bcryptjs');
module.exports = async (req, res,next) => {
    //id是通过get请求传递的，通过req.query获取
    const {id} = req.query;
    //密码从表单提交的对象中获取
    const {password,...other} = req.body;
    /*console.log(other);*/
    //根据id查询到一个对象
    let user = await User.findOne({'_id': id});
    //比较是否相同
    let isEqual = bcrypt.compareSync(password, user.password);
    if (isEqual) {
        //以密码作为唯一标识，如果管理员想修改一个用户的信息，则密码必须填写正确才能修改
        //邮箱没有被占用，对密码进行加密之后将整个请求表单req.body存进数据库
        const salt = bcrypt.genSaltSync(10);
        //替换明文密码为加密之后的哈希值
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        //修改除密码之外的其他属性，确保安全性
        let result = await User.updateOne({'_id': id},other);
        res.redirect('/admin/user');
    } else {
        //密码对比失败，抛出一个错误，让app.js中的错误处理中间件处理错误
        //next接受一个字符串
        next(JSON.stringify({
            path: `/admin/user-edit`,
            message: `密码比对失败，不能进行用户信息修改`,
            id:id
        }))
    }
};
