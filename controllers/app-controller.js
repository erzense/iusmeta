require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../models/users");
const Content = require("../models/content");
const Admins = require("../models/admins");
const siteAdmins = require("../models/siteAdmins");
const bcrypt = require("bcryptjs");

const getlogin = async (req, res) => {
  try {
    if (!req.session.isAuth) {
      res.render("login");
    } else {
      res.redirect("/");
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
        req.session.admin = admin;
        req.session.isAuth = true;
        return req.session.save(function (err) {
          res.redirect("/");
        });
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
    const contents = await Content.find({}).sort("-createdAt");
    const lastPhoto = contents[0];
    const lastPhoto2 = contents[1];
    const lastPhoto3 = contents[2];
    //console.log(lastPhoto.title, lastPhoto2.title, lastPhoto3.title);
    res
      .render("index", { contents, lastPhoto, lastPhoto2, lastPhoto3 })
      .setHeader("Content-Type", "text/html; charset=utf-8");
  } catch (error) {}
};

const postIndex = async (req, res) => {
  const { name, text, kvkk_chekcbox } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_USER,
      pass: process.env.NODE_MAILER,
    },
  });

  let mailOptions = {
    from: process.env.NODE_USER,
    to: "erayersan21@gmail.com",
    subject: "nodemailertest",
    html: `${name} <br /> ${text}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log(err);
    else console.log("mail gönderildi");
  });
  res.redirect("/");
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
    const contents = await Content.find({ author: admin.name });
    contents.forEach((content) => {
      console.log(content.title);
    });
    res.render("adminpage", { admin, contents });
  } catch (error) {}
};

const getContents = async (req, res) => {
  try {
    const queryObject = {};
    const result = Content.find(queryObject).sort("-createdAt");
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

    const contents = await Content.find(queryObject).sort("-createdAt");

    res.status(201).render("contents", { contents });
  } catch (error) {
    console.log(error);
  }
};

const createAdmin = async (req, res) => {
  try {
    const newAdmin = await siteAdmins.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ newAdmin });
  } catch (error) {
    console.log(error);
  }
};

const protectedPage = async (req, res) => {
  const admin = req.session.admin;
  res.render("protected-page", { admin });
};

const postProtectedPage = async (req, res) => {
  try {
    const content = await Content.create({
      title: req.body.post_title,
      image: req.body.post_image,
      content: req.body.editor1,
      author: req.body.author,
      categories: req.body.kategori,
    });

    console.log(content);
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getAdminDashboard = async (req, res) => {
  try {
    const admin = req.session.admin;
    const { name } = admin;
    const filter = name;
    let queryObject = { author: filter };
    const result = Content.find(queryObject);
    const contents = await result;
    console.log(contents);
    res.status(201).render("dashboard", { contents, admin });
  } catch (error) {
    console.log(error);
  }
};

const deletePostFromAdminDashboard = async (req, res) => {
  await Content.deleteOne({ _id: req.params.id });
  res.redirect("/dashboard");
};

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
  deletePostFromAdminDashboard,
  postIndex,
};
