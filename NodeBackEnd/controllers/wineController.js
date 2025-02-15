const Wine = require("./../models/wineModel");
const multer = require("multer");
const sharp = require("sharp");
const ApiFeatures = require("../utils/apiFeatures");


const multerStorage = multer.memoryStorage();

multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images"), false);
    }
  };
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  
  
  exports.uploadWineImages = upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 3 },
  ]);
  

  exports.postWines = async (req, res, next) => {
    try {
      const newWine = await Wine.create(req.body);
      req.body.id = newWine._id; 
      req.wine = newWine; 
      next();
    } catch (err) {
      console.log(err.message)
      res.status(400).json({
        status: "fail",
        message: err.message,
        
      });
    }
  };
  
 
  exports.resizeWineImages = async (req, res, next) => {
    try {
      if (!req.files.imageCover || !req.files.images) {
        return next();
      }
  
     
      const imageCover = `wine-${req.body.id}-cover.jpeg` ;
      await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`images/wines/${imageCover}`);
  
     
      const images = [];
      console.log(req.files.images)
      await Promise.all(
        req.files.images.map(async (file, i) => {
          const filename = `wine-${req.body.id}-${i + 1}.jpeg`;
          await sharp(file.buffer)
            .resize(350, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`images/wines/${filename}`);
  
          images.push(filename);
        })
      );
  
     
      const updatedWine = await Wine.findByIdAndUpdate(
        req.body.id,
        { imageCover, images },
        { new: true, runValidators: true }
      );
  
      res.status(201).json({
        
          wine: updatedWine,
        
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Error processing images",
      });
    }
  };
  exports.getWines = async (req, res, next) => {
    const winesSeparate = await Wine.aggregate([{ $unwind: "$styles" }]);

    
    const winesWithStyles = await Wine.populate(winesSeparate, { path: "styles" });

    const winesWithVarieties = await Wine.populate(winesWithStyles, { path: "varieties" });

    
    let apiFeatures = new ApiFeatures(winesWithVarieties, req.query);
    let wines = apiFeatures.pagination().data; 
   

    res.status(200).json({ status: "success", count: winesWithVarieties.length, data: wines });
  };
  
  exports.getWine = async (req,res,next)=>{
   
    const data  = await Wine.findById(req.params.id);
    
    const wine = await Wine.populate(data, { path: "varieties" });

    res.status(200).json({wine});
  }
  
  exports.postWines = async (req, res, next) => {
    
    const newWine = await Wine.create(req.body);
    req.body.id = newWine.id;
    next();
  };