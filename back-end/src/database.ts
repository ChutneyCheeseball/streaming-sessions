import { FastifyInstance } from 'fastify'
import { DataTypes, Sequelize } from 'sequelize'
import fastifyPlugin from 'fastify-plugin'

interface dbOptions {
  database: string
  user: string
  password: string
  host: string
}

// =================================================================================================
// Database Plugin for Fastify
// =================================================================================================

function db(fastify: FastifyInstance, opts: dbOptions, done: (error?: Error) => void) {
  // Init db instance
  const sequelize = new Sequelize(opts.database, opts.user, opts.password, {
    host: opts.host,
    dialect: 'mysql'
  })

  // Define database structure for a session
  const Session = sequelize.define('Session', {
    id: {
      type: DataTypes.STRING(36), // UUID length
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    start: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    end: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  })

  // Test our database connection - if good: add hooks, decorators, do sync
  // Otherwise, let Fastify know to give up
  sequelize
    .authenticate()
    // All good
    .then(() => {
      console.log('DB connection is good')
      // Make models available to Fastify instance
      fastify.decorate('database', {
        sessions: Session,
      })
      // Close db on Fastify shutdown
      fastify.addHook('onClose', (_, done) => {
        console.log('DB shutting down...')
        sequelize.close().finally(() => done())
      })
      sequelize.sync().then(() => {
        console.log('DB sync complete')
        done()
      })
    })
    // Could not connect to db
    .catch((error) => {
      console.error(error)
      done(new Error('DB connection failed.'))
    })
}

// Necessary to preserve context, i.e. not lose our decorators
export const database = fastifyPlugin(db, {
  fastify: '5.x'
})
