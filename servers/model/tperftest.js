import mondb from '../db/dbconn.js' ;

const tperftest = {
    /**
     * 모니터링 종합 성능테스트 결과(최종)
     * BarChart
     */
    tperftest_find : async () => {
        let rows = await mondb.query(` with t as
                                        (select sid
                                            , avg(svctime) svctime
                                            , avg(svctime_asis) svctime_asis
                                         from tperftest
                                         where tid in (select max(tid) as tid from tperfcode where gb='3')
                                         group by sid)
                                        select x.apnm 					as apnm
                                            , x.tcnt 					as tcnt
                                            , x.scnt 					as scnt
                                            , x.nocnt 					as nocnt
                                            , x.tcnt-(x.nocnt+x.scnt) 	as delay
                                        from (
                                                select a.apnm 									as apnm
                                                    , count(1) 								    as tcnt
                                                    , sum(if(t.sid is null,1,0)) 				as nocnt
                                                    , sum(if(t.svctime < t.svctime_asis,1,0)) 	as scnt
                                                from tsid s
                                                join tapid a
                                                    on (s.apid = a.apid)
                                                left join t
                                                    on (s.sid = t.sid)
                                                group by a.apnm
                                            ) x
                                    `) ;
        return(rows) ;
    },
    /**
     * 모니터링 종합 성능테스트 결과(최종)
     * PieChart
     */
    tperftest_result : async () => {
        let rows = await mondb.query(`  with t as
                                            (select sid				as sid
                                                , avg(svctime) 	    as svctime
                                                , avg(svctime_asis) as svctime_asis
                                             from tperftest
                                             where tid in (select max(tid) as tid from tperfcode where gb='3')
                                             group by sid)
                                            select tcnt						as tcnt
                                                , improve					as scnt
                                                , not_perf					as nocnt
                                                , tcnt-(not_perf+improve) 	as delay
                                            from (
                                                    select count(1)                                 as tcnt
                                                        , sum(if(t.sid is null,1,0))                as not_perf
                                                        , sum(if(t.svctime < t.svctime_asis,1,0))   as improve
                                                    from tsid s
                                                    left join t
                                                        on s.sid = t.sid
                                                ) x
                                    `) ;
        return(rows) ;
    },    
    /**
     * 성능종합 우측 성능테스트 결과
     * BarChart
     */
    tperfchklist : async (args) => {
      console.log("args.query.asisdt : " + args.query.asisdt);
      console.log("args.query.tobedt : " + args.query.tobedt);
      
      let rows = await mondb.query(` with t as
                                            (select sid                 as sid
                                                  , avg(svctime)        as svctime
                                                  , avg(svctime_asis)   as svctime_asis
                                            from tperftest
                                            where tid in (select max(tid) as tid
                                                            from tperfcode
                                                            where gb='3'
                                                            and lastDt = ?
                                                            and asisDt = ?
                                                        )
                                            group by sid)
                                        select x.apnm as apnm
                                            , x.tcnt as tcnt
                                            , x.scnt as scnt
                                            , x.nocnt as nocnt
                                            , x.tcnt-(x.nocnt+x.scnt) as delay
                                        from (
                                                select a.apnm as apnm
                                                    , count(1) as tcnt
                                                    , sum(if(t.sid is null,1,0)) as nocnt
                                                    , sum(if(t.svctime < t.svctime_asis,1,0)) as scnt
                                                from tsid s
                                                join tapid a
                                                    on (s.apid = a.apid)
                                                left join t
                                                    on (s.sid = t.sid)
                                                group by a.apnm
                                            ) x
                                    `, [args.query.tobedt,args.query.asisdt] ) ;
        return(rows) ;
      },    
    /**
     * 성능종합 우측 성능테스트 결과
     * PieChart
     */
    tperfchkresult : async (args) => {
        let rows = await mondb.query(` with t as
                                            (select sid				as sid
                                                , avg(svctime) 	    as svctime
                                                , avg(svctime_asis) as svctime_asis
                                            from tperftest
                                            where tid in (select max(tid) as tid
                                                            from tperfcode
                                                            where gb='3'
                                                            and lastDt = ?
                                                            and asisDt = ?
                                            group by sid)
                                            select tcnt						as tcnt
                                                , improve					as scnt
                                                , not_perf					as nocnt
                                                , tcnt-(not_perf+improve) 	as delay
                                            from (
                                                    select count(1)                                 as tcnt
                                                         , sum(if(t.sid is null,1,0))               as not_perf
                                                         , sum(if(t.svctime < t.svctime_asis,1,0))  as improve
                                                    from tsid s
                                                    left join t
                                                        on s.sid = t.sid
                                                ) x
                                            limit 1
                                    `, [args.query.tobedt,args.query.asisdt] ) ;
        return(rows) ;
      },     
}
 
export default tperftest ;
