const request = require('supertest');
const { Skill } = require('../../models/skill.model');
const { User, userRoles } = require('../../models/user.model');

let server;
let token;

describe('/api/skills', () => {
  beforeEach(() => {
    server = require('../../bin/www');
    token = new User({ role: userRoles.admin }).generateAuthToken();
  });

  afterEach(async() => {
    server.close();
    await Skill.remove({});
  });

  describe('GET /', () => {
    it('should return all the skills', async() => {
      await Skill.collection.insertMany([
        { name: 'skill1' },
        { name: 'skill2' }
      ]);

      const res = await request(server)
        .get('/api/skills')
        .set('access-token', token);

      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(2);
      expect(res.body.some(skill => skill.name === 'skill1')).toBeTruthy();
      expect(res.body.some(skill => skill.name === 'skill2')).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
    it('should return a skill if a valid id is passed', async() => {
      const skill = new Skill({ name: 'skill' });
      await skill.save();

      const res = await request(server)
        .get('/api/skills/' + skill._id)
        .set('access-token', token);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty('name', skill.name);
      expect(true).toBeTruthy();
    });

    it('should return 404 if invalid id is passed', async() => {
      const res = await request(server)
        .get('/api/skills/1')
        .set('access-token', token);

      expect(res.status).toEqual(404);
    });
  });
  describe('POST /', () => {
    it('should return 401 if client is not logged in', async() => {
      const res = await request(server)
        .post('/api/skills')
        .send({ name: 'skill' });

      expect(res.status).toEqual(401);
    });
    it('should return 400 if skill is invalid', async() => {
      const res = await request(server)
        .post('/api/skills')
        .set('access-token', token)
        .send({});

      expect(res.status).toEqual(400);
    });

    it('should save the skill if is valid', async() => {
      await request(server)
        .post('/api/skills')
        .set('access-token', token)
        .send({ name: 'skill' });

      const skill = await Skill.find({ name: 'skill' });

      expect(skill).not.toBeNull();
    });
  });
});
