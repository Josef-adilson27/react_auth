import mongoose, { Document } from "mongoose";

// Интерфейс для свойств пользователя
export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Интерфейс для документа Mongoose (добавляет методы Mongoose)
export interface IUserDocument extends IUser, Document {}

// Тип для модели (если нужны статические методы)
export interface IUserModel extends mongoose.Model<IUserDocument> {}

const userSchema = new mongoose.Schema<IUserDocument>(
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("email")) {
    const existingUser = await mongoose.model("User").findOne({
      email: this.email,
      _id: { $ne: this._id } // исключаем текущего пользователя при обновлении
    });
    if (existingUser) {
      return next(new Error("Email already exists"));
    }
  }
  next();
});


const UserModel = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default UserModel;


