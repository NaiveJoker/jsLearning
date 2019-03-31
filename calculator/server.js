const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')

const server = http.createServer((req, res) => {
    var parsedURL = url.parse(req.url)

    // 获取请求的服务路径
    var pathname = parsedURL.pathname

    // 如果是根路径/，则输出calculator.html
    if (pathname === '/') {
        // 读取文件calculator.html内容
        fs.readFile(__dirname + '/calculator.html', (err, data) => {
            // 设置服务响应头，代表响应的内容是HTML格式的
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            // 读取文件失败，则发送这段html内容
            if (err) {
                res.end("<h4>加载HTML文件失败<h4>")
            } 
            // 读取文件成功，则发送文件中的html内容
            else {
                res.end(data.toString())
            }
        })
    } 
    
    // 如果是路径/calc，则处理运算逻辑
    else if (pathname === '/calc') {
        // 从请求中，分离出从前端发送给后端的用户输入数据
        var params = querystring.parse(parsedURL.query)

        var num1 = parseFloat(params.num1)
        var num2 = parseFloat(params.num2)
        var op = params.op

        var result = 0

        // 和之前一样的计算逻辑
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

        // 设置服务响应头，代表响应的内容是纯文本格式的
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })

        // 发送计算结果（必须是字符串形式）
        res.end('' + result)
    }
})

server.listen(8888, () => {
    console.log('server is listening on port 8888 ...')
})