const mongoose = require('mongoose');
//创建评论集合model
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});
//得到評論集合构造函数
const Comment = mongoose.model('Comment', commentSchema);
module.exports = {
    Comment
};
