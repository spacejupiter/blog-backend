const blogService = require('../service/blogservice')

module.exports = {
  getBlogs: (req, res) => {
    try {
      const { page, limit } = req.query
      const blogs = blogService.getBlogs(page, limit)
      return res.status(200).json(blogs)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  },

  getBlog: (req, res) => {
    try {
      const { id } = req.params
      const blog = blogService.getBlog(id)

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
      }

      return res.status(200).json(blog)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  },

  createBlog: (req, res) => {
    try {
      console.log(req.body)
      if (req.body == undefined) {
        return res.status(400).json({ error: 'Invalid request body' })
      }

      //blogService.createBlog(blog)
      return res.status(201).json('Created')
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  },
}
