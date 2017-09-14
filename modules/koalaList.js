var router = require('express').Router();
var pool = require('./pool');

router.get('/', function(req, res) {
    //connecting the SWIMMING POOLS
    pool.connect(function(koalaOOPS, client, done) {
        if (koalaOOPS) {
            res.sendStatus(500);
        }
        else {
            client.query('SELECT * FROM koalalas', function(error, resultSet){
                done();
                if (error) {
                    res.sendStatus(500);
                }
                else {
                    res.send(resultSet.rows);
                }
            });
        }
    });
});

router.post('/', function(req, res) {
    var koalas = req.body;
    
    pool.connect(function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            var text = 'INSERT INTO koalalas (name, age, gender, ready_for_transfer, notes) VALUES ($1, $2, $3, $4, $5);';
            var values = [koalas.name, koalas.age, koalas.gender, koalas.readyForTransfer, koalas.notes];
            client.query(text, values, function(err, resultObj){
                console.log('SQL query', values);
                done();
                if (err) {
                    console.log('error happened', err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.delete('/:id', function(req,res){
    var dbID = req.params.id;
    pool.connect(function (err, client, done){
        if(err) {
            res.sendStatus(500);
        } else {
            var text = 'DELETE * FROM koalalas WHERE id = $1;';
            client.query(text, dbID, function(){
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});
module.exports = router;