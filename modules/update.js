var router = require('express').Router();
var pool = require('./pool');

router.post('/', function(req, res) {
    console.log(req); 
    var toDelete = req.body;
    
    pool.connect( function (err, client, done) {
        if (err) { 
            res.sendStatus=500; 
        } else {
            console.log('to update', [req.body]);
            var strDel = 'SELECT * FROM koalalas WHERE id = $1;';
            client.query(strDel, toDelete, function(err, results){
            done();            
                if (err) { 
                    console.log('error db', err); res.sendStatus(500);
                }
                else { res.send(results.rows); 
                }
            });
        }
    });
});

module.exports = router;