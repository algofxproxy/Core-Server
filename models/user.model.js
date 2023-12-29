const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    proxy_servers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProxyServer",
    },
    createdAt: Date,
  },
  { strict: false }
);

UserSchema.pre("save", async function (next) {
  try {
    // check method of registration
    const user = this;
    if (!user.isModified("password")) next();
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // replace plain text password with hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
