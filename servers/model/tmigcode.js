import mondb from '../db/dbconn.js' ;

const tmigcode = {
    /**
     * 
     */
    ttranslist : async () => {
      let rows = await mondb.query(` select concat(seq,'차')				     as seq
                                          , asisDt						           as asisdt
                                          , lastDt 						           as tobedt
                                          , concat(tname, ' 테스트 결과')	as tname
                                      from tperfcode
                                      where gb = '3'
                                      order by lastDt desc
                                  ` ) ;                                               
      return(rows) ;
    },    
    /**
     * 
     */
    save : async (args) => {
        try {
            let results = await mondb.query(`update tperfcode
                                                SET tname=?
                                                  , gb=?
                                                  ,	startDt=?
                                                  ,	lastDt=?
                                                WHERE TID=?
                                                and SEQ=?
                                            `, [args.tname, args.gb, args.startdt, args.lastdt, args.tid, args.seq] ) ;

          return 1;
        } catch (e) {
          console.error(e) ;
          return 0;
        }
    },
}
 
export default tmigcode ;
