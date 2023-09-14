import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import Models from '../../models/index.js';
dotenv.config();

export default () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                clientSecret: process.env.KAKAO_SECRET,
                callbackURL: '/auth/kakao/callback',
            }, 
            async (accessToken, refreshToken, profile, done) => {
                console.log('kakao profile : ', profile);
                try {
                   const exUser = await Models.User.findOne({                     
                      where: { uid: profile.id, provider: 'kakao' },
                   });
                   // 이미 가입된  z카카오 프로필이면 성공
                   if (exUser) {
                      done(null, exUser);
                   } else {
                      // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                      const newUser = await Models.User.create({                       
                           provider: 'kakao',
                           uid: profile.id
                      });
                      done(null, newUser);
                   }
                } catch (error) {
                   console.error(error);
                   done(error);
                }
             },
        ),
    );
}