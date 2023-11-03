const express_ = require('express');
const app = express_();
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
var cors = require('cors');

const bodyParser = require("body-parser")
// const uri = "mongodb://localhost:27017/box";
const uri = "mongodb+srv://bmiinventory9:bmiinventory@cluster0.zfecsfv.mongodb.net/bmiinventory?retryWrites=true&w=majority";
const cron = require("node-cron");
const axios = require('axios')

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectToDatabase();
// const apiLimiter = rateLimit({
//     windowMs: 60 * 60 * 1000, // 15 minutes
//     max: 500,
//     message:
//     "Too many accounts created from this IP, please try again after 15 min"
// });


// app.use(apiLimiter);//safety against DOS attack
app.use(cors());//to follow cors policy
app.use(xss());//safety against XSS attack or Cross Site Scripting attacks
app.use(helmet());//safety against XSS attack
app.use(express_.json({ extended: false }));
app.use(express_.static('.'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/user', require('./api/user'));
app.use('/api/upload', require('./api/upload'));
app.use('/api/client', require('./api/client'));
app.use('/api/driver', require('./api/driver'));
app.use('/api/manager', require('./api/manager'));
app.use('/api/security', require('./api/security'));
app.use('/api/superadmin', require('./api/superadmin'));
app.use('/api/admin', require('./api/admin'));
app.use('/api/city', require('./api/city'));
app.use('/api/container', require('./api/container'));
app.use('/api/rack', require('./api/rack'));
app.use('/api/store', require('./api/store'));
app.use('/api/box', require('./api/box'));
app.use('/api/cfile', require('./api/cfile'));
app.use('/api/invoices', require('./api/invoice'));
app.use('/api/shistory', require('./api/shistory'));
app.use('/api/companies', require('./api/companies'));
app.use('/api/request', require('./api/request'));
app.use('/api/dhistory', require('./api/dhistory'));
app.use('/api/mhistory', require('./api/mhistory'));
app.use('/api/companies', require('./api/companies'));
app.use('/api/companyinfo', require('./api/companyinfo'));


const port = process.env.PORT || 3000;
app.get('/', (req, res) => {

    console.log("hello")
    res.json('working')
})
app.listen(port, () => console.log(`Server is up and running at ${port}`));