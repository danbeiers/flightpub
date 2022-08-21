import mongoose from "mongoose";
// const {Schema} =mongoose;

const WishlistSchema = new mongoose.Schema({

    departure:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    }
});

export default mongoose.model("Wishlist", WishlistSchema, "Wishlists")