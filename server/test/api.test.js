const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏' 
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
    it('responds with inserted message', function (done) {
        const requestObj = {
            name: 'Siyuan',
            message: 'This is a cool app!',
            latitude: -90,
            longitude: 180
        }

        const responseObj = {
            ...requestObj,
            _id: "5c2bb214e8e1954c5c8f61b4",
            date: "2019-01-01T18:31:48.421Z"
        }
        request(app)
            .post('/api/v1/messages')
            .send(requestObj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                res.body._id = "5c2bb214e8e1954c5c8f61b4",
                res.body.date = "2019-01-01T18:31:48.421Z"
            })
            .expect(200, responseObj, done)
    });

    it('responds with a name that has diacritics', function(done) {
        const requestObj = {
            name: '​Ÿööhöö',
            message: 'This is a diacritic name!',
            latitude: -90,
            longitude: 180
        }

        const responseObj = {
            ...requestObj,
            _id: "5c2bb214e8e1954c5c8f61b4",
            date: "2019-01-01T18:31:48.421Z"
        }
        request(app)
            .post('/api/v1/messages')
            .send(requestObj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                res.body._id = "5c2bb214e8e1954c5c8f61b4",
                res.body.date = "2019-01-01T18:31:48.421Z"
            })
            .expect(200, responseObj, done)

    });
});
