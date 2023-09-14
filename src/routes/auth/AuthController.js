import express from 'express';
import passport from 'passport';


const router = express.Router();

router.get('/sign-in', async(req, res) => {
    res.render('auth/sign-in', { title: 'Sign In' });
});


router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}));


router.get('/naver', passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', {
    failureRedirect: '/',
}), (req, res) => res.redirect('/'));

export default router;