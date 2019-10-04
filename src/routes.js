const express = require('express')
const routes = express.Router()
const multer = require('multer')
const uploadConfig = require('./config/upload')
const sessionController = require('./controllers/SessionController')
const spotController = require('./controllers/SpotConstroller')
const BookingController = require('./controllers/BookingController')
const DashboardController = require('./controllers/DashboardController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectController = require('./controllers/RejectController')


const upload = multer(uploadConfig)


routes.post('/users', sessionController.store)

routes.get('/spots', spotController.index)

routes.post('/spots',upload.single('thumbnail'), spotController.store)

routes.post('/spots/:spot_id/bookings', BookingController.store)

routes.get('/dashboard', DashboardController.show)

routes.post('/booking/:booking_id/approvals', ApprovalController.store)

routes.post('/booking/:booking_id/rejects', RejectController.store)




// routes.get('/', (req, res)=>{
//     res.send("Hello World")
// })




module.exports = routes