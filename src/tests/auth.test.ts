import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  it('debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Usuario Prueba',
        email: 'test@tdea.com',
        password: '123456'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', 'test@test.com');
  });

  it('debería iniciar sesión', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
