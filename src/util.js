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

const loopByMonth = (data, fn) => {
    const month = Object.keys(data);

    return month.map((m) => fn(m, data[m]));
}

module.exports = {
    groupByMonth,
    loopByMonth
};
