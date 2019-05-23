//获取时间
var now = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate()
    var h = d.getHours()
    var min = d.getMinutes()
    var s = d.getSeconds()
    return `${year}/${month}/${day} ${h}:${min}:${s}`
}

var log = function() {
    console.log.apply(console, arguments)
}

//用自己定义的e替代selector
var e = function(selector) {
    return document.querySelector(selector)
}

var addBtn = e('#id-add-btn')
addBtn.addEventListener('click', function() {
    //获取input的值
    var todoName = e('#id-todo-name')
    var todo = todoName.value
    createTodo(todo, false)
    //添加后保存todos
    saveTodos()
})

var createTodo = function(todo, done) {
    //加入倒container中
    var todoContainer = e('.todo-container')
    var time = now()
    var t = templateTodo(todo, done, time)
    //添加新元素
    //将t插入到containerk内部最后（beforeend）
    todoContainer.insertAdjacentHTML('beforeend', t);
}
var insertTodo = function(todo, done) {
    //加入倒container中
    var todoContainer = e('.todo-container')
    var time = ''
    var t = templateTodo(todo, done, time)
    //添加新元素
    //将t插入到containerk内部最后（beforeend）
    todoContainer.insertAdjacentHTML('beforeend', t);
}
var templateTodo = function(todo, done, time) {
    var status = ''
    if(done) {
        status = 'done'
    }
    var t = `
        <div class="todo-list ${status}">
            <button class="todo-done">Finish</button>
            <button class="todo-delete">Delete</button>
            <span class="todo-content" contenteditable="true">${todo} ${time}</span>
        </div>
    `
return t
}

//引入事件委托
var todoContainer = e('.todo-container')
todoContainer.addEventListener('click', function(event) {
    log('contaienr click', event, event.target)
    var target = event.target
    if(target.classList.contains('todo-done')) {
        log('done')
        //给todo div 开官一个状态class
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        //改变todo完成状态后，保存todo
        saveTodos()
    } else if(target.classList.contains('todo-delete')) {
        log('delete')
        var todoDiv = target.parentElement
        todoDiv.remove()
        //删除后保存todo
        saveTodos()
    }
})
//定义toggleClass函数
var toggleClass = function(element, className) {
    if(element.classList.contains(className)) {
        //有则删除
        element.classList.remove(className)
    } else {
        //无则加上
        element.classList.add(className)
    }
}
//localStorage
//定义函数将数组写入localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}
//定义函数读取localStorage中的数据并解析
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}
//定义函数保存所有todo
var saveTodos = function() {
    //1 选出所有content标签
    //2 取出todo
    //3 添加到数组中
    //4 保存数组
    log("save todos")
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    for(var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done: done,
            content: c.innerHTML,
        }
        //加入数组
        todos.push(todo)
    }
    //保存数组
    save(todos)
}
//加载todo
var loadTodos = function() {
    var todos = load()
    log('load todos', todos)
    //将todo添加到页面
    for(var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        insertTodo(todo.content, todo.done)
    }
}
loadTodos()
