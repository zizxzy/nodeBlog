const {Article} = require('./../../model/article.js');
const path = require('path');
const {IncomingForm} = require('formidable');
module.exports = async (req, res) => {
    const form = new IncomingForm({
        //设置上传文件之后的文件存放位置
        uploadDir: path.join(__dirname, '../', '../', 'public/upload'),
        //设置上传文件的后缀名，以便查看
        keepExtensions: true,
    });
    let {id} = req.query;
    //解析表单
    form.parse(req, async (err, fields, files) => {
            //fields存储普通的post表单请求参数
            //files存储上传的文件信息
            if (err) {
                return res.redirect('/admin/article');
            }
            let filePath = files.cover.path.split('public')[1];
            let filename = filePath.replace(/.*(\/|\\)/, "");
            let fileExt = (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename.toLowerCase()) : '';
            let fileTypes = ["jpg", "png", "jpeg", "gif"];
            var isLegal = false;
            if (fileExt) {
                for (let i = 0; i < fileTypes.length; i++) {
                    if (fileTypes[i] === fileExt[0]) {
                        isLegal = true;
                        break;
                    }
                }
                if (isLegal) {
                    let result = await Article.updateOne({'_id': id}, {
                        title: fields.title,
                        author: fields.author,
                        content: fields.content,
                        //访问/就是服务器中的public
                        cover: filePath
                    });
                }
            } else {
                let result = await Article.updateOne({'_id': id}, {
                    title: fields.title,
                    author: fields.author,
                    content: fields.content,
                });
            }
        }
    );
    res.redirect('/admin/article');
};
