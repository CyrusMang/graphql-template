const { register } = require('../helpers/models')

const _data = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
]

class Post {
  constructor(ctx, data) {
    this.ctx = ctx
    this.data = data
  }
  upvotes = async () => {
    try {
      this.data.votes += 1
    } catch (e) {
      throw e
    }
  }
  static all = async ctx => {
    try {
      return _data.map(r => new Post(ctx, r))
    } catch (e) {
      throw e
    }
  }
  static find = async (ctx, id) => {
    try {
      const result = _data.find(r => r.id === id)
      return new Post(ctx, result)
    } catch (e) {
      throw e
    }
  }
  static findByAuthor = async (ctx, authorId) => {
    try {
      const result = _data.filter(p => p.authorId === author.id)
      return result.map(r => new Post(ctx, r))
    } catch (e) {
      throw e
    }
  }
}

register('Post', Post)