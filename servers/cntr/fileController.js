/* fileController.js */
import { Router } from 'express';
import filemodel from '../model/filemodel.js';

const router = Router();

router.get('/file_search', async function (req, res, next) {
    const rdata = await filemodel.filesearch(req);
    const etcData = await filemodel.filesearchEtc(req);
    const result = new Object();
    result.rdata = rdata;
    result.etcData = etcData;
    res.json(result);
});

router.get('/', async function (req, res, next) {
    const rdata = await filemodel.fileDate();
    res.json(rdata);
});

router.post('/save', async function (req, res, next) {
    console.log("Controller req body : " + JSON.stringify(req.body));
    const rdata = await filemodel.save(JSON.stringify(req.body));
    if (rdata === 1) {
        res.status(200).json({ "rdata": 1 });
    } else {
        res.status(200).json({ "rdata": 0 });
    }
});

export default router;