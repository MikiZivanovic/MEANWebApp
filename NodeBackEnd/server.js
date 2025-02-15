const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Grekska u kodu");
  console.log(`${err.name} poruka ${err.message}`);
  console.log(err);
  process.exit(1);
});

const app = require("./app.js");
const mongose = require("mongoose");
const Variety = require("./models/varietyModel.js");

const port = process.env.PORT;
const Db = `mongodb+srv://miki:${process.env.DBPASSWORD}@cluster0.7vlg1ai.mongodb.net/wineDatabase `;

mongose
  .connect(Db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log(`Uspesno povezivanje`));

const server = app.listen(port, () => {
  console.log("Server is listening for requests....");
});

process.on("unhandledRejection", (err) => {
  console.log("Greska na serveru");
  console.log(`${err.name} poruka ${err.message}`);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
