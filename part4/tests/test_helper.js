const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This is a title',
    author: 'Matti',
    url: 'www.url.com',
    likes: 1000
  },
  {
    title: 'This is another title',
    author: 'Lukka',
    url: 'www.url2.com',
    likes: 2000
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}