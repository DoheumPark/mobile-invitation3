import passport from 'passport';
import naver from './naverStrategy.js';
import kakao from './kakaoStrategy.js';
import Models from '../../models/index.js';

export default () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
     });
  
    passport.deserializeUser((id, done) => {
        Models.User.findOne({ where: { id } })
           .then(user => done(null, user))
           .catch(err => done(err));
     });

     naver();
     kakao();
}