const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

const noteScheme = new Schema({
    note:{type:String, required:true},
    time:{type:Date, required: true, default:Date.now}
});

const userScheme = new Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    notes: [noteScheme],
});

userScheme.pre("save", function(next){
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userScheme.pre("findOneAndUpdate", function(next){
    const update = this.getUpdate();
    if (update.$set && update.$set.password) {
        update.$set.password = bcrypt.hashSync(update.$set.password, 10);
    }
    next();
});

userScheme.methods.checkPassword = async function(password) {
    try {
        const match = await bcrypt.compare(password, this.password);
        if (match) return Promise.resolve();
        return Promise.reject("Incorrect Password!");
    } catch (err) {
        Promise.reject(err);
    }
}

const User = model("User", userScheme);

module.exports = User;
