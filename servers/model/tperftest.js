import mondb from '../db/dbconn.js' ;

const tperftest = {
    /**
     * 모니터링 종합 성능테스트 결과(최종)
     * BarChart
     */
    tperftest_find : async () => {
        let rows = await mondb.query(` with t as
                                        (select sid               as sid
                                              , avg(svctime)      as svctime
                                              , avg(svctime_asis) as svctimeasis
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
                                                    , sum(if(t.svctime < t.svctimeasis,1,0)) 	as scnt
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
                                            (select sid				    as sid
                                                  , avg(svctime) 	    as svctime
                                                  , avg(svctime_asis)   as svctimeasis
                                             from tperftest
                                             where tid in (select max(tid) as tid from tperfcode where gb='3')
                                             group by sid)
                                            select tcnt						as tcnt
                                                , improve					as scnt
                                                , notperf					as nocnt
                                                , tcnt-(notperf+improve) 	as delay
                                            from (
                                                    select count(1)                                 as tcnt
                                                        , sum(if(t.sid is null,1,0))                as notperf
                                                        , sum(if(t.svctime < t.svctimeasis,1,0))   as improve
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
                                                  , avg(svctime_asis)   as svctimeasis
                                            from tperftest
                                            where tid in (select max(tid) as tid
                                                            from tperfcode
                                                            where gb='3'
                                                            and lastDt = ?
                                                            and asisDt = ? )
                                            group by sid)
                                        select x.apnm                   as apnm
                                            , x.tcnt                    as tcnt
                                            , x.scnt                    as scnt
                                            , x.nocnt                   as nocnt
                                            , x.tcnt-(x.nocnt+x.scnt)   as delay
                                        from (
                                                select a.apnm                                as apnm
                                                    , count(1)                               as tcnt
                                                    , sum(if(t.sid is null,1,0))             as nocnt
                                                    , sum(if(t.svctime < t.svctimeasis,1,0)) as scnt
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
                                            (select sid				    as sid
                                                  , avg(svctime) 	    as svctime
                                                  , avg(svctime_asis)   as svctimeasis
                                            from tperftest
                                            where tid in (select max(tid) as tid
                                                            from tperfcode
                                                            where gb='3'
                                                            and lastDt = ?
                                                            and asisDt = ? )
                                            group by sid)
                                            select tcnt						as tcnt
                                                , improve					as scnt
                                                , notperf					as nocnt
                                                , tcnt-(notperf+improve) 	as delay
                                            from (
                                                    select count(1)                                 as tcnt
                                                         , sum(if(t.sid is null,1,0))               as notperf
                                                         , sum(if(t.svctime < t.svctimeasis,1,0))   as improve
                                                    from tsid s
                                                    left join t
                                                        on s.sid = t.sid
                                                ) x
                                            limit 1
                                    `, [args.query.tobedt,args.query.asisdt] ) ;
        return(rows) ;
      },     
    /**
     * 성능종합 우측 성능테스트 결과
     * PieChart
     */
    tperfdelist : async (args) => {
        let rows = await mondb.query(` with t as
                                            (select sid			as sid				-- 수행차수		
                                                , tstime		as tstime			-- 테스트일시
                                                , stime			as stime			-- 시작시간 
                                                , etime			as etime			-- 종료시간
                                                , svctime		as svctime			-- 소요시간
                                                , stime_asis	as stimeasis		-- ASIS시작시간
                                                , etime_asis	as etimeasis		-- ASIS종료시간
                                                , svctime_asis	as svctimeasis		-- ASIS소요시간
                                                , regdt  		as regdt        	-- 등록시간
                                            from tperftest
                                            where tid in (select max(tid) as tid
                                                            from tperfcode
                                                            where gb='3'
                                                            and lastDt = ?
                                                            and asisDt = ?
                                                        )
                                            group by sid)
                                        select x.apnm                   					as apnm			-- 업무명
                                            -- , x.scnt                    					as scnt			-- 향상
                                            -- , x.nocnt                   					as nocnt		-- 미수행
                                            -- , x.tcnt - (x.nocnt + x.scnt)					as delay		-- 지연
                                            , case when x.scnt=1 and x.nocnt=0 then '향상' 
                                                when x.scnt=0 and x.nocnt=1 then '미수행'
                                                else '지연' end 							as gubun		-- 구분
                                            , NVL(tstime,'')							    as tstime		-- 테스트일시
                                            , NVL(stime,'')								    as stime		-- 시작시간 
                                            , NVL(etime,'')								    as etime		-- 종료시간
                                            , NVL(svctime,'')								as svctime		-- 소요시간
                                            , NVL(stimeasis,'')							    as stimeasis	-- ASIS시작시간
                                            , NVL(etimeasis,'')							    as etimeasis	-- ASIS종료시간
                                            , NVL(svctimeasis,'')							as svctimeasis	-- ASIS소요시간
                                            , NVL(regdt,'')  								as regdt        -- 등록시간
                                        from (
                                                select a.apnm                           as apnm			-- 업무명
                                                    , 1									as tcnt			-- 향상
                                                    , if(t.svctime < t.svctimeasis,1,0)	as scnt			-- 미수행
                                                    , if(t.sid is null,1,0)		        as nocnt		-- 지연
                                                    , t.tstime							as tstime		-- 테스트일시
                                                    , t.stime							as stime		-- 시작시간 
                                                    , t.etime							as etime		-- 종료시간
                                                    , t.svctime							as svctime		-- 소요시간
                                                    , t.stimeasis						as stimeasis	-- ASIS시작시간
                                                    , t.etimeasis						as etimeasis	-- ASIS종료시간
                                                    , t.svctimeasis						as svctimeasis	-- ASIS소요시간
                                                    , t.regdt  							as regdt        -- 등록시간
                                                from tsid s
                                                join tapid a
                                                    on (s.apid = a.apid)
                                                left join t
                                                    on (s.sid = t.sid)
                                            ) x
                                    `, [args.query.tobedt,args.query.asisdt] ) ;
        return(rows) ;
      },     
}
 
export default tperftest ;
