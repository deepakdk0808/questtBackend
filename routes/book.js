const Book = require("../models/Book");

const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(200).json({savedBook,message:"Book added SuccessFully"});
  } catch (err) {
    res.status(500).json(err);
  }
});


 
//UPDATE
router.patch("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("Book has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BOOKS
router.get("/find/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BOOKS
router.get("/",async (req, res) => {
  const search=req.query.search||""
  const query={
    title:{
      $regex:search,
      $options:"i"
    }
  }
  const{page=1,limit=6}=req.query || ""
  try { 
   let books = await Book.find(query).skip((page-1)*limit).limit(limit)
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL BOOKS FOR ADMIN
router.get("/allBooks",async (req, res) => {
  
  try { 
   let books = await Book.find()
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;  
