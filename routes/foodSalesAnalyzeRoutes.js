const express=require('express')
const foodAnalyzeController=require('../controllers/foodSalesAnalyzeController')

const router=express.Router()


router.route('/write_data').post(foodAnalyzeController.writeData)
router.route('/total_selling').get(foodAnalyzeController.totalSellingForSpecificCategory)
router.route('/total_selling_city').get(foodAnalyzeController.totalSellingForEachCity)
router.route('/total_selling_of_region').get(foodAnalyzeController.totalSellingForSpecificRegion)
//router.route('/best_selling_category').get(foodAnalyzeController.bestSellingCategory)

module.exports=router