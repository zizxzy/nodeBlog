const Joi = require('@hapi/joi');
//定义验证规则
const schema = Joi.object({
    username: Joi.string().min(2).max(10)
});
/*console.log(schema.validate({username: 'l'}));*/
const validate = async () => {
    try {
        const value = await schema.validateAsync({username: 'c'});
    } catch (err) {
        console.log(err.details[0].message);
        return ;
    }
    console.log('验证通过');
};
validate();
