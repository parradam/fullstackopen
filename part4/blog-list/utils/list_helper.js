// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sumOfLikes, blog) => sumOfLikes += blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((a, b) => a.likes > b.likes ? a : b, {})
}

// TODO complete 4.6-4.7
// const mostBlogs = (blogs) => {
//     let blogCount = _.countBy(blogs, (blog) => {
//         return blog
//     })
// }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    // mostBlogs
}