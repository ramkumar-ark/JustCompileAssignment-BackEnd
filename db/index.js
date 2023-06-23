const mongoose = require('mongoose');

const atlasPassword = process.env.atlasPassword;
const atlasUser = process.env.atlasUser;
let connectionString = `mongodb+srv://${atlasUser}:${atlasPassword}@cluster0.lyka770.mongodb.net/JustCompileAssignment?retryWrites=true&w=majority`;

const connectToDb = () => mongoose.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = connectToDb;
