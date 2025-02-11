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

router.post('/transsc_save', async function (req, res, next) {

    console.log("post req body  : " + JSON.stringify(req.body));

    console.log("post req body length : " + req.body.length);
    console.log("post req body 0 mid : " + req.body[0].mid);
    console.log("post req body 0 pkey : " + req.body[0].pkey);
    console.log("post req body 0 actstst : " + req.body[0].actstst);
    console.log("post req body 0 actendt : " + req.body[0].actendt);
    // console.log("post parm  : " + parms);
    // console.log("post parm 0  : " + parms[0]);

    //for
    
    const rdata = await tmigscene.ttransscsave(JSON.stringify(req.body)) ;

    if(rdata.length !== 0){
        // const rdata = await tmigscene.ttranssclist(req) ;
        res.status(200).json({ message: '수정을 완료하였습니다.'}) ;
    }else{
        res.status(404).json({ message: '수정을 완료하지 못했습니다.'}) ;
    }
  });

export default router;
