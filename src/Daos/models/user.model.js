import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  age: { type: Number, require: true },
  password: { type: String, require: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  cart: { type: Schema.Types.ObjectId, ref: "carts" },
  pets: { type: Array, default: [] },
});

export const userModel = model("user", userSchema);