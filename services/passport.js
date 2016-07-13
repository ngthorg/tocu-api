import passport from 'passport';
import {
  Strategy as LocalStrategy,
} from 'passport-local';

/**
 * Passport Local
 * ------------------------------------------
 */
passport.use(new LocalStrategy({
  usernameField: 'accessName',
  passwordField: 'password',
}, () => {

}));
