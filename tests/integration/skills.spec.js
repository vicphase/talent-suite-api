const request = require('supertest');
const { Skill } = require('../../models/skill.model');
let server;

describe('/api/skills', () => {
  beforeEach(() => {
    server = require('../../bin/www');
  });
  afterEach(async () => {
    server.close();
    await Skill.remove({});
  });
  describe('GET /', () => {
    it('should return all the skills', async () => {
      await Skill.collection.insertMany([{ name: 'skill1' }, { name: 'skill2' }]);

      const res = await request(server).get('/api/skills');
      expect(res.status).toEqual(401);
      expect(res.body.length).toEqual(2);
      expect(res.body.some(skill => skill.name === 'skill1')).toBeTruthy();
      expect(res.body.some(skill => skill.name === 'skill2')).toBeTruthy();
    });
  });
});
