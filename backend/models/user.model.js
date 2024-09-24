import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passqord: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default:""
    },
    searchHistroy: {
        type: Array,
        default: []
    },
})

export const User = mongoose.model('User', userSchema)
