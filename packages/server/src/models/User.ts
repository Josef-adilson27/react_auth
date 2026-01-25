import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  }
  },{
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("email")) {
    const existingUser = await mongoose.model("User", userSchema).findOne({
      email: this.email,
    });
    if (existingUser) {
      return next(new Error("Email already exists"));
    }
  }
  next();
});

export default mongoose.model("User", userSchema);