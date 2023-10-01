const XLSX=require('xlsx')

const workBook=XLSX.readFile('./files/Food-Sales.xlsx')
const workSheet=workBook.Sheets['FoodSales']
const sheetToJson=XLSX.utils.sheet_to_json(workSheet)

// const east=sheetToJson.filter((el)=>{
//     if(el.Region==='East') return el
// })
//
// console.log(east)