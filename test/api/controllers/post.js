process.env.NODE_ENV = 'test';

const should = require('should');
const request = require('supertest');
const server = require('../../../app');
const Post = require('../../../api/schemas/Post')

describe('controllers', function() {

  describe('post', function() {

    describe('POST /post', function() {

      it('should create post', function(done) {

        request(server)
          .post('/post')
          .send({username: 'test', text: 'test'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            
            res.body.should.eql({ success: 1, description: 'post created' });

            done();
          });
      });

      it('should not create post with invalid data', function(done) {
        let testText = new Array(201).fill('s').join('');
        
        request(server)
          .post('/post')
          .send({username: 'test__!', text: testText})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(function(err, res) {
            should.not.exist(err);
            
            res.body.should.eql({ message: 'Username must contain only letters and digits. Text length must be less then 200' });

            done();
          });
      })

    });

    describe('GET /post', function () {
      it('should get recently created post', function (done) {

        request(server)
          .get('/post')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.posts[0].username.should.eql('test');
            res.body.posts[0].text.should.eql('test');

            done();
          });

      })
    })

    after(function(done) {
      Post.remove({}, function () {
        done();
      })
    });

  });

});
