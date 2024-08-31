const mongoose = require('mongoose');
const db = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const password = process.env.ATLAS_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.q3uawxl.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri)
.then(() => console.log("Connected successfully to the DB ✅"))
.catch(() => console.error("Something went wrong ❌"))
