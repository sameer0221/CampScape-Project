if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

// console.log(process.env.SECRET);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const { isLoggedIn, saveRedirectUrl, isOwner, validateListing, validateReview, isReviewAuthor } = require("./middleware.js");
const Review = require("./models/review.js");
const multer  = require('multer')
const {storage} = require("./cloudConfig.js");
const upload = multer({ storage })
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
// console.log("Connecting with URL:", dbUrl);
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log(res.locals.success); 
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else next();
// };

// const validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else next();
// };

const listingController = require("./controllers/listings.js");
// Index Route
app.get(
  "/listings",
  wrapAsync(listingController.index)
);

//New Route
app.get("/listings/new", isLoggedIn, listingController.renderNewForm);

//show route
app.get(
  "/listings/:id",
  wrapAsync(listingController.showListing)
);

// Create Route
app.post(
  "/listings", isLoggedIn,
  upload.single("listing[image]"), validateListing,
  wrapAsync(listingController.createListing)
);

// app.post("/listings", upload.single("listing[image]"), (req, res) => {
//   res.send(req.file);
// });

//Edit Route
app.get(
  "/listings/:id/edit", isLoggedIn, isOwner,
  wrapAsync(listingController.renderEditForm)
);

//Update Route
app.put(
  "/listings/:id", isLoggedIn, isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//Delte route
app.delete(
  "/listings/:id", isLoggedIn, isOwner,
  wrapAsync(listingController.destroyListing)
);

const reviewController = require("./controllers/reviews.js");
//Reviews
//POST Reviews Route
app.post(
  "/listings/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Review Route
app.delete(
  "/listings/:id/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destoryReview)
);

const userController = require("./controllers/users.js");
//USERS
//Signup
app.get("/signup", userController.renderSignupForm);

app.post("/signup", wrapAsync(userController.signup));

app.get("/login", userController.renderLoginForm);

app.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true, }), userController.login);

app.get("/logout", userController.logout);

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.all("/*path", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
  // throw new ExpressError(404, "Chat not found");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { err });
  // res.send("something went wrong!");
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});