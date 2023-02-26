const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({

    username: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin', 'guest'],
        default: 'guest'
    },
    age: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    installed_days: {
        type: Number,
        default: 1
    },
    password: {
        type: String,
        required: true
    }

})

module.exports=mongoose.model("User",userSchema)