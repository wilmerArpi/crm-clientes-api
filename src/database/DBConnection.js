const mongoose = require("mongoose");

const uri = "mongodb+srv://wilmer593:<password>@curso-mongodb.6zfvn.mongodb.net/crm-clientes";
const DBConnection = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

module.exports = DBConnection;