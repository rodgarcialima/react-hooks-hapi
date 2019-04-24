const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { init } = require('../src/server');

chai.use(chaiHttp);

describe('Users', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {});
});
