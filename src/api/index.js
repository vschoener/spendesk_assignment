// @flow

import { Router } from 'express';
import currentApiRouter from './v1';
import passport from './passport';

const router = Router();
const passportOption = {
  session: false,
};
router.use('/v1', passport.authenticate('custom', passportOption), currentApiRouter);
router.use('/', passport.authenticate('custom', passportOption), currentApiRouter);

// We could also use a list of version and require all our api version router
// Let's keep this simple for now

export default router;
