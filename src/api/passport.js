// @flow

import passport from 'passport';
import passportCustom from 'passport-custom';
import type { $Request } from 'express';

passport.use('custom', new passportCustom.Strategy((req: $Request, done) => {
  const user = {
    id: req.headers['user-id'],
    companyId: req.headers['company-id'],
  };

  let err: ?string;
  if (!user.id || !user.companyId) {
    err = 'Credentials required';
  }

  done(err, user);
}));

export default passport;
