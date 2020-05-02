//管理员路由的配置
const express = require('express');
const bcrypt = require('bcryptjs');
const {User} = require('./../model/user.js');
const admin = express.Router();
//匹配二级路由 /相当于不写
admin.get('/login', (req, res) => {
    res.render('admin/login');
});
//实现登录功能
admin.post('/login',require('./admin/login.js'));
//创建用户列表路由
admin.get('/user',require('./admin/userPage.js'));
//实现用户退出登录功能
admin.get('/logout',require('./admin/logout.js'));
//用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit.js'));
//用户新增页面路由
admin.post('/user-edit',require('./admin/user-edit-fn.js'));
//用户信息修改页面路由
admin.post('/user-add',require('./admin/user-add.js'));
//用户信息删除路由
admin.post('/user-delete',require('./admin/user-delete.js'));
//文章列表页面路由
admin.get('/article',require('./admin/article.js'));
//文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit.js'));
//新增文章页面路由
admin.post('/article-add',require('./admin/article-add.js'));
//修改文章页面路由
admin.post('/article-edit',require('./admin/article-edit-fn.js'));
//文章信息删除路由
admin.post('/article-delete',require('./admin/article-delete.js'));
//文章信息修改路由
admin.post('/article-edit-fn',require('./admin/article-edit-fn.js'));
module.exports = admin;
