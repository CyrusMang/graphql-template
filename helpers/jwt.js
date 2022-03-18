const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require("path")

// Please use your own key-pair
const priKey = fs.readFileSync(process.env.JWTRS256_KEY || './keys/jwtRS256.key')
const pubKey = fs.readFileSync(process.env.JWTRS256_KEY_PUB || './keys/jwtRS256.key.pub')

module.exports.decode = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token, 
      pubKey, 
      (error, decoded) => {
        if (error) {
          return reject(error)
        }
        resolve(decoded)
      },
    )
  })
}

module.exports.encode = (message, expiresIn=1200000) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      message, 
      priKey, 
      { 
        algorithm: 'RS256', 
        expiresIn: expiresIn 
      },
      (error, token) => {
        if (error) {
          return reject(error)
        }
        resolve(token)
      },
    )
  })
}