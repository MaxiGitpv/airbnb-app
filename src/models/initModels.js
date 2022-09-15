const User = require('./user.model')
const Posts = require('./posts.model')


const iniModels = () => {
    User.hasMany(Posts)  // User has many posts
    Posts.belongsTo(User)  // Posts belongs to user
}

module.exports = iniModels