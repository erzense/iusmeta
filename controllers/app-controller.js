require("dotenv").config();
const User = require("../models/users");
const Content = require("../models/content");
const Admins = require("../models/admins");
const siteAdmins = require("../models/siteAdmins");
const bcrypt = require("bcryptjs");

const getlogin = async (req, res) => {
  try {
    if (!req.session.isAuth){
      res.render("login");
    }else{
      res.redirect("/")
    }
  } catch (error) {
    console.log(error);
  }
};

const postlogin = async (req, res) => {
  const email = req.body.email;
  const candidatePassword = req.body.password;
  const admin = await siteAdmins.findOne({ email });
  try {
    if (admin) {
      if (await admin.correctPassword(candidatePassword, admin.password)) {
        req.session.admin = admin
        req.session.isAuth = true;
        return req.session.save(function(err){
          
          res.redirect("/");
        })
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const getIndex = async (req, res) => {
  try {
    //res.status(200).json({ users, nbHits:Product.length });
    res.render("index");
  } catch (error) {}
};

const getAbout = async (req, res) => {
  const admins = await Admins.find({});
  try {
    res.render("about", { admins });
  } catch (error) {
    console.log(error);
  }
};

const getAdmin = async (req, res) => {
  const admins = await Admins.find({});
  try {
    const admin = admins.find((a) => a._id == req.params.id);
    res.render("adminpage", { admin });
  } catch (error) {}
};

const getContents = async (req, res) => {
  try {
    const queryObject = {};
    const result = Content.find(queryObject);
    const contents = await result;

    res.status(200).render("contents", { contents });
  } catch (error) {
    console.log(error);
  }
};

const getContentDetail = async (req, res) => {
  const contents = await Content.find({});
  try {
    const content = contents.find((c) => c._id == req.params.id);
    res.status(200).render("content-detail", { content });
  } catch (error) {
    console.log(error);
  }
};

const filterContents = async (req, res) => {
  try {
    const filter = req.body;
    let queryObject = {};
    if (filter.categories != "hepsi") {
      queryObject = { categories: filter.categories };
    }

    const result = Content.find(queryObject);
    const contents = await result;
    res.status(201).render("contents", { contents });
  } catch (error) {
    console.log(error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const newAdmin = await siteAdmins.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ newAdmin });
  } catch (error) {
    console.log(error);
  }
};

const protectedPage = async (req,res) => {
  const admin = req.session.admin
  res.render('protected-page',{admin})
}

const postProtectedPage = async (req,res) => {
  try{   
    const content = await Content.create({
      title: req.body.post_title,
      image: req.body.post_image,
      content: req.body.editor1,
      author: req.body.author,
      categories: req.body.kategori

    });
    
   console.log(content)
   res.status(201).redirect('/')
  }catch(error){
    console.log(error)
  }
  
}

const getAdminDashboard = async (req,res) => {
  const admin = req.session.admin
  const contents = await Content.find({})
  
  console.log(admin)
  
  res.status(201).render('dashboard', {admin})
}

module.exports = {
  getIndex,
  getAbout,
  filterContents,
  getContentDetail,
  getContents,
  getAdmin,
  getlogin,
  createAdmin,
  postProtectedPage,
  protectedPage,
  postlogin,
  getAdminDashboard,
};
