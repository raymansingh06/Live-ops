const express = require("express");
const router = express.Router();
const offers= require("../models/OfferSchema")
const user = require("../models/Userschema")
const fileUpload=require("express-fileupload")
const path = require("path");

router.use(fileUpload());





router.post("/api/offers", async (req, res) => {
    try {
        const isAdmin = await user.findById(res.user);
        if (isAdmin.role == "admin") {
            const { offer_id, offer_title, offer_description, offer_sort_order,
                days_of_week, dates_of_month, months_of_year, item_id, quantity } = req.body;

            const offerDetails = await offers.create({
                offer_id,
                offer_title,
                offer_description,
                offer_image: req.files,
                offer_sort_order,
                content: {
                    item_id,
                    quantity,
                },
                schedule: {
                    days_of_week,
                    dates_of_month,
                    months_of_year
                }
            })
            return res.status(200).json({
                message: "success",
                _id: isAdmin._id,
                offerDetails
            });
        } else {
            return res.status(401).json({
                message: "Only admins can access"
            })
        }
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
});



router.get("/api/offerlist/:fileName", (req, res) => {
    return res.sendFile(path.join(__dirname, `../uploads/${req.params.fileName}`))
})


router.get("/api/offerlist", async (req, res) => {
    try {
        const offerlist = await offers.find();
        return res.status(200).json({
            message: "success",
            Alloffer: offerlist
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
})


router.put("/api/offers/:offerId", async (req, res) => {
    try {
        const isAdmin = await user.findById(res.user);
        if (isAdmin.role == "admin") {
            const { offerId } = req.params;
            const { offer_id, offer_title, offer_description, offer_sort_order,
                days_of_week, dates_of_month, months_of_year, item_id, quantity } = req.body;

            const updateFields = {
                offer_id,
                offer_title,
                offer_description,
                offer_sort_order,
                content: {
                    item_id,
                    quantity,
                },
                schedule: {
                    days_of_week,
                    dates_of_month,
                    months_of_year
                }
            }
            const updatedOffer = await offers.updateOne({ offerId }, updateFields);
            return res.status(200).json({
                message: "success",
                offerDetails: updatedOffer
            });
        } else {
            return res.status(401).json({
                message: "Only admins can access"
            })
        }
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
});

module.exports = router;