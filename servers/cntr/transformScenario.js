import {Router} from 'express';
import tmigcode from '../model/tmigcode.js';
import tmigscene from '../model/tmigscene.js';

const router = Router() ;

router.get('/', async function (req, res, next) {
    const rdata = await tmigcode.ttranslist() ;
    res.json(rdata) ;
});

router.get('/transsc_list', async function (req, res, next) {
    // console.log("req.query.mid : " + req.query.mid);
    // console.log("req.query.wstat : " + req.query.wstat);

    const rdata = await tmigscene.ttranssclist(req) ;
    res.json(rdata) ;
});

export default router;
