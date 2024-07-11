const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    slug,
    shortDescription,
    bodyContent,
    headings: updatedHeadings,
    images: updatedImages,
  } = req.body;

  try {
    // Ensure all required fields are present in the request body
    if (
      !title ||
      !slug ||
      !shortDescription ||
      !bodyContent ||
      !updatedHeadings ||
      !updatedImages
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        shortDescription,
        bodyContent,
        headings: updatedHeadings,
        images: updatedImages,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating Blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
