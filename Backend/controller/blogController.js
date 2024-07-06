const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // Check if required fields are missing
    if (!title || !description || !image) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the details",
      });
    }

    // Find the user
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: 'Unable to find User',
      });
    }

    // Create new blog
    const newBlog = new blogModel({ title, description, image,user });

    // Save the new blog to the database
    await newBlog.save();

    // Update user with the new blog
    existingUser.blogs.push(newBlog);
    await existingUser.save();

    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
    
  } catch (error) {
    // Handle errors
    return res.status(400).send({
      success: false,
      message: "Error while Creating Blog",
      error: error.message, // Provide specific error message
    });
  }
};


exports.getAllUserController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    return res.status(200).send({
      blogCount: blogs.length,
      success: true,
      message: "all Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      BlogCount: blogs.length,
      success: false,
      message: "Error in finding all user",
      error,
    });
  }
};

exports.getUserController = async (req, res) => {
  try {
    const { id } = req.params.id;
    const user = await blogModel.find(id);
    if (!user) {
      res.status(400).send({
        success: false,
        message: "Blog not exists",
        error,
      });
    }
    res.status(200).send({
      success: true,
      message: "Blog Find",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding user",
      error,
    });
  }
};

exports.editUserContoller = async (req, res) => {
  try {
    const id = req.params.id; // Fetching the blog ID from URL parameter
    const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
    console.log(id)
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found"
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog
    });
  } catch (error) {
    console.error("Error in editing blog:", error);
    res.status(500).json({ error: 'Error in editing blog' });
  }
};

exports.deleteUserController = async (req, res) => {
    try {
     const blog  = await blogModel.findOneAndDelete(req.params.id).populate("user")
     await blog.user.blogs.pull(blog)
     await blog.user.save();
     return res.status(200).send({
      success :true,
      message : "Blog Deleted!"
     })
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error in deleting' });
    }
  };



//GET User Blog
exports.userBlogController =async(req,res) =>{
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs")
    if(!userBlog){
      return res.status(404).send({
        success : false,
        message : 'blogs not found with this id'
      })
    }
    return res.status(200).send({
      success :true,
      message :'user blog',
      userBlog
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success : false,
      message: 'error in user blog',
      error
    })
  }

}