import Product from "../models/Product.js";
import Category from "../models/Category.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    // populate category name instead of showing ObjectId
    const products = await Product.find().populate("category", "name").sort({ name: 1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, imgUrl, info, category } = req.body;

    // check if product name exists
    const existing = await Product.findOne({ name });
    if (existing) return res.status(400).json({ message: "Product already exists" });

    // if category provided, verify it exists
    let categoryId = null;
    if (category) {
      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) return res.status(400).json({ message: "Invalid category ID" });
      categoryId = categoryDoc._id;
    }

    const product = await Product.create({
      name,
      imgUrl: imgUrl || "default.jpg",
      info: info || {},
      category: categoryId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { name, imgUrl, info, category } = req.body;

    const updatedData = { name, imgUrl, info, category };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
