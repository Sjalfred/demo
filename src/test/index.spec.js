const request = require('supertest')
const app = require('../../app');



describe('end point tests', () => {

  test('test healthcheck', async () => {
    const res = await request(app)
      .get('/api/healthcheck')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      message: "Success"
    })

  })

  test('flight end point -should return 403 as token not provided', async () => {
    const res = await request(app)
      .get('/api/flight/11-01-2022/DXB/LHR')
    expect(res.statusCode).toEqual(403)

  })

  test('flight end point -should return 403 as in correct params', async () => {
    const res = await request(app)
      .get('/api/flight/DXB/LHR')
    expect(res.statusCode).toEqual(403)

  })

  test('price end point - should return 403 as token not provided', async () => {
    const res = await request(app)
      .get('/api/price/11-02-2022/EK0011')
    expect(res.statusCode).toEqual(403)

  })

})