const { m } = require('./helpers/models')

const resolvers = {
  Query: {
    posts: async (_, __, ctx) => {
      try {
        const posts = await m('Post').all(ctx)
        return posts.map(r => r.data)
      } catch (e) {
        throw e
      }
    },
    author: async (_, { id }, ctx) => {
      try {
        const author = await m('Author').find(ctx, id)
        return author ? author.data : null
      } catch (e) {
        throw e
      }
    },
  },

  Mutation: {
    upvotePost: async (_, { postId }, ctx) => {
      try {
        const post = await m('Post').find(ctx, postId)
        if (!post) {
          throw new Error(`Couldn't find post with id ${postId}`)
        }
        await post.upvotes()
        return post.data
      } catch (e) {
        throw e
      }
    }
  },

  Author: {
    posts: async (author, _, ctx) => {
      try {
        const posts = await m('Post').findByAuthor(ctx, author.data.id)
        return posts.map(r => r.data)
      } catch (e) {
        throw e
      }
    },
  },

  Post: {
    author: async (post, _, ctx) => {
      try {
        const author = await m('Author').find(ctx, post.authorId)
        return author ? author.data : null
      } catch (e) {
        throw e
      }
    }
  }
}

module.exports = resolvers