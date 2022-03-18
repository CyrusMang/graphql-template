const { decode } = require('./helpers/jwt')

module.exports.access = async (ctx, next) => {
  try {
    if (ctx.headers.authorization) {
      const [type, key] = ctx.headers.authorization.split(' ')
      if (/^Bearer$/i.test(type)) {
        let token
        try {
          token = await decode(Buffer.from(key, 'base64').toString('utf8'))
        } catch (e) {
          if (e.name !== 'TokenExpiredError') {
            // TODO: logging
            return ctx.throw(400, 'bad request')
          }
        }
        if (token && token.type === 'access_token') {
          ctx.state.token = token
        }
      }
    }
    await next()
  } catch (e) {
    throw e
  }
}
