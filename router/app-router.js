const express = require("express");
const router = express.Router()
const isAuth = require('../middleware/isAuth')
const {getIndex,postProtectedPage, protectedPage, getAbout, getContents, filterContents, getContentDetail, getAdmin, getlogin,postlogin, createAdmin} = require("../controllers/app-controller")

router.route("/").get(getIndex)

router.route("/about").get(getAbout)
router.route("/about/:id").get(getAdmin)

router.route("/login").get(getlogin)
router.route("/login").post(postlogin)

router.route('/postadmin').post(createAdmin)
router.route('/protected').get(isAuth,protectedPage)
router.route('/protected').post(isAuth,postProtectedPage)

router.route("/contents").get(getContents).post(filterContents)
router.route("/contents/:id").get(getContentDetail)




module.exports = router