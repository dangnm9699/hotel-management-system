const knex = require('./database')

exports.addTimeKeeping = async function (data) {
    let check = await knex('cham_cong').where("NVId", data.NVId).where("date", new Date(data.date)).select('Id').first()
    //console.log(check)
    if (!check) {
        return knex('cham_cong').insert({
            NVId: data.NVId,
            date: new Date(data.date)
        })
    }
    return check
}

exports.deleteTimeKeeping = async function (id) {
    return knex('cham_cong').where('Id', id).del()
}

exports.getTimeKeeping = async function (listNV, beginTime, endTime) {
    return knex('cham_cong').whereIn('NVId', listNV).where('date', '>=', beginTime).where('date', '<=', endTime)
}