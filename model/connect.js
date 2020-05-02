const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = global.Promise;
//根据环境读取json文件中相应的配置
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
    //useMongoClient您可以在顶层声明许多声明和配置，而无需所有额外的嵌套
    useMongoClient: true
}).then(res => {
    console.log('数据库连接成功')
}).catch(err => console.log(err));
