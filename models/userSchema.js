const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    currentTechnique: {
        type: Number // One for Eizenhower technique, Two for complex tasks technique
    }
}, {timestamps: true})

//signup user
userSchema.statics.signup = async function (firstName, lastName, userName,email, password) {
    if (!firstName || !lastName || !userName || !email || !password) {
        throw Error('all fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('password is not strong enough')
    }

    const emailExists = await this.findOne({ email })

    if (emailExists) {
        throw Error('email already exists')
    }


    const userNameExists = await this.findOne({ userName })

    if (userNameExists) {
        throw Error('user name is already taken')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({firstName, lastName, userName, email, password: hash})

    return user
}

//login user
userSchema.statics.login = async function (userName, password) {
    if ( !userName || !password) {
        throw Error('all fields must be filled')
    }

    const user = await this.findOne( {userName} )

    if (!user) {
        throw Error('incorrect userName')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('incorrect password')
    }

    return user
}



module.exports = mongoose.model("User", userSchema)