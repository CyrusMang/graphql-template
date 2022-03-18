const { register } = require('../helpers/models')

const _data = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }
]

class Author {
  constructor(ctx, data) {
    this.ctx = ctx
    this.data = data
  }
  static find = (ctx, id) => {
    try {
      const result = _data.find(r => r.id === id)
      return new Author(ctx, result)
    } catch (e) {
      throw e
    }
  }
}

register('Author', Author)