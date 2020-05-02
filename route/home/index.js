const {Article} = require('./../../model/article.js');
const {User} = require('./../../model/user.js');
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const page = req.query.page || 1;
    //page当前页 size每页显示的条数
    // display是显示的页码数量
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author','username').exec();
    /*console.log(result);*/
    res.render('home/default', {
        result: result
    })
};
