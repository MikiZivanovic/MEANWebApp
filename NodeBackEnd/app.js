const cors = require('cors');
const express = require("express");
const dotenv = require("dotenv");
const morgan= require("morgan")
const cookieParser = require("cookie-parser");



dotenv.config({ path: "./config.env" });

const app = express();
app.use(cors({
  origin: "http://localhost:4200", 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/images/wines`));


const styleRouter = require("./routes/styleRouter");
const varietyRouter = require("./routes/varietyRouter");
const wineRouter = require("./routes/wineRouter");
const orderRouter = require("./routes/orderRouter");
const userRouter = require("./routes/userRouter");

app.use("/api/v1/styles", styleRouter);
app.use("/api/v1/varieties", varietyRouter);
app.use("/api/v1/wines", wineRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  console.log("Nije pronađena ruta!");
  console.log("Metod:", req.method);
  console.log("URL:", req.originalUrl);

  
  const error = new Error(`Ruta ${req.originalUrl} nije pronađena`);
  error.status = 404;
  next(error); 
});

app.use((err, req, res, next) => {
  console.error("Došlo je do greške:");
  console.error("Poruka:", err.message);
  console.error("Status kod:", err.statusCode || 500);

  res.status(err.statusCode || 500).json({
    status: err.status || "error", 
    message: err.message || "Interna greška servera",
  });
});



module.exports = app;
