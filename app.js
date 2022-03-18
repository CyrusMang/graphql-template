const path = require('path')
const koa = require('koa')
const mount = require('koa-mount')
const { graphqlHTTP } = require('koa-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { access } = require('./middleware')
const dirimport = require('./helpers/dirimport')

dirimport(path.join(__dirname, 'models'))

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
})

const app = new koa()
const port = process.env.PORT || 80

app.listen(port)

app.use(access)
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'content-type, authorization')
  ctx.set('Access-Control-Max-Age', '1728000')
  if (ctx.request.method === 'OPTIONS') {
    return ctx.body = ''
  }
  try {
    await next()
  } catch (e) {
    console.log(e)
    throw e
  }
})
app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: { headerEditorEnabled: true }
})))

console.log('Server running on port ' + port)