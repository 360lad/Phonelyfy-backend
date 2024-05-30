import { Router } from "express";
import Contact from "../models/contact.js";

const router = Router();
router.post("/new", async (req, res) => {
  try {
    const { name, phonenumber, email, profileimage, category } = req.body;
    const contact = await Contact.findOne({ phonenumber });

    if (contact) {
      return res.status(400).json({ message: "Contact already exists" });
    }

    const addNewContact = new Contact({
      name: name,
      phonenumber: phonenumber,
      email: email,
      profileimage: profileimage,
      category: category,
    });
    const savedContact = await addNewContact.save();

    return res.status(201).json(savedContact);
  } catch (error) {
    return res.status(401).json({ message: error });
  }
});

export { router };
