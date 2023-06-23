const User = require('../models/user');
const jwt = require("jsonwebtoken");

const sign = obj => new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
        if (error) return reject(error);
        return resolve(token);
    });
});

const verify = token => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, error => {
        if (error) return reject();
        return resolve();
    });
});

const signup = async({name, email, password}) => {
    try {
        const user = await User.create({name, email, password});
        const token = await sign({
            id: user._id,
            name: user.name,
            email: user.email,
        });
        return Promise.resolve({
            user: user.name,
            token,
        });
    } catch (error) {
        return Promise.reject({error});
    }
};

const signin = async({name, password}) => {
    try {
        const user = await User.findOne({name});
        if (!user) return Promise.reject({error: "Incorrect username"})
        await user.checkPassword(password);
        const token = await sign({
            id: user._id,
            name: user.name,
            email: user.email,
        });
        return Promise.resolve({
            user: user.name,
            token,
        });
    } catch (error) {
        return Promise.reject({error});
    }
};

const verifyToken = async(token) => {
    try {
        const user = jwt.decode(token);
        const findUser = await User.findOne({email: user.email}).exec();
        if (!findUser) return Promise.reject({error: "Unauthorized"});
        await verify(token);
        return Promise.resolve();        
    } catch (error) {
        return Promise.reject({error: "Unauthorized"});
    }
};

const verifyEmail = async (email) => {
    try {
        const doc = await User.findOne({email});
        if (doc) return Promise.resolve(doc.name);
        else return Promise.resolve(false);
    } catch (error) {
        return Promise.reject(error);
    }
};

const addNote = async (note, name) => {
    try {
        const doc = await User.findOne({name});
        if (!doc) return Promise.reject('invalid username');
        await User.findOneAndUpdate({name}, {$push: {notes: {note}}});
        return Promise.resolve('success');
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

const fetchNotes = async (name) => {
    try {
        const doc = await User.findOne({name});
        if (!doc) return Promise.reject('invalid username');
        return Promise.resolve(doc.notes);
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

module.exports = {
    signup, signin, verifyToken, verifyEmail, addNote, fetchNotes,
};
