import express from 'express';
import cors from 'cors' ;
import path from 'path';
import { notFound, errorHandler } from './middle/errors.js';
import projenv  from './cntr/proJenv.js' ;
import dashboard  from './cntr/dashBoard.js' ;
import performcomposit  from './cntr/performComposit.js' ;
import logonchk from './cntr/logonchk.js';
import { fileURLToPath } from "url";   

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

app.use('/projenv', projenv) ;
app.use('/dashboard', dashboard) ;
app.use('/performcomposit', performcomposit) ;
app.use('/performdetail', performdetail) ;
app.use('/logonchk', logonchk) ;

app.listen(port,'0.0.0.0', () => {
   console.log(`Server is up at port ${port}`);
});

app.use(notFound);
app.use(errorHandler);
