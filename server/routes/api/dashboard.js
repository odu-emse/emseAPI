import express from 'express'
const dashboard = express.Router()

//Query record based on difficulty grater than filter
dashboard.get('/' , (req, res) => {
  res.render('dashboard', {
    activeDashboard: true,
    title: "Dashboard",
    //name: req.user.firstName,
    auth: true
  })
})

export { dashboard }