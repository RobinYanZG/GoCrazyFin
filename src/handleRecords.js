const { groupByMonth, loopByMonth } = require('./util');

module.exports = (r, salesData) => {
    const records = groupByMonth(r, '上课时间');

    loopByMonth(records, (m, rs) => {
        rs.amount = 0;
        rs.forEach(r => {
            // const price = (salesData.totalData.number.find(nr => nr['会员卡号'] === r['会员编号']))[unitPrice];
            console.log(salesData.totalData.number.find(nr => nr['会员卡号'] === r['会员编号']))
        });
    });
}