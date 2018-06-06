// @flow

import passport from 'passport';
import passportCustom from 'passport-custom';
import type { $Request } from 'express';

passport.use('custom', new passportCustom.Strategy((req: $Request, done) => {
  const user = {
    id: req.headers['user-id'],
    companyId: req.headers['company-id'],
  };

  // Didn't find how to send json custom message for the client.
  let errorMessage : ?string;
  if (!user.id) {
    errorMessage = 'User-Id is missing';
  } else if (!user.companyId) {
    errorMessage = 'Company-Id is missing';
  }

  if (errorMessage) {
    return done(null, false, errorMessage);
  }

  return done(null, user);
}));

export default passport;
