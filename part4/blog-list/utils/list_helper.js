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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}