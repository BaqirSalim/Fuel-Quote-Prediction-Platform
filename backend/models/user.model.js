import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//I learned this code from https://itnext.io/mastering-session-authentication-aa29096f6e22

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // a reference to ClientProfile (one-to-one relationship)
    clientProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientProfile",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;