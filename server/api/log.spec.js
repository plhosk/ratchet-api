process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../index')
const getMongoUri = require('../getMongoUri')
const Log = require('../models/Log')

const should = chai.should() // eslint-disable-line
chai.use(chaiHttp)

describe('Log', () => {
  beforeEach((done) => {
    mongoose.connect(getMongoUri(), { useNewUrlParser: true })
    Log.remove({}, () => {
      done()
    })
  })

  describe('/GET log', () => {
    it('it should GET all the log entries', (done) => {
      chai.request(server)
        .get('/log')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })

  describe('/POST items', () => {
    it('should create a log entry when an item is POSTed', (done) => {
      const item = {
        title: 'test item',
        column: 2,
      }
      chai.request(server)
        .post('/items')
        .send(item)
        .end((err, res) => {
          res.should.have.status(200)
          chai.request(server)
            .get('/log')
            .end((err2, res2) => {
              res2.should.have.status(200)
              res2.body.should.be.a('array')
              res2.body.length.should.be.eql(1)
            })
          done()
        })
    })
  })
})
