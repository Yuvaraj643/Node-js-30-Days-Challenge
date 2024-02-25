const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Changed from category to categoryId
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);
async function createProduct(product) {
  try {
    const { categoryId, ...productDetails } = product;
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    const newProduct = new Product({
      ...productDetails,
      categoryId: categoryId,
    });

    await newProduct.save();

    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error.message);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find().populate("categoryId").exec();
    return products;
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    throw error;
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    console.log("Product updated successfully:", product);
    return product;
  } catch (error) {
    console.error("Error updating product:", error.message);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error.message);
    throw error;
  }
}

async function createMobilesCategory() {
  try {
    const mobilesCategory = new Category({ name: "Mobiles" });
    await mobilesCategory.save();
    console.log("Mobiles category created successfully");
  } catch (error) {
    console.error("Error creating mobiles category:", error.message);
  }
}

module.exports = {
  createProduct,
  createMobilesCategory,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
