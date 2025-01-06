import express from "express";
import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

// Route to post a new book
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const newBook = {
      title,
      author,
      publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).json({ book });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all books
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//route to get a book by id
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    return res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

//route to update a book by id
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ data: updatedBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//route to delete a book by id
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
