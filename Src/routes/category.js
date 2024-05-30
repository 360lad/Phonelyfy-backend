import { Router } from "express";
import Category from  "../models/category.js";

const router = Router();

router.post("/new", async (req, res ) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    const category = await Category.findOne({ categoryName });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
      
    }
    const addCategory = new Category({
        categoryName:categoryName,
        categoryDescription:categoryDescription
    });
    const savedCategory= await addCategory.save();
    return res.status(201).json(savedCategory)
  } catch (error) {
    return res.status(401).json({ message: error });
  }
});
export { router };
