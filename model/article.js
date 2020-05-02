const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        //传入错误提示
        required: [true, '请填写文章标题']
    },
    author: {
        //注意ObjectId别写成ObjectID
        type: mongoose.Schema.Types.ObjectId,
        //关联用户集合，传入的是集合名称
        ref: 'User',
        required: [true, '请填写作者名称']
    },
    publishDate: {
        type: Date,
        default: Date.now(),
    },
    cover: {
        type: String,
        default: ''
    },
    content: {
        type: String,
    }
});
//创建集合，返回集合的构造函数
const Article = mongoose.model('Article', articleSchema);
module.exports = {
    Article
};
