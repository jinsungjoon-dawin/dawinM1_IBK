import {Router} from 'express';
import tdatacode from '../model/tdatacode.js';
import tdatatr from '../model/tdatatr.js';
 
const router = Router() ;

router.get('/', async function (req, res, next) {
    const rdata = await tdatacode.tdatalist() ;
    res.json(rdata) ;
});

router.get('/loaddata_list', async function (req, res, next) {
    // console.log("req.query.did : " + req.query.did);

    const rdata = await tdatatr.tdatachklist(req) ;
    res.json(rdata) ;
});

router.get('/loaddata_checkres', async function (req, res, next) {
    // console.log("req.query.did : " + req.query.did);

    const rdata = await tdatatr.tdatachkresult(req) ;
    res.json(rdata) ;
});

export default router;
