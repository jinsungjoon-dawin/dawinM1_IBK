import {Router} from 'express';
const router = Router() ;
import tlogon from '../model/tlogon.js';


// router.get('/', async function (req, res, next) {
//     const rdata = await tlogon.find() ;
//     res.json(rdata) ;
// });
router.post('/', async function (req, res, next) {
    const rdata = await tlogon.getUser(req) ;
    if(rdata.length !== 0){
        res.status(200).json(rdata[0]) ;
    }else{
        res.status(404).json({ message: '사용자를 찾을수 없습니다.\n아이디, 비밀번호를 확인하세요.'}) ;
    }
});

// router.post('/cp', async function (req, res, next) {ㄴ
//     const rdata = await tperfcode.find() ;
//     res.json(rdata) ;
// });

export default router;