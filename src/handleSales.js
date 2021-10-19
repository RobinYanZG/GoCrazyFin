const { groupByMonth } = require('./util');

const getNumberOfCard = (id, cards) => (cards.find(c => c['编号'] === id))['卡次数']

const calculateUnitPrice = (numberSales, timeSales) => {
    numberSales.forEach(d => {
        const number = getNumberOfCard(d['卡类'], numberCards);
        const unitPrice = d['实际成交价格'] / number;
        d.unitPrice = unitPrice;
    });

    timeSales.forEach(d => {
        const startDate = d['开卡时间'];
        const endDate = d['结束时间'];
        const gap = endDate.getTime() - startDate.getTime();
        const unitPrice = Math.floor(gap / (24 * 3600 * 1000))   
        d.unitPrice = d['实际成交价格'] / unitPrice;
    })
}

const calculateNumberUnitPrice = (d, numberCards) => {
    const number = getNumberOfCard(d['卡类'], numberCards);
    return d['实际成交价格'] / number;
}

const calculateTimeUnitPrice = (d) => {
    const startDate = d['开卡时间'];
        const endDate = d['结束时间'];
        const gap = endDate.getTime() - startDate.getTime();
        const unitPrice = Math.floor(gap / (24 * 3600 * 1000))   
        return d['实际成交价格'] / unitPrice;
}

module.exports = handleSales = (salesData, numberCards, timeCards) => {
    const returnData = {};
    const monthlyData = groupByMonth(salesData, '购买日期');
    const month = Object.keys(monthlyData);
    month.forEach((m) => {
        returnData[m] = {
            amount: 0,
            time: [],
            number: []
        };

        monthlyData[m].forEach(d => {
            returnData[m].amount += d['实际成交价格'];
            if(numberCards.find(c => c['编号'] === d['卡类'])) {
                d.unitPrice = calculateNumberUnitPrice(d, numberCards);
                returnData[m].number.push(d)
            }
    
            if(timeCards.find(c => c['编号'] === d['卡类'])) {
                if (!!d['开卡时间'] && !!d['结束时间']) {
                    d.unitPrice = calculateTimeUnitPrice(d);
                } else {
                    d.unitPrice = 0;
                }
                returnData[m].time.push(d)
            }
        });
        
    });

    return returnData;
}
