import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let token: string

describe('Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
    const { token: userToken } = await CreateAndAuthenticateUser(app, true)

    token = userToken
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register gym', async () => {
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Aironberg Gym',
        description: 'Some description.',
        phone: '44999999999',
        latitude: -23.4505052,
        longitude: -51.9847876,
      })

    expect(response.statusCode).toEqual(201)
  })

  it('should be able search gym by title', async () => {
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Generyc Gym',
        description: 'Some description.',
        phone: '44999999999',
        latitude: -23.4312121,
        longitude: -51.8839795,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'Aironberg' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
  })

  it('should be able to fetch nearby gyms', async () => {
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Other Generyc Gym',
        description: 'Some description.',
        phone: '44999999999',
        latitude: -23.4505059,
        longitude: -51.9847879,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.4505052,
        longitude: -51.9847876,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
    expect(response.body).toEqual(
      expect.objectContaining({
        gyms: expect.arrayContaining([
          expect.objectContaining({ id: expect.any(String) }),
        ]),
      }),
    )
  })
})
