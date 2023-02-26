const mongoose=require("mongoose")

const OfferSchema= new mongoose.Schema({
    offer_id: { type: String, required: true },
    offer_title: { type: String, required: true },
    offer_description: { type: String },
    offer_image: { type: String, required: true },
    offer_sort_order: { type: Number },
    content: {
        item_id: String,
        quantity: Number,
    },
    schedule: {
        days_of_week: Number,
        dates_of_month: Number,
        months_of_year: Number
    },
    target:{
        type:Number
    },
    pricing: {
        currency: {
            type: String,
            enum: ['coins', 'gems'],
            default: () => {
                const currencies = ['coins', 'gems'];
                return currencies[Math.floor(Math.random() * currencies.length)];
            },
        },
        cost: {
            type: Number,
            default: ((this.currency == "gems") ? 1000 : 20)
        },
    }
})

module.exports=mongoose.model("Offer", OfferSchema)