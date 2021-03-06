const config = require('../config/config')
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config.dbHost,
        user: config.userDB,
        password: config.passwordDB,
        database: config.db,
        acquireConnectionTimeout: 10000,
        timezone: "+07:00"
    }
});

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = knex