const mongoose = require("mongoose");
const Cart = require("./Cart");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String},
    email: { type: String, required: true, unique: true },
    img: {type: String},
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    isAdmin: {
      type: Boolean,
      default: false,
    }, 
    resetToken:{type: String},
    expireToken:{type : Date},
  },
  { timestamps: true }
);

UserSchema.pre('findOneAndDelete', function(next) {
  Cart.deleteMany({ userId: this._id }, (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
});
module.exports = mongoose.model("User", UserSchema);
