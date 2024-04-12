import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//I learned this code from https://itnext.io/mastering-session-authentication-aa29096f6e22

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      validate: {
        validator: (username) => User.doesNotExist({ username }),
        message: "username already exists",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
