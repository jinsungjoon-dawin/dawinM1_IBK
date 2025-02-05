import {Router} from 'express';
import tperfcode from '../model/tperfcode.js';
import tperftest from '../model/tperftest.js';

const router = Router() ;

router.get('/', async function (req, res, next) {
    const rdata = await tperfcode.ttestlist() ;
    res.json(rdata) ;
});

router.get('/testcomp_title', async function (req, res, next) {
    // console.log("req.query.asisdt : " + req.query.asisdt);
    // console.log("req.query.tobedt : " + req.query.tobedt);

    const rdata = await tperfcode.ttesttitle(req) ;
    res.json(rdata) ;
});

router.get('/testcomp_list', async function (req, res, next) {
    // console.log("req.query.asisdt : " + req.query.asisdt);
    // console.log("req.query.tobedt : " + req.query.tobedt);

    const rdata = await tperftest.ttestchklist(req) ;
    res.json(rdata) ;
});

router.get('/testcomp_checkres', async function (req, res, next) {
    // console.log("req.query.asisdt : " + req.query.asisdt);
    // console.log("req.query.tobedt : " + req.query.tobedt);

    const rdata = await tperftest.ttestchkresult(req) ;
    res.json(rdata) ;
});

export default router;
