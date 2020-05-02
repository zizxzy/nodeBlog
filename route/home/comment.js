//导入集合构造函数
const {Comment} = require('./../../model/comment.js');
module.exports = async (req, res) => {
    const {content, uid, aid} = req.body;
    let result = await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: Date.now(),
    });
    res.redirect('/home/article?id=' + aid);
};
