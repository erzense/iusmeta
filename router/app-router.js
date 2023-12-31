const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const {
  getIndex,
  postProtectedPage,
  protectedPage,
  getAbout,
  getContents,
  filterContents,
  getContentDetail,
  getAdmin,
  getlogin,
  postlogin,
  createAdmin,
  getAdminDashboard,
  deletePostFromAdminDashboard,
  postIndex,
  updatePostFromAdminDashboard,
  updatePost,
} = require("../controllers/app-controller");

router.route("/").get(getIndex);
router.route("/").post(postIndex);

router.route("/about").get(getAbout);
router.route("/about/:id").get(getAdmin);

router.route("/login").get(getlogin);
router.route("/login").post(postlogin);

router.route("/postadmin").post(createAdmin);
router.route("/dashboard/add-post").get(isAuth, protectedPage);
router.route("/dashboard/add-post").post(isAuth, postProtectedPage);

router.route("/dashboard").get(isAuth, getAdminDashboard);
router.route("/dashboard/delete/:id").get(isAuth, deletePostFromAdminDashboard);
router.route("/dashboard/update/:id").get(isAuth, updatePostFromAdminDashboard);
router.route("/dashboard/update/:id").patch(isAuth, updatePost);

router.route("/contents").get(getContents).post(filterContents);
router.route("/contents/:id").get(getContentDetail);

router.route("/cr").post(createAdmin);

module.exports = router;
