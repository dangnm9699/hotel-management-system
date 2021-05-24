const knex = require('./database')

exports.createAccount = async function (data) {
  let newData = {
    'username': data.username,
    'password': data.password,
    'acctype': data.acctype,
  };
  if (data.NVID){
    newData.NVID = data.NVID
  }
  return knex('account').insert(newData)
}

exports.getAccount = async function (username) {
  return knex('account').where('username', username).first()
}

exports.getAccountList = async function (page, perpage) {
  return knex('account').paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
}

exports.updateAccount = async function (id, data) {
  return knex('account').where('Id', id).update(data)
}

exports.deleteAccount = async function (id) {
  return knex('account').where('account.Id', id).del()
}

exports.dropTable = async function () {
  return knex.schema.dropTable('account');
};

exports.getAccountList = async function (page, perpage) {
  return knex('account').leftJoin('NV', 'account.NVID', 'NV.Id').select(['account.Id', 'account.username',
    'account.acctype', 'account.NVID', 'NV.name', 'NV.role', 'NV.address', 'NV.birthday',
     'NV.idNumber', 'NV.description', 'NV.phonenumber', 'NV.status']).paginate({ perPage: perpage, currentPage: page, isLengthAware: true });
}
exports.searchUsername = async function (page, perpage, key) {
  return knex('account').where('username', 'like', `%${key}%`).select('username').paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}

exports.searchAccount = async function (page, perpage, key) {
  return knex('account').where('username', 'like', `%${key}%`).leftJoin('NV', 'account.NVID', 'NV.Id').select(['account.Id', 'account.username',
  'account.acctype', 'account.NVID', 'NV.name', 'NV.role', 'NV.address', 'NV.birthday',
   'NV.idNumber', 'NV.description', 'NV.phonenumber', 'NV.status'])
  .paginate({ perPage: perpage, currentPage: page, isLengthAware: true })
}
exports.getAccountById = async function (id) {
  return knex('account').where('account.Id', id).leftJoin('NV', 'account.NVID', 'NV.Id').select(['account.Id', 'account.username',
  'account.acctype', 'account.NVID', 'NV.name', 'NV.role', 'NV.address', 'NV.birthday',
   'NV.idNumber', 'NV.description', 'NV.phonenumber', 'NV.status']).first()
}
exports.changePassword = async function (Id, newPassword) {
  return knex('account').where('Id', Id).update('password', newPassword)
}
