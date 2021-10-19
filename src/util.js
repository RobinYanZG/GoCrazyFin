const groupByMonth = (data, dateKey) => {
    const returnObj = {};

    data.forEach((d) => {
        const date = new Date(d[dateKey]);
        const month = date.getMonth() + 1;
        returnObj[month] = returnObj[month] || [];
        returnObj[month].push(d);
    });

    return returnObj;
}

module.exports = {
    groupByMonth
};
