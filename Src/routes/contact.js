import { Router } from "express";
import Contact from "../models/contact.js";

const router = Router();
//Add New Contact
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

//GETTING ALL CONTACTS
router.get("/", async (req, res) => {
  try {
    const allContacts = await Contact.find();
    return res.status(200).json(allContacts);
  } catch (error) {
    return res.status(401).json({ message: error });
  }
});

//GEt one contact
router.get("/:id",async(req,res)=>{
  try {
    const {id}= req.params
    const contact=await Contact.findById(id)
    return res.status(200).json(contact);


  } catch (error) {
    return res.status(400).json({ message: error });

  }
});

//UPDATING CONTACTS
router.patch("/:id",async(req,res)=>{
  try {
    const {id}=req.params
    const { name, phonenumber, email, profileimage, category } = req.body;
    const update={ name, phonenumber, email, profileimage, category }


  const updatedContacts=await Contact.findOneAndUpdate({_id:id},update,{new:true})
  return res.status(200).json(updatedContacts)
  } catch (error) {
    return res.status(400).json({message:error})
  }
  
})

//DELETE CONTACT()
router.delete("/:id",async(req,res)=>{
  try {
    const {id}=req.params
    const deleteContact=await Contact.findOneAndDelete({_id:id})
    return res.status(200).json(deleteContact)
    
  } catch (error) {
    return res.status(400).json({ message: error });

  }
 
})

export { router };
