const express = require('express')
const path = require('path')
const app = express()

//启动静态文件中间件，将public文件夹设置为静态文件服务目录，该目录下文件可以通过URL直接访问
app.use(express.static(path.join(__dirname, 'public')))

//计算服务
app.get('/calc', (req, resp) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    let op = req.query.op;

    var result = 0;

    if (op === '+') {
        result = num1 + num2
    }
    else if (op === '-') {
        result = num1 - num2
    }
    else if (op === '*') {
        result = num1 * num2
    }
    else if (op === '/') {
        if(num2 === 0) {
            result = NaN
        }
        else {
            result = num1 / num2
        }
    }
    resp.send('' + result)

})

app.listen(8888, () => {
    console.log('server is listening on port 8888...')
})