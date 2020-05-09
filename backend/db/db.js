const pg = require('pg');

const pool = new pg.Pool({database: uralla});

module.exports = {
    query: (sql, params) => {
        return pool.query(sql, params);
    }
}