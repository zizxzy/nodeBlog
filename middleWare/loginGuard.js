const guard = (req, res, next) => {
    //实现登录拦截器
    //访问的不是登录页面，并且没有登录
    if (req.url !== '/login' && !req.session.username) {
        //重定向必须要加上/
        return res.redirect('/admin/login');
    } else {
        if (req.session.role === 'normal' && req.url === '/login') {
            //删除cookie
            res.clearCookie('username');
            //重定向到登录页面
            req.app.locals.userInfo = null;
            return res.redirect('/admin/login');
        } else {
            if (req.session.role && req.url === '/logout') {
                next();
                return;
            }
            if (req.session.role === 'normal' && req.url !== '/login') {
                return res.redirect('/home/');
            }
        }
        next();
    }
};
module.exports = guard;


