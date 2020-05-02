const {Article} = require('./../../model/article.js');
const path = require('path');
const {IncomingForm} = require('formidable');
module.exports = (req, res) => {
    //创建一个表单解析对象
    const form = new IncomingForm({
        //设置上传文件之后的文件存放位置
        uploadDir: path.join(__dirname, '../', '../', 'public/upload'),
        //设置上传文件的后缀名，以便查看
        keepExtensions: true,
    });
    //解析表单
    form.parse(req, async (err, fields, files) => {
        //fields存储普通的post表单请求参数
        //files存储上传的文件信息
        if (err) {
            return res.redirect('/admin/article');
        }
        /*   console.log(fields);
           console.log(files.cover.path.split('public'));*/
        let result = await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            content: fields.content,
            //访问/就是服务器中的public
            cover: files.cover.path.split('public')[1]
        });
        res.redirect('/admin/article');
    });
};
