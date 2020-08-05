const express = require("express");
const router = express.Router();

// Load input validation
const validateBookInput = require("../../validation/bookcreation");
const validateInstanceEditInput = require("../../validation/instanceedit");

// Load User model
const Book = require("../../models/Book");
const Instance = require("../../models/Instance");
const Review = require("../../models/Review");

// @route POST api/books/createBook
// @desc create book
// @access manager
router.post("/createBook", (req, res) => {
    console.log("bookcreate");
  // Form validation
  const { errors, isValid } = validateBookInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Book.findOne({ title: req.body.title }).then(book => {
    if (book) {
      return res.status(400).json({ title: "book already exists" });
    } else {
      const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        year: req.body.year,
        isbn: req.body.isbn,
        callno: req.body.callno
      });
          
      newBook
        .save()
        .then(book => res.json(book))
        .catch(err => console.log(err));
    }
  });
});

//get the lsit of books
router.get("/getBooks", (req, res) => {
    console.log("booklist");
    Book.find({ }, 'title').then(books => {
      if (!books.length) {
        return res.status(400).json({bookListData: "books no exist"});
      } else {
        return res.status(200).json(books);
      }
    })
});

//delete a book
router.post("/deleteBook", (req, res) => {
  console.log(req.body.title);
  Book.deleteOne({title: req.body.title}, function(err){
    res.send({status: "deleted na even if walang book"})
  });
});

//get the specific details of one book
router.post("/bookDetails", (req, res) => {
    console.log("bookdetail");
    Book.findOne({ title: req.body.title }).then(bookDetail => {
      if (!bookDetail) {
        return res.status(400).json({bookListData: "book doesnt exist"});
      } else {
        return res.json(bookDetail);
      }
    })
});

//edit the details and instance title of one book
router.post("/bookEdit", (req, res) => {
    console.log("bookedit");
    const { errors, isValid } = validateBookInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Book.findOne({ title: req.body.oldTitle }).then(bookDetail => {
      if (bookDetail) {
        bookDetail
            .updateOne({
                title: req.body.title,
                authors: req.body.authors,
                year: req.body.year,
                isbn: req.body.isbn,
                callno: req.body.callno
            })
            .then(bookDetail => res.json(bookDetail))
            .catch(err => console.log(err));
      } else {
        return res
        .status(400)
        .json({bookListData: "book doesnt exist"});
      }
    });
});

//get list of instance
router.post("/getInstance", (req, res) => {

  Instance.find({ title: req.body.oldTitle}).then(instance => {
    if (!instance.length) {
      return res.status(400).json({instances: "instances no exist"});
    } else {
      return res.status(200).json(instance);
    }
  })
});

//get the specific details of one isntance
router.post("/getOneInstance", (req, res) => {
  console.log("getoneinstance");
  Instance.findOne({ _id: req.body._id }).then(instanceDetail => {
    if (!instanceDetail) {
      return res.status(400).json({instanceData: "one instance no exist"});
    } else {
      return res.json(instanceDetail);
    }
  }).catch(err=>{
    return res.json({instance: "0"})
  })
});

//editt one specific instance (just status tho)
router.post("/editOneInstance", (req, res) => {

  console.log("editoneinstance");
  const { errors, isValid } = validateInstanceEditInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Instance.findOne({ _id: req.body._id }).then(instanceDetail => {
    if (instanceDetail) {
      if(req.body.status === "available"){
        instanceDetail
        .updateOne({
            name: "",
            status: req.body.status,
            dateA: ""
        })
        .then(instanceDetail => res.json(instanceDetail))
        .catch(err => console.log(err));
      } else{
        instanceDetail
        .updateOne({
            name: "unknown borrower",
            status: req.body.status,
            dateA: "wait for book to be returned"
        })
        .then(instanceDetail => res.json(instanceDetail))
        .catch(err => console.log(err));
      }
    } else {
      return res
      .status(400)
      .json({stat: "instance doesnt exist"});
    }
  });

})

//borrow one specific book instance
router.post("/borrowInstance", (req, res) => {

  console.log("borrow instance");

  Instance.findOne({ _id: req.body._id }).then(instanceDetail => {
    if (instanceDetail) {
      instanceDetail
      .updateOne({
          name: req.body.username,
          status: "borrowed",
          dateA: "wait for book to be returned"
      })
      .then(instanceDetail => res.json(instanceDetail))
      .catch(err => console.log(err));
    } else {
      return res
      .status(400)
      .json({stat: "instance doesnt exist"});
    }
  });

})

//this is just when u update the name of the book this renames all the instances (doing this we wont have
//to check other schema/databases to check foreign keys and titles.)
router.post("/bookEditInstanceUpdate", (req, res) => {

    const query = {"title": req.body.oldTitle};
    const update = {$set: { "title": req.body.title}};
    const option = {};

    Instance.updateMany(query, update)
        .then(res => console.log(res))
        .catch(err => console.log(err));

    Review.updateMany(query, update)
        .then(res => console.log(res))
        .catch(err => console.log(err));

    return res.status(200).json({testinstanceupdate: "ok"});
});

//add instance of book
router.post("/addInstance", (req, res) => {

    var instance = new Instance({
        title: req.body.title, name: req.body.name, status: req.body.status, dateA: req.body.dateA})

    instance.save(function(err, res) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
    });
    
    return res.status(200).json({test: "ok"});
});

//delete a book instance
router.post("/deleteOneInstance", (req, res) => {
  console.log(req.body._id);
  Instance.deleteOne({_id: req.body._id}, function(err){
    res.send({status: "deleted na even if walang instance"})
  });
});

//create review
router.post("/createReview", (req, res) => {
  console.log("reviewcreate");

  // validation
  if (req.body.review === "") {
    return res.status(400).json({review: "Review field is required"});
  }

  var review = new Review({
    username: req.body.username, 
    title: req.body.title, 
    review: req.body.review
  })

  review.save(function(err, res) {
      if (err) return console.error(err);
      console.log("Document inserted succussfully!");
  });
  return res.status(200).json({ success: "oo"});

});
//get reviews
router.post("/getReviews", (req, res) => {
  console.log("getreviews");
  Review.find({ title: req.body.oldTitle}).then(reviews => {
    if (!reviews.length) {
      return res.status(400).json({bookListData: "instances no exist"});
    } else {
      return res.json(reviews);
    }
  })
});
//get reviews for specific profile
router.post("/getReviewsProfile", (req, res) => {
  console.log("getreviews");
  Review.find({ username: req.body.username}).then(reviews => {
    if (!reviews.length) {
      return res.status(400).json({bookListData: "instances no exist"});
    } else {
      return res.json(reviews);
    }
  })
});
//get books borrowed for specific profile
router.post("/getBooksProfile", (req, res) => {
  console.log("getborrowed");
  Instance.find({ name: req.body.username}).then(borrowed => {
    if (!borrowed.length) {
      return res.status(400).json({bookListData: "books borrowed no exist"});
    } else {
      return res.json(borrowed);
    }
  })
});

module.exports = router;
