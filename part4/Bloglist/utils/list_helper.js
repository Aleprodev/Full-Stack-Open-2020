// const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))

  return blogs.find(blog => blog.likes === mostLikes)
}

// const mostBlogs = (blogs) => {
//   const authorWithMostBlogs = _.chain(blogs)
//     .countBy('author')
//     .toPairs()
//     .maxBy(blog => blog[1])
//     .value();

//   return (
//     authorWithMostBlogs && {
//       author: authorWithMostBlogs[0],
//       blogs: authorWithMostBlogs[1]
//     }
//   )
// }

// const mostLikes = (blogs) => {
//   const authorWithMostBlogs = _.chain(blogs)
//     .countBy('likes')
//     .toPairs()
//     .maxBy(blog => blog[1])
//     .value();

//   return (
//     authorWithMostBlogs && {
//       author: authorWithMostBlogs[0],
//       likes: authorWithMostBlogs[1]
//     }
//   )
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  // mostBlogs,
  // mostLikes
}