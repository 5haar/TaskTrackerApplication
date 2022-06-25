const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // Not connected!
        console.log('Connected as ID ' + connection.threadId);
        // Use the connection
        connection.query('SELECT * FROM tasks WHERE status = "active"', (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};


// Find User by Search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // Not connected!
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        console.log()
        // Use the connection
        connection.query('SELECT * FROM tasks WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
};

exports.form = (req, res) => {
    res.render('add-task');
}


// Add new Task
exports.create = (req, res) => {
    const { task } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // Not connected!
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        // Use the connection
        connection.query('INSERT INTO tasks SET task = ?', [task],(err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('add-task', { alert: 'Task Added Successfully!' });
            } else {
                console.log(err);
            }
            console.log('The data from tasks table: \n', rows)
        });
    });
}


// Edit Task
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // Not connected!
        console.log('Connected as ID ' + connection.threadId);
        // Use the connection

        connection.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('edit-task', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
}

// Update Task
exports.update = (req, res) => {
    const { task } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // Not connected!
        console.log('Connected as ID ' + connection.threadId);
        // Use the connection

        connection.query('UPDATE tasks SET task = ? WHERE id = ?', [task, req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {

                pool.getConnection((err, connection) => {
                    if (err) throw err; // Not connected!
                    console.log('Connected as ID ' + connection.threadId);
                    // Use the connection
            
                    connection.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, rows) => {
                        // When done with the connection, release it
                        connection.release();
                        if (!err) {
                            res.render('edit-task', { rows, alert :`Task has been updated!`});
                        } else {
                            console.log(err);
                        }
                        console.log('The data from user table: \n', rows)
                    });
                });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
}


// Delete Task
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // Not connected!
        console.log('Connected as ID ' + connection.threadId);
        // Use the connection

        connection.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.redirect('/');
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
}

