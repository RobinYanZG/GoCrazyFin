const XLSX = require('xlsx');

const handleSales = require('./handleSales');
const handleRecords = require('./handleRecords');

const workbook = XLSX.readFile(`${__dirname}/file/test.xlsx`, { cellDates: true });

const memberSheetName = '会员基础表';
const recordSheetName = '上课记录表';
const salesSheetName = '销售记录表';
const cardsSheetName = '卡表';
const paymentMethodSheetName = '支付渠道表';

const generateData = (sheetName, handleFn) => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return handleFn(data);
}

const filterEmptySalesData = (data) => data;
// const filterEmptySalesData = (data) => data.filter((d) => !!d['开卡时间'] && !!d['结束时间']);
const filterNumberCards = (data) => data.filter( d => d['卡类型'] === '次数卡');
const filterTimeCards = (data) => data.filter( d => d['卡类型'] === '时限卡');

const sales = generateData(salesSheetName, filterEmptySalesData);
const numberCards = generateData(cardsSheetName, filterNumberCards);
const timeCards = generateData(cardsSheetName, filterTimeCards);
const records = generateData(recordSheetName, filterEmptySalesData);

const salesData = handleSales(sales, numberCards, timeCards);

const data = handleRecords(records, salesData);