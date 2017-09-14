var router = require('express').Router();
var pool = require('./pool');

router.post('/', function(req, res) {
    console.log(req.body); 
    var toDelete = req.body.id;
    
    pool.connect( function (err, client, done) {
        if (err) { 
            res.sendStatus=500; 
        } else {
            console.log('to update', [req.body.id]);
            var strDel = 'UPDATE koalalas SET ready_for_transfer = false WHERE id=$1;';
            client.query(strDel, [toDelete], function(err, results){
            done();            
                if (err) { 
                    console.log('error db', err); res.sendStatus(500);
                }
                else { 
                    res.sendStatus(202); 
                    console.log('rows', results.rows);
                }
            });
        }
    });
});

module.exports = router;