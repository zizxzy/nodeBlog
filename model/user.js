const mongoose = require('mongoose');
//引入bcrypt包
const bcrypt = require('bcryptjs');
const {promisify} = require('util');
const Joi = require('@hapi/joi');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        require: true,
        //保证邮箱地址唯一
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    },
    //0是启用状态 1是禁用状态
    state: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('lzy88--y', salt);
    const user = await User.create({
        username: 'oooo',
        email: '17839399885@gamil.com',
        password: hash,
        role: 'normal',
        state: 0
    })
}
//createUser();
const validateUser = (user) => {
    //定义对象的验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名小于2个字符或者大于12个字符')),
        email: Joi.string().email().required().error(new Error('邮箱格式不合法')),
        //以a-z A-z
        // 0-9开头和结尾 从3-30个字符
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不合法')),
        role: Joi.string().valid('admin', 'normal').required().error(new Error('角色不合法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态不合法'))
    });
    //返回的是一个promise对象
    return schema.validateAsync(user);
};
module.exports = {
    User,
    validateUser
};//用户集合作为模块成员进行导出
