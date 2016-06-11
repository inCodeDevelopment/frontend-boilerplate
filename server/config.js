import path from 'path'

const env = process.env.NODE_ENV || 'development'

const config = require(path.join(__dirname, `../config/${env}`)).default

export default config
