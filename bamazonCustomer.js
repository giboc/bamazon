var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aVarice1234!",
    database: "bamazon"
});



con.connect(function (err) {
    if (err)
        console.log(err);
    console.log("Connected!");
});

var sql = "select * from products;"

con.query(sql, function (err, result, fields) {
    if (err)
        console.log(err);
    result.forEach(function (row) {
        console.log("ID: " + row.item_id);
        console.log("Item: " + row.product_name);
        console.log("Price: $" + row.price);
        console.log("");
    });
    inquirer
        .prompt([
            {
                type: 'input',
                name: "item_id",
                message: "What product (id) do you want to buy?"
            },
            {
                type: 'input',
                name: "quantity",
                message: "How many do you want?"
            }
        ])
        .then(answers => {
            if (answers.item_id.charAt(0) != 'p' || answers.item_id.length > 5)
                console.log("Error: invalid item selection.");
            else if (isNaN(answers.quantity))
                console.log("Error: invalid quantity");
            else {
                sql = "select stock_quantity from products where item_id = \"" + answers.item_id + "\"";
                con.query(sql, (function (err, row, field) {
                    if (row[0].stock_quantity >= answers.quantity) {
                        sql = "UPDATE products SET stock_quantity = stock_quantity - " + answers.quantity + " WHERE item_id = \"" + answers.item_id + "\"";
                        con.query(sql, function (err, result) {
                            if (err)
                                console.log(err)
                            console.log("Order placed!");
                            sql = "SELECT price from products where item_id= \"" + answers.item_id + "\"";
                            con.query(sql, (function (err, row, field) {
                                console.log("Total price of your order: $" + row[0].price * answers.quantity);
                            }));
                        });
                    }
                    else
                        console.log("Insufficient quantity. Cancelling order.");
                }));
            }

        });
});

