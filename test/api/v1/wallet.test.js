// @flow
import request from 'supertest';
import { expect } from 'chai';

import app from '../../../src/bootstraper';
import common from '../../common';

const expressApp = app.getExpressApp();

// Add some tests but not everything is covered
describe('/v1/wallets', () => {
  describe('POST /', () => {
    it('should return a 401 as no credential are set', async () => {
      const { status } = await request(expressApp).post('/wallets');
      expect(status).equal(401);
    });

    it('should fail with currency message required', async () => {
      const { body, status } = await request(expressApp)
        .post('/wallets')
        .set(common.headers);
      expect(status).equal(400);
      expect(body).to.deep.equal({
        error: {
          message: '"currency" is required',
        },
      });
    });

    it('should fail with master message required', async () => {
      const { body, status } = await request(expressApp)
        .post('/wallets')
        .set(common.headers)
        .send({
          currency: 'EUR',
        });
      expect(status).equal(400);
      expect(body).to.deep.equal({
        error: {
          message: '"isMaster" is required',
        },
      });
    });
  });
});
