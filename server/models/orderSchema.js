const mongoose = require('mongoose');
const Order = mongoose.model('Order',new mongoose.Schema({
    bill_amount:{
        type:Number,
        required:true
    },
    billing_address:{
        first_name:{
            type:String,
            required:true,
        },
        last_name:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true
        }
    },
    order_date:{
        type:Date,
        required:true,
    },
    courses:{
        type:Array,
        required:true
    }
}))


module.exports = Order;