//博客首页首页路由的配置
const express = require('express');
const home = express.Router();
//匹配二级路由 /相当于不写
home.get('/', require('./home/index.js'));
home.get('/article', require('./home/article.js'));
home.post('/comment', require('./home/comment.js'));
module.exports = home;
