import mondb from '../db/dbconn.js' ;

const tdatacode = {
    /**
     * DashBoard 성능테스트 결과(최종) 년월일, 적재 Data 검증 결과(최종) 년월일
     */
    find : async () => {
        let rows = await mondb.query(`	select substr(max(X.performdt), 1, 10)            as performdt
	                                           , trim(substr(max(X.performdt), 11, 500))    as performnm
	                                           , substr(max(X.dataverifydt), 1, 10)         as dataverifydt
	                                           , trim(substr(max(X.dataverifydt), 11, 500)) as dataverifynm
                                        from ( 
                                                select max(concat(lastDt,tname)) as performdt
			                                               , ''                        as dataverifydt
                                                from tperfcode
                                                where gb='3'
                                                union all
                                                select ''                        as performdt
                                                     , max(concat(wdate,dname))  as dataverifydt
                                                from tdatacode
	                                         ) X
                                    ` ) ;
        return(rows) ;
    },
    /**
     * save
     */
    save : async (args) => {
        try {
          let results = await mondb.query(`update tdatacode
                                            SET dname = ?
                                              , wdate = ?
                                              ,	sf = ?
                                            WHERE did = ?
                                            and seq = ?
                                          `, [args.dname, args.wdate, args.sf, args.did, args.seq] ) ;
          return 1;
        } catch (e) {
          console.error(e) ;
          return 0;
        }
      },
}
 
export default tdatacode ;