const getMongoUri = () => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.MONGO_URI_TEST
  }
  return process.env.MONGO_URI
}

module.exports = getMongoUri
