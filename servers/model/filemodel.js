// filemodel.js
import mondb from '../db/dbconn.js';

const filemodel = {
    fileDate: async () => {
        let rows = await mondb.query(`
            select 
                wdate 
            from 
                tlist_sum 
            group by wdate 
            order by wdate desc
        `);
        return(rows);
    },

    /**
     * 전환 file 관리조회
     */
    filesearch: async (args) => {
        let rows = await mondb.query(`
            select 
                sdir as directory,
                total_cnt,
                copy_cnt,
                diff_cnt,
                rate_percent,
                size_diff_cnt
            from 
                tlist_sum 
            where wdate = ? 
            order by sdir
        `, [args.query.wdate]);
        return(rows);
    },

    filesearchEtc: async (args) => {
        console.log(args.query.wdate);
        let rows = await mondb.query(`
            -- select sdate as file_dt, comment  from tstat  where sdate like concat(?, '%')
            select ? as file_dt , '태스트' as comment
        `, [args.query.wdate]);
        return(rows);
    },

    save: async (args) => {
        let data = JSON.parse(args);
        let comment = data[0].comment;
        let sdate = data[0].sdate;
        console.log("comment : " + comment);
        try {
            let results = await mondb.query(
                "update tstat SET comment=? where sdate like concat(?, '%')",
                [comment, sdate]
            );
            return 1;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }
};

export default filemodel;