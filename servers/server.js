import express from 'express';
import cors from 'cors' ;
import path from 'path';
import { notFound, errorHandler } from './middle/errors.js';
import { fileURLToPath } from "url";   
import logonchk from './cntr/logonchk.js';
import dashboard  from './cntr/dashBoard.js' ;
import performcomposit  from './cntr/performComposit.js' ;
import performdetail  from './cntr/performDetail.js' ;
import testcomposit  from './cntr/testComposit.js' ;
import testdetail  from './cntr/testDetail.js' ;
import transformboard  from './cntr/transformBoard.js' ;
import transformscenario  from './cntr/transformScenario.js' ;
import loaddataverifyresult  from './cntr/loadDataVerifyResult.js' ;
import useruploadmanagement  from './cntr/userUploadManagement.js' ;
import fileController from './cntr/fileController.js';

const app  = express();
const port = process.argv[2] ?? process.env.DMONPORT ?? 5880;

const __dirname = fileURLToPath(new URL(".", import.meta.url));   
const __filename = fileURLToPath(import.meta.url); 

app.set('trust proxy', true);
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));
app.use(cors());

console.log(__dirname);
app.use(express.static(path.join(__dirname, "../dist")));

//app.use(express.static('public'));
app.use((req,res,next) => {
   // console.log(req.originalUrl, req.query) ;
   next();
});

app.get('/', (req, res) => {
   res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.use('/logonchk', logonchk) ;
app.use('/dashboard', dashboard) ;
app.use('/performcomposit', performcomposit) ;
app.use('/performdetail', performdetail) ;
app.use('/testcomposit', testcomposit) ;
app.use('/testdetail', testdetail) ;
app.use('/transformboard', transformboard) ;
app.use('/transformscenario', transformscenario) ;
app.use('/loaddataverifyresult', loaddataverifyresult) ;
app.use('/useruploadmanagement', useruploadmanagement) ;
app.use('/file', fileController);

app.listen(port,'0.0.0.0', () => {
   console.log(`Server is up at port ${port}`);
});

app.use(notFound);
app.use(errorHandler);
