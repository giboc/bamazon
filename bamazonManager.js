var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aVarice1234!",
    database: "bamazon"
});

var sql;

function option1() {
    sql = "SELECT * FROM PRODUCTS";
    con.query(sql, (function (err, row, field) {
        if (err)
            console.log(err);
        row.forEach(function (item) {
            console.log("item id: " + item.item_id);
            console.log("product: " + item.product_name);
            console.log("department: " + item.department_name);
            console.log("Price: " + item.price);
            console.log("Current stock: " + item.stock_quantity + "\n");
        });
        printOption();


    }));
};

function option2() {

    sql = "SELECT * FROM PRODUCTS WHERE stock_quantity < 5";
    con.query(sql, (function (err, row, field) {
        if (err)
            console.log(err);
        if (row.length === 0)
            console.log("All items are at sufficient quantity.");
        else {
            row.forEach(function (item) {
                console.log("item id: " + item.item_id);
                console.log("product: " + item.product_name);
                console.log("department: " + item.department_name);
                console.log("Price: " + item.price);
                console.log("Current stock: " + item.stock_quantity + "\n");
            });
        }
        printOption();

    }));
}

function option3() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "id",
                message: "Enter product id: "
            },
            {
                type: 'input',
                name: "quantity",
                message: "Quantity to add: "
            }
        ])
        .then(answers => {
            if (answers.quantity <= 0) {
                console.log("Error: udpate quantity must be greater than zero.")
            }
            else {
                sql = "SELECT item_id FROM products where item_id=\"" + answers.id + "\"";
                con.query(sql, function (err, result) {
                    console.log("testing: " + result);
                    if (result.length === 0)
                        console.log("item id not found");
                    else {
                        sql = "UPDATE products SET stock_quantity = stock_quantity + " + answers.quantity + " WHERE item_id = \"" + answers.id + "\"";
                        console.log(sql);
                        con.query(sql, function (err, result) {
                            if (err)
                                console.log(err)
                            console.log("Stock replenished.");
                            sql = "SELECT item_id, stock_quantity FROM PRODUCTS WHERE item_id=\"" + answers.id + "\"";
                            con.query(sql, function (err, result) {
                                console.log(result[0].item_id + " units: " + result[0].stock_quantity);
                            });
                        });
                    }
                });
            }
            printOption();

        });
}

function option4() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: "id",
                message: "Enter new product id: "
            },
            {
                type: 'input',
                name: "name",
                message: "Enter new product name: "
            },
            {
                type: 'input',
                name: "dept",
                message: "Enter new product dept.: "
            },
            {
                type: 'input',
                name: "price",
                message: "Enter new product price: "
            },
            {
                type: 'input',
                name: "quantity",
                message: "Quantity to add: "
            }
        ])
        .then(answers => {
            if (answers.name.length < 5 || answers.name[0] != 'p' || answers.name.length > 8)
                console.log("Invalid product name. Please follow the PLU guidelines.");
            else if (parseFloat(answers.price) <= 0)
                console.log("Price must be greater than 0.");
            else if (parseFloat(answers.quantity) < 0)
                console.log("Quantity cannot be negative.");
            else {
                sql = "INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)"
                sql += 'VALUE("' + answers.id + '","' + answers.name + '","' + answers.dept + '",' + answers.price + ',' + answers.quantity + ')';
                con.query(sql, function (err) {
                    if (err.code === "ER_DUP_ENTRY")
                        console.error("Item already exists");
                    else if (err)
                        console.log(err);
                    else
                        console.log("Successfully added a new product.");
                });
            }
            printOption();

        });
}

function printOption(){
    console.log("Connected!");
    console.log("1) View Products for Sale");
    console.log("2) View Low Inventory");
    console.log("3) Add to Inventory");
    console.log("4) Add New Product");
    console.log("5) Log out");
    inquirer
        .prompt([
            {
                type: 'input',
                name: "option",
                message: "Select a function: "
            },
        ])
        .then(answers => {
            if (answers.option === '1') 
                option1();
            else if (answers.option === '2') 
                option2();
            else if (answers.option === '3') 
                option3();
            else if (answers.option === '4') 
                option4();
            else if(answers.option === '5')
                con.end();
            else{
                console.log("Invalid selection");
                printOption();
            }
        });
}

con.on('error', function (err) {
    console.log(err.code);
});

con.connect(function (err) {
    if (err)
        throw (err);
    printOption();
});


