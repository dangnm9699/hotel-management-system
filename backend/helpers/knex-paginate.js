var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'it5005',
        acquireConnectionTimeout: 10000,
        timezone: "+00:00"
    }
});

//Hàm hỗ trợ phân trang khi truy vấn bằng knex
//commandMaker là func trả về promise là hàm truy vấn e.g: ()=>knex('table')
exports.paginateQueries = async function (commandMaker, perPage, currentPage) {
    let offset = (currentPage - 1) * perPage
    let command1 = commandMaker()
    let command2 = commandMaker()
    let total = await command1.count()
    let rows = await command2.offset(offset).limit(perPage)
    total = total[0]['count(*)']
    let data = rows
    let pagination = {};
    pagination.total = total;
    pagination.perPage = perPage;
    pagination.to = offset + rows.length - 1;
    pagination.lastPage = Math.ceil(total / perPage);
    pagination.currentPage = currentPage;
    pagination.from = offset;
    return { data: data, pagination: pagination }

}