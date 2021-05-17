const knex = require('./database')

exports.createAccount = async function (data) {
  return knex('account').insert({
    'username': data.username,
    'password': data.password,
    'fullname': data.fullname,
    'birthday': data.birthday,
    'address': data.address,
    'phone': data.phone,
    'email': data.email,
    'job': data.job,
    'introduction': data.introduction,
    'acctype': data.acctype
  })
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
  return knex('account').where('Id', id).del()
}

exports.dropTable = async function () {
  return knex.schema.dropTable('account');
};
