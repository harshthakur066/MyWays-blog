const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");
const User = require("../models/User");

const isUser = require("../middlewares/requireAuth");

// To get all blogs
router.get("/api/v1/blog", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

// To get specific blog
router.get("/api/v1/blog/:blogId", async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

// To get all blogs of a speific user
router.get("api/v1/blog/:userId", isUser, async (req, res) => {
  const { userId } = req.params;
  try {
    const blog = await Blog.find({ userId: userId });
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

// To post  blogs
router.post("/api/v1/blog/:userId", isUser, async (req, res) => {
  const { userId } = req.params;
  const { name, image, content } = req.body;
  try {
    const blog = new Blog({
      name,
      userId,
      image,
      content,
    });
    await blog.save();
    const currentuser = await User.findById(userId);
    currentuser.blogs.push(blog._id);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To update a blog
router.put("api/v1/blog/:blogId", isUser, async (req, res) => {
  const { blogId } = req.params;
  const { name, image, content } = req.body;

  let update = {
    name,
    image,
    content,
  };
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, update);
    res.send(blog);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To delete a blog
router.delete('api/v1/blog/:blogId', isUser, (req,res) => {
    const {blogId} = req.params;
    try{
        const blog = await Blog.findByIdAndDelete(blogId);
        const currentuser = await User.findById(blog.userId);
        currentuser.blogs = currentuser.blogs.filter(
          (id) => id != blogId
        );
        await User.findByIdAndUpdate(blog.userId, currentuser);
    }catch(err) {
        return res.status(500).json({ error: err.message });
    }
})