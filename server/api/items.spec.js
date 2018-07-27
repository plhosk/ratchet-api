process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../index')
const getMongoUri = require('../getMongoUri')
const Item = require('../models/Item')

const should = chai.should() // eslint-disable-line
chai.use(chaiHttp)

describe('Items', () => {
  beforeEach((done) => {
    mongoose.connect(getMongoUri(), { useNewUrlParser: true })
    Item.remove({}, () => {
      done()
    })
  })

  describe('/GET items', () => {
    it('it should GET all the items', (done) => {
      chai.request(server)
        .get('/items')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })

  describe('/POST items', () => {
    it('should not allow an item without a title field to POST', (done) => {
      const item = {
        title: 'testing',
      }
      chai.request(server)
        .post('/items')
        .send(item)
        .end((err, res) => {
          res.should.not.have.status(200)
          done()
        })
    })

    it('should not allow an item without a column field to POST', (done) => {
      const item = {
        column: 2,
      }
      chai.request(server)
        .post('/items')
        .send(item)
        .end((err, res) => {
          res.should.not.have.status(200)
          done()
        })
    })

    it('should POST an item with title and column', (done) => {
      const item = {
        title: 'test item',
        column: 2,
      }
      chai.request(server)
        .post('/items')
        .send(item)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should allow the POSTed item to be retrieved with GET', (done) => {
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
            .get('/items')
            .end((err2, res2) => {
              res2.should.have.status(200)
              res2.body.should.be.a('array')
              res2.body.length.should.be.eql(1)
            })
          done()
        })
    })
  })

  describe('/DELETE items', () => {
    it('should POST an item and DELETE it', (done) => {
      const item = {
        title: 'test item',
        column: 2,
      }
      let postedItem
      chai.request(server)
        .post('/items')
        .send(item)
        .end((err, res) => {
          res.should.have.status(200)
          postedItem = res.body
          chai.request(server)
            .get('/items')
            .end((err2, res2) => {
              res2.should.have.status(200)
              res2.body.should.be.a('array')
              res2.body.length.should.be.eql(1)
              chai.request(server)
                .delete(`/items/${postedItem._id}`) // eslint-disable-line no-underscore-dangle
                .end((err3, res3) => {
                  res3.should.have.status(200)
                  chai.request(server)
                    .get('/items')
                    .end((err4, res4) => {
                      res4.should.have.status(200)
                      res4.body.should.be.a('array')
                      res4.body.length.should.be.eql(0)
                    })
                })
            })
          done()
        })
    })
  })
})
