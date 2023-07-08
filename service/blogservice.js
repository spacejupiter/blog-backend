const fs = require('fs')
const path = require('path')

const CSV_FILE_PATH = path.join(__dirname, '../repository/filedb/blogs.csv')

module.exports = {
  getBlogs: (page, limit) => {
    try {
      if (!page) {
        page = 1
      }
      if (!limit) {
        limit = 10
      }

      const csvData = fs.readFileSync(CSV_FILE_PATH, 'utf-8')

      const rows = csvData.split('\n').slice(1) // Exclude header row

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      const blogs = rows.slice(startIndex, endIndex).map((row) => {
        const [id, title, date, content, minutes, url] = row.split('\\')
        return { id, title, date, content, minutes: parseInt(minutes), url }
      })

      return blogs
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get blogs')
    }
  },

  getBlog: (id) => {
    try {
      const csvData = fs.readFileSync(CSV_FILE_PATH, 'utf-8')
      const rows = csvData.split('\n').slice(1) // Exclude header row

      const blogRow = rows.find((row) => {
        const [blogId] = row.split('\\')
        return blogId === id
      })

      if (!blogRow) {
        throw new Error('Blog not found')
      }

      const [blogId, title, date, content, minutes, url] = blogRow.split('\\')
      return {
        id: blogId,
        title,
        date,
        content,
        minutes: parseInt(minutes),
        url,
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get blog')
    }
  },

  createBlog: (blog) => {
    try {
      const csvData = fs.readFileSync(CSV_FILE_PATH, 'utf-8')
      const rows = csvData.split('\n')

      const lastRow = rows[rows.length - 2] // Get the last row (excluding header)
      const lastId = parseInt(lastRow.split('\\')[0])
      const newId = lastId + 1

      const newRow = `${newId}\\${blog.title}\\${blog.date}\\${blog.content}\\${blog.minutes}`

      fs.appendFileSync(CSV_FILE_PATH, `\n${newRow}`)
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create blog')
    }
  },
}
