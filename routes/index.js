const blogControllers = require('../controllers/blog.controllers')
function router(route) {
  route.get('/api/v1/blogs', (req, res) => {
    blogControllers.getBlogs(req, res)
  })
  route.get('/api/v1/blog/:id', (req, res) => {
    blogControllers.getBlog(req, res)
  })
  route.post('/api/v1/blog', (req, res) => {
    console.log(req.params)
    blogControllers.createBlog(req, res)
  })
}

module.exports = router
