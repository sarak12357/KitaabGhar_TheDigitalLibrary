const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Enter valid email (example@gmail.com)",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  credits: {
    type: Number,
    default: 100,
  },

  unlockedBooks: [
    {
      bookId: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["synopsis", "full"],
      },
    },
  ],
  readlist: [
    {
      bookId: String,
      status: {
        type: String,
        enum: ["saved", "reading", "completed"],
        default: "saved",
      },
    },
  ],
});

// ✅ HASH PASSWORD
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ✅ COMPARE PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
