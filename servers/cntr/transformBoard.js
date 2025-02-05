import {Router} from 'express';
import tmigcode from '../model/tmigcode.js';
import tmigscene from '../model/tmigscene.js';

const router = Router() ;

router.get('/', async function (req, res, next) {
    const rdata = await tmigcode.ttranslist() ;
    res.json(rdata) ;
});

router.get('/transbo_list', async function (req, res, next) {
    // console.log("req.query.asisdt : " + req.query.asisdt);
    // console.log("req.query.tobedt : " + req.query.tobedt);

    const rdata = await tmigscene.ttransbolist(req) ;
    res.json(rdata) ;
});

export default router;
