import express from 'express';
const router = express.Router();

router.get('/create', async(req, res) => {
    res.render('invitation/create', { title: '하하하' });
});


export default router;