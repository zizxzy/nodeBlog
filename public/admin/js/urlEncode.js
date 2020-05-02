//进行url参数拼接的方法，并做了中文格式编码到转换
const encodeParams = (obj)=> {
    const params = [];
    Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
            value = ''
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='))
    });
    return params.join('&')
};
module.exports = encodeParams;
