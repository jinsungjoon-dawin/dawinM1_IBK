import mondb from '../db/dbconn.js' ;

const tperfcode = {
    /**모니터링 종합 성능테스트 결과(최종), 적재 Data 검증 결과(최종)
     * 년월일, 테스트제목
     */
    find : async () => {
        let rows = await mondb.query(" select substr(max(X.performdt), 1, 10) as performdt                \
                                            , trim(substr(max(X.performdt), 11, 500)) as performnm        \
                                            , substr(max(X.dataverifydt), 1, 10) as dataverifydt          \
                                            , trim(substr(max(X.dataverifydt), 11, 500)) as dataverifynm  \
                                            , trim(max(pjt_name)) as pjt_name                             \
                                            , trim(max(corpnm)) as corpnm                                 \
                                            , trim(max(startDt)) as startDt                               \
                                            , trim(max(endDt)) as endDt                                   \
                                            , trim(max(intl)) as intl                                     \
                                            , trim(max(vtotday)) as vtotday                               \
                                            , trim(max(vrday)) as vrday                                   \
                                          from (                                                          \
                                              select max(concat(lastDt,tname)) as performdt               \
                                                , '' as dataverifydt                                      \
                                                , '' as pjt_name                                          \
                                                , '' as corpnm                                            \
                                                , '' as startDt                                           \
                                                , '' as endDt                                             \
                                                , '' as intl                                              \
                                                , '' as vtotday                                           \
                                                , '' as vrday			                                        \
                                              from tperfcode                                              \
                                              where gb='3'                                                \
                                              union all                                                   \
                                              select '' as performdt                                      \
                                                , max(concat(wdate,dname)) as dataverifydt                \
                                                , '' as pjt_name                                          \
                                                , '' as corpnm                                            \
                                                , '' as startDt                                           \
                                                , '' as endDt                                             \
                                                , '' as intl                                              \
                                                , '' as vtotday                                           \
                                                , '' as vrday			                                        \
                                              from tdatacode                                              \
                                              where wdate in (select max(wdate) from tdatacode)           \
                                              union all                                                   \
                                              select ''     as performdt                                  \
                                                , ''        as dataverifydt                               \
                                                , pjt_name  as pjt_name                                   \
                                                , corpnm    as corpnm                                     \
                                                , startDt   as startDt                                    \
                                                , endDt     as endDt                                      \
                                                , intl      as intl                                       \
                                                , vtotday   as vtotday                                    \
                                                , vrday     as vrday			                                \
                                              from tprojenv                                               \
                                              where pkey=1                                                \
                                            ) X                                                           \
                                  " ) ;                                               
        return(rows) ;
    },
    /**
     * 성능종합 좌측 list
     * 차수, ASIS 년월일, TOBE 년월일
     */
    tperflist : async () => {
      let rows = await mondb.query(" select concat(seq,'차')	as seq      \
	                                        , asisDt						as asisDt   \
                                          , lastDt 						as tobeDt   \
                                        from tperfcode                    \
                                        where gb = '3'                    \
                                        order by lastDt desc              \
                                " ) ;                                               
      return(rows) ;
    },    
    /**
     * 성능종합 우측 
     * 제목, 년월일
     */
    tperftitle : async (args) => {
      let rows = await mondb.query(" select concat(tname, ' 테스트 결과')	as tname   \
                                          , lastDt 						           as tobeDt  \
                                        from tperfcode                              \
                                        where gb = '3'                              \
                                        and lastDt=?                     \
                                        and asisDt=?                     \
                                        limit 1" ,[args.query.lastDt, args.query.asisDt] ) ;                                               
      return(rows) ;
    },    
    save : async (args) => {
        try {
            let results = await mondb.query("update tperfcode       \
                                                SET tname=?         \
                                                  , gb=?            \
                                                  ,	startDt=?       \
                                                  ,	lastDt=?        \
                                                WHERE TID=?         \
                                                and SEQ=?"           
            [args.tname, args.gb, args.startDt, args.lastDt, args.TID, args.SEQ] ) ;

          return 1;
        } catch (e) {
          console.error(e) ;
          return 0;
        }
    },
}
 
export default tperfcode ;
