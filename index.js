const express = require('express');
const path = require('path');
const morgan = require('morgan');
const {createStream} = require("rotating-file-stream");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require('./db/index');
const api = require("./routes/index");

const app = express();
dotenv.config();

// enabling cors
app.use(cors());
// Serving static assets
app.use("/assets", express.static(path.join(__dirname, "public")));
// Parsing the requests
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Logging
const stream = createStream("./logs/file.log",
    {
        size:"10M", interval: "1d", compress:"gzip"
    }
);
app.use(morgan("dev", {stream}));

// Handling api routes
app.use("/api", api);

app.get('/statuscheck', function(req,res) {
    res.status(200).json({message:'ok'});
});

const portNo = process.env.port;

Promise.all([connectToDb()])
    .then(() => app.listen(portNo, () => console.log(`The Express app is listening at port ${portNo}`)))
    .catch((reason) => {
        console.log(`MongoDB Atlas Error: ${reason}`);
        process.exit();
    });
