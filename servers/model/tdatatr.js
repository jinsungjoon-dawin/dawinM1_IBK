import mondb from '../db/dbconn.js' ;

const tdatatr = {
    /**
     * 모니터링 종합 적재 Data 검증 결과(최종)
     * BarChart
     */
    tdatatr_find : async () => {
        let rows = await mondb.query(`	select sum(b.tblAsis)       as tblasis
                                    	     , sum(b.tblTobe)       as tbltobe
	                                         , sum(b.idxAsis)       as idxasis
	                                         , sum(b.idxTobe)       as idxtobe
	                                         , sum(b.objAsis)       as objasis
	                                         , sum(b.objTobe)       as objtobe
	                                         , sum(b.invalidAsis)   as invalidasis
	                                         , sum(b.invalidTobe)   as invalidtobe
                                        from (select did    as did
		                                        from tdatacode
		                                        where wdate in (select max(wdate) from tdatacode)
	                                         ) A
                                        join tdatatr B
	                                        on a.did = b.did
                                    `) ;
        return(rows) ;
    },
    /**
     * 모니터링 종합 적재 Data 검증 결과(최종)
     * BarChart
     */
    tdatatr_verify : async () => {
        let rows = await mondb.query(`	select sum(b.tblTobe)                   as tbltobe
	                                         , sum(b.tblAsis)-sum(b.tblTobe)    as tblasistobesum
                                        from (select did    as did
		                                        from tdatacode
		                                        where wdate in (select max(wdate) from tdatacode)
	                                         ) A
                                        join tdatatr B
	                                        on a.did = b.did
                                    `) ;
        return(rows) ;
    },    
}
 
export default tdatatr ;
