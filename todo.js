var fs = require('fs') //文件系统
var path = require('path')
const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]
const dbPath = path.join(__dirname, 'db')

ensureDb()
const n = content
const list = fetch()

switch (verb) {
  case 'add':
    addTask(list, content)
    break;
  case 'list':
    break;
  case 'delete':
    removeTask(list, n)
    break;
  case 'done':
    markTaskAsDone(list, n)
    break;
  case 'edit':
    editTask(list, n, content2)
    break;
  default:
    console.log('你的操作是：' + verb)
    console.log('我不知道你要做什么')
}

display(list)
if (verb !== 'list') {
  save(list)
}




// 辅助函数
function ensureDb() {
  try {
    fs.statSync(dbPath)
  } catch (error) {
    fs.writeFileSync(dbPath, '')
  }
}
function save(list) {
  fs.writeFileSync(dbPath, JSON.stringify(list)) //存入数据库
}
function fetch() {
  const fileContent = fs.readFileSync(dbPath).toString()
  let list
  try {
    list = JSON.parse(fileContent)//反序列化
  } catch (error) {
    list = []
  }
  return list
}
function display(list) {
  for (let i = 0; i < list.length; i++) {
    const mark = list[i][1] === true ? '[x]' : '[ ]'
    console.log(mark + list[i][0])
  }
}
function addTask(list, content) {
  list.push([content, false])
}
function removeTask(list, n) {
  list.splice(n - 1, 1)
}
function markTaskAsDone(list, n) {
  list[n - 1][1] = true
}
function editTask(list, n, newContent) {
  list[n - 1][0] = newContent
}