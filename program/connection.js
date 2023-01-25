//campsite_name text not null,0
	//reservable boolean,1
	//dates_open text,2
	//has_water boolean,3
	//has_garbage boolean,4
	//toilet_type text,5
	//elevation integer,6
	//daily_fee integer,7
	//usage text,8
	//PRIMARY KEY (campsite_name)


    const pg = require('pg');
    const R = require('ramda');
    
    const cs = 'postgres://flnjrxba:YaMxq5w2wYQHDInY-jHCWI0pAFZ8VWV_@kashin.db.elephantsql.com/flnjrxba';
    
    const client = new pg.Client(cs);
    client.connect();
    
    function sendQuery()
    {
        const query = {
            text: 'SELECT * FROM campsite',
            rowMode: 'array'
        };
        
        client.query(query).then(res => {
        
            const data = res.rows;
            queryData = data;
            console.log('all data');
            data.forEach(row => {
                console.log(`Row0: ${row[0]} Row1: ${row[1]} Row2: ${row[2]}
                Row2: ${row[3]}`);
            })
        
            console.log('Sorted prices:');
    });
    }


