const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'it5005',
      acquireConnectionTimeout: 10000,
      timezone : "+00:00"
    }
  });
const bcrypt = require('bcrypt')

//Hàm tạo bảng
exports.createTable = function(){
  knex.schema.createTable('account', table =>{
    table.increments('userId').notNullable();
    table.string('username', 100).notNullable();
    table.string('password', 256).notNullable();
    table.string('fullname', 150).notNullable();
    table.date('birthday').notNullable();
    table.string('address', 1000).notNullable();
    table.string('phone', 12).notNullable();
    table.string('email',120).notNullable();
    table.string('job', 100).notNullable();
    table.string('introduction', 1000).notNullable().defaultTo('');
    table.string('acctype', 50).notNullable().defaultTo('Người thuê trọ');
    table.unique('username');
})};

//Hàm tạo tài khoản mới
exports.createAccount = function(data){
  let salt = bcrypt.genSaltSync(10)
  return knex('account').insert({
    'username': data.username, 
    'password': bcrypt.hashSync(data.password, salt),
    'fullname': data.fullname,
    'birthday': data.birthday,
    'address': data.address,
    'phone': data.phone,
    'email': data.email,
    'job': data.job,
    'introduction': data.introduction,
    'acctype': data.acctype
  }).then(res=>{return{"ok": 1}}).catch(err=>{return{"ok": 0, "error": err}})
}

//Hàm đăng nhập
exports.logIn = function(data){
  return knex('account').where('username', data.username).select('*')
  .then(res => { 
    if (bcrypt.compareSync(data.password, res[0].password)){
      return {"success": 1, "user": res[0]}
    }else{
      return {"success" : 0}
    }
  })
}

//Hàm lấy thông tin tài khoản
exports.getAccount= function(username){
  return knex('account').where('username', username).first()
}

//Hàm cập nhật thông tin tài khoản
exports.updateAccount = function(data){
  username = data.username;
  delete data.username;
  return knex('account').where('username', username).update(data).then((res)=>{return {"ok":1}})
  .catch(err => {return {"ok": 0, "error": err}})
}

//Xoá bảng Account
exports.dropTable = function(){
  knex.schema.dropTable('account');
};
 



/// Testing Account model
/// uncomment blow calls and run this file to test Account model

//testInsert()
// testGetAccount()
// testLogIn()
// testUpdateAccount()


function testInsert() {
  var res = exports.createAccounts({
      'username': 'Chutro1',
      'password': '123456',
      'fullname': "Đồng Văn Hiệp",
      'birthday': '2021-01-20',
      'address': 'số 1 Đại Cồ Việt',
      'phone': '0123456789',
      'email': 'hiep.dv@gmail.com',
      'job': 'Sinh viên',
      'introduction': 'Cần tìm phòng trọ',
      'acctype': 'Người thuê trọ'
  })
  res.then(res => { console.log("Insert ok: " + res.ok) })
}
function testLogIn() {
  var res = exports.logIn({
      'username': 'Chutro1',
      'password': '12345',
  })
  res.then(res => console.log(res))
}

function testGetAccount() {
  var res = exports.getAccount({ "username": 'Chutro1' })
  res.then(res => {
      console.log(res);
  })
}
function testUpdateAccount(){
  var res = exports.updateAccount({
      'username': 'Chutro1',
      'address': 'số 2 Đại Cồ Việt',
  })
  res.then(res => {
      console.log(res)
  })
}

