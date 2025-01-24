import mondb from '../db/dbconn.js' ;

const tdatatr = {
    /**
     * 모니터링 종합 적재 Data 검증 결과(최종)
     * BarChart
     */
    tdatatr_find : async () => {
        let rows = await mondb.query("	select sum(b.tblAsis) as tblAsis            \
                                    	     , sum(b.tblTobe) as tblTobe            \
	                                         , sum(b.idxAsis) as idxAsis            \
	                                         , sum(b.idxTobe) as idxTobe            \
	                                         , sum(b.objAsis) as objAsis            \
	                                         , sum(b.objTobe) as objTobe            \
	                                         , sum(b.invalidAsis) as invalidAsis    \
	                                         , sum(b.invalidTobe) as invalidTobe    \
                                        from (select did                            \
		                                        from tdatacode                      \
		                                        where wdate in (select max(wdate)   \
                                                                    from tdatacode) \
	                                         ) A                                    \
                                        join tdatatr B                              \
	                                        on a.did = b.did                        \
                                    ") ;
        return(rows) ;
    },
    /**
     * 모니터링 종합 적재 Data 검증 결과(최종)
     * BarChart
     */
    tdatatr_verify : async () => {
        let rows = await mondb.query("	select sum(b.tblTobe) as tblTobe                            \
	                                         , sum(b.tblAsis)-sum(b.tblTobe) as tblAsisTobeSum      \
                                        from (select did                                            \
		                                        from tdatacode                                      \
		                                        where wdate in (select max(wdate) from tdatacode)   \
	                                         ) A                                                    \
                                        join tdatatr B                                              \
	                                        on a.did = b.did                                        \
                                    ") ;
        return(rows) ;
    },    
}
 
export default tdatatr ;
