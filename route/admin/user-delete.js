const {User} = require('./../../model/user.js');
module.exports = (req, res) => {
    const id = req.body.deleteId;
     User.deleteOne({'_id':id}).then((result) => {
         res.redirect('/admin/user')
     }).catch((err) => {
         console.log(err);
     });
};
