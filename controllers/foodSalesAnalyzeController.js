const {PrismaClient} = require('@prisma/client')
const XLSX = require('xlsx')
const analysisService = require('../services/Analysis').getInstance()
const prisma = new PrismaClient()

exports.writeData = async (req, res) => {
    const workBook = XLSX.readFile('./files/Food-Sales.xlsx')
    const workSheet = workBook.Sheets['FoodSales']
    const sheetToJson = XLSX.utils.sheet_to_json(workSheet)
    for (let i = 0; i < sheetToJson.length; i++) {
        await prisma.sale.create({
            data: {
                city: sheetToJson[i].City,
                category: sheetToJson[i].Category,
                product: sheetToJson[i].Product,
                region: sheetToJson[i].Region,
                date: sheetToJson[i].Date,
                quantity: sheetToJson[i].Qty,
                unitPrice: sheetToJson[i].UnitPrice,
                totalPrice: sheetToJson[i].TotalPrice
            }
        })
    }

    res.send({
        message: "successful writing",
        statusCode: 200
    })
}

// exports.totalSellingCategory = async (req, res) => {
//     const totalSellingCategory = analysisService.totalSellingCategory(req.query.region)
//     res.send({
//         date: new Date().toUTCString(),
//         statusCode: 200,
//         totalSellingCategory: totalSellingCategory,
//     })
// }

exports.totalSellingForSpecificCategory = async (req, res) => {
    const category = req.query.category
    const output = {
        category: category,
        totalSelling: 0
    }
    const allRowsForSpecificCategory = await prisma.sale.findMany({
        where: {
            category: category
        }
    })

    allRowsForSpecificCategory.forEach((row) => {
        output.totalSelling += row.totalPrice
    })
    res.send(output)
}

exports.totalSellingForEachCity = async (req, res) => {
    const city = req.query.city
    const output = {
        city: city,
        totalSelling: 0
    }
    const allRowsForSpecificCity = await prisma.sale.findMany({
        where: {
            city: city
        }
    })

    allRowsForSpecificCity.forEach((sale)=>{
      output.totalSelling+=sale.totalPrice
    })

    res.send(output)
}

exports.totalSellingForSpecificRegion = async (req, res) => {
    const region=req.query.region
    const output={
        region:'',
        totalSelling:0
    }
    if(region==='west'){
        output.region='West'
        const allRowsForSpecificCity = await prisma.sale.findMany({
            where: {
                region: 'West'
            }
        })

        allRowsForSpecificCity.forEach((row)=>{
            output.totalSelling+=row.totalPrice
        })

        return res.send(output)
    } else if(region==='east'){
        output.region='East'
        const allRowsForSpecificCity = await prisma.sale.findMany({
            where: {
                region: 'East'
            }
        })

        allRowsForSpecificCity.forEach((row)=>{
            output.totalSelling+=row.totalPrice
        })
        return res.send(output)
    } else {
        output.region='entire country'
        const allRowsForSpecificCity = await prisma.sale.findMany({})

        allRowsForSpecificCity.forEach((row)=>{
            output.totalSelling+=row.totalPrice
        })
        return res.send(output)
    }
}

// exports.bestSellingCategory = async (req, res) => {
//     const bestSellingCategory = analysisService.bestSellingCategory(req.query.region)
//     if (!req.query.region) {
//         return res.send({
//             date: new Date().toUTCString(),
//             statusCode: 200,
//             message: `Best selling category in the USA is ${bestSellingCategory}`,
//         })
//     }
//     res.send({
//         date: new Date().toUTCString(),
//         statusCode: 200,
//         message: `Best selling category in the ${req.query.region} is ${bestSellingCategory}`,
//     })
// }
