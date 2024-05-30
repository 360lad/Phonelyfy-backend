import mongoose from "mongoose";

const contactsSchema = mongoose.Schema({
  name: { type: String, required:true },
  phonenumber: { type: String, unique:true },
  email: { type: String, required:true, unique:true },
  profileimage:{type: String },
  category: { type: String,required:true },
});

export default mongoose.model("Contact", contactsSchema);
