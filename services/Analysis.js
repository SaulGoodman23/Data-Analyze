const XLSX = require('xlsx')

class Analysis {
    static instance
    data

    constructor() {
        const workBook = XLSX.readFile('./files/Food-Sales.xlsx')
        const workSheet = workBook.Sheets['FoodSales']
        this.data = XLSX.utils.sheet_to_json(workSheet)
    }

    totalSellingCategory(region) {
        if (region === 'west') {
            return this.totalSellingCategoryInWest()
        } else if (region === 'east') {
            return this.totalSellingCategoryInEast()
        } else {
            return this.calculateTotalSalesForEachCategory(this.data)
        }
    }

    totalSellingCategoryInWest() {
        // Filtering
        const filteredData = this.data.filter((el) => {
            if (el.Region === 'West') return el
        })
        return this.calculateTotalSalesForEachCategory(filteredData)
    }

    totalSellingCategoryInEast() {
        // Filtering
        const filteredData = this.data.filter((el) => {
            if (el.Region === 'East') return el
        })
        return this.calculateTotalSalesForEachCategory(filteredData)
    }

    bestSellingCategory(region) {
        if (region === 'west') {
             const totalSellingCategoryInWest=this.totalSellingCategoryInWest()
             return this.specifyBestSellingCategory(totalSellingCategoryInWest)

        } else if (region === 'east') {
            const totalSellingCategoryInEast=this.totalSellingCategoryInEast()
            return this.specifyBestSellingCategory(totalSellingCategoryInEast)
        } else {
            const totalSellingCategory=this.calculateTotalSalesForEachCategory(this.data)
            return this.specifyBestSellingCategory(totalSellingCategory)
        }
    }

    calculateTotalSalesForEachCategory(data) {
        const totalSalesForEachCategory = {}
        for (let i = 0; i < data.length - 1; i++) {
            if (!totalSalesForEachCategory[data[i].Category]) {
                totalSalesForEachCategory[data[i].Category] = data[i].TotalPrice
            } else {
                totalSalesForEachCategory[data[i].Category] += data[i].TotalPrice
            }
        }
        return totalSalesForEachCategory
    }

    specifyBestSellingCategory(totalSales){
        return Object.keys(totalSales).reduce((a, b) => totalSales[a] > totalSales[b] ? a : b)
    }

    static getInstance() {
        if (this.instance) return this.instance
        return this.instance = new Analysis()
    }
}

module.exports = Analysis