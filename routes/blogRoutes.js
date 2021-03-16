const express = require("express");

const Blog = require("../models/Blog");
const User = require("../models/User");

// const isUser = require("../middlewares/requireAuth");

const router = express.Router();

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
router.get("/api/v1/blog/:userId", async (req, res) => {
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
router.post("/api/v1/blog/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, image, content } = req.body;
  try {
    const blog = new Blog({
      name,
      image,
      content,
    });
    await blog.save();
    res.send(blog);
    const currentuser = await User.findById(userId);
    currentuser.blogs.push(blog._id);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To update a blog
router.put("/api/v1/blog/:blogId", async (req, res) => {
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
router.delete("/api/v1/blog/:blogId", async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    const currentuser = await User.findById(blog.userId);
    currentuser.blogs = currentuser.blogs.filter((id) => id != blogId);
    await User.findByIdAndUpdate(blog.userId, currentuser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To add a comment
router.post("/api/v1/blog/:blogId/comment", async (req, res) => {
  const { blogId } = req.params;
  const { comment } = req.body;
  try {
    const blog = await findById(blogId);
    blog.comments.push(comment);
    res.json(blog);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// TO add a like
router.put("api/v1/:blogId/like", async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);

    await Blog.updateOne(blog, {
      $inc: { likes: 1 },
      function(err, res) {
        if (err) throw err;
        res.send("Successfully updated");
      },
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(422).send(err);
  }
});

// To dislike
router.put("api/v1/:blogId/dislike", async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);

    await Blog.updateOne(blog, {
      $inc: { likes: -1 },
      function(err, res) {
        if (err) throw err;
        res.send("Successfully updated");
      },
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(422).send(err);
  }
});

module.exports = router;
