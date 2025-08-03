const Listing = require("../models/listing");
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  // console.log(req.user);
  // if(!req.isAuthenticated()){
  //   req.flash("error", "you must be logged in to create listing!");
  //   return res.redirect("/login");
  // }

  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author",},}).populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    console.log(listing);
    res.render("listings/show.ejs", { listing });
  };

module.exports.createListing = async (req, res, next) => {
    // if(!req.body.listing)
    //     throw new ExpressError(400, "Send valid data for listing");
    // let {title, description, image, price, country, location} = req.body;
    // let listing = req.body.listing;
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename);
    const newListing = new Listing(req.body.listing);
    // if(!newListing.title)
    //     throw new ExpressError(400, "Title is missing!");
    // if(!newListing.description)
    //     throw new ExpressError(400, "Description is missing!");
    // if(!newListing.location)
    //     throw new ExpressError(400, "Location is missing!");
    // console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
    // console.log(listing);
  }

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
    }
    
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_200");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    // if (!req.body.listing)
    //   throw new ExpressError(400, "Send valid data for listing");
    let { id } = req.params;
    // let listing = await Listing.findById(id);
    // if(!listing.owner.equals(res.locals.currUser._id)){
    //   req.flash("error", "You don't have permission to edit");
    //   return res.redirect(`/listings/${id}`);
    // }

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url, filename};
      await listing.save();
    }
    
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  };