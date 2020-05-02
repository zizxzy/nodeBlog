const logout = (req, res) => {
    //删除服务器端的session
    req.session.destroy(function () {
        //删除客户端的cookie
        //删除cookie，调用clearCookie方法
        res.clearCookie('username');
        //清空userInfo
        req.app.locals.userInfo = null;
        //重定向到登录页面
        res.redirect('/admin/login');
    })
};
module.exports = logout;
