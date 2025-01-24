import mondb from '../db/dbconn.js' ;

const tlogon = {
    /**
     * 로그인 process
     */
    getUser : async (args) => {
      const ip = args.ip;
      const usrid = Buffer.from(args.body.usrid.substring(1), 'base64').toString('utf8');
      const pass = Buffer.from(args.body.pass.substring(2), 'base64').toString('utf8');
      let rows = await mondb.query("select if( PASSWORD(?) = pass1, 1,0) chk, admin, if(? like host,1,0) hg, apps FROM tuser where usrid = ? " ,[pass, ip, usrid]);
      return rows;
    },
}
 
export default tlogon ;
