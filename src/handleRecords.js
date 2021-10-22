const { groupByMonth, loopByMonth } = require('./util');

module.exports = (r, salesData) => {
    const records = groupByMonth(r, '上课时间');
    const revenue = {};

    loopByMonth(records, (m, rs) => {
        rs.amount = 0;
        rs.forEach(rr => {
            // const price = (salesData.totalData.number.find(nr => nr['会员卡号'] === r['会员编号']))[unitPrice];
            const test = salesData.totalData.number.find(nr => nr['会员卡号'] === rr['会员编号']);
            if (!test)  return; 
            revenue[m] = revenue[m] || {};
            revenue[m].price = revenue[m].price || 0;
            revenue[m].price += test.unitPrice;

            revenue[m].count = revenue[m].count || 0;
            revenue[m].count += 1;
        });
    });
}