const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Bad Bank Capstone ',
            version: '1.0.0',
            description: 'Bank Bank API',
        },
    },
    apis: [path.join(__dirname, 'server.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// For hello world test
/**
 * @openapi
 * /hello:
 *   get:
 *     summary: Get a hello message
 *     responses:
 *       '200':
 *         description: Hello World response
 */
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

// For data abstraction layer

// Create a new account
/**
 * @openapi
 * /account/create/{name}/{email}/{password}:
 *   get:
 *     summary: Create a new account
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         type: string
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Account created successfully
 */
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// Login to an account
/**
 * @openapi
 * /account/login/{email}/{password}:
 *   get:
 *     summary: Log in to an account
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Login successful
 */
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password)
        .then((user) => {
            res.send(user);
        });
});

// Deposit funds to an account
/**
 * @openapi
 * /account/adjust/{email}/{amount}:
 *   get:
 *     summary: adjust funds to an account positive for deposit, negative for withdraw
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *       - name: amount
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: adjust successful
 */
app.get('/account/adjust/:email/:amount', function (req, res) {
    dal.adjust(req.params.email, req.params.amount)
        .then((balance) => {
            console.log('New Balance: ' + balance);
            res.send(balance);
        });
});

// Get the balance for an account
/**
 * @openapi
 * /account/balance/{email}:
 *   get:
 *     summary: Get the balance for an account
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Balance retrieved successfully
 */
app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email)
        .then((balance) => {
            console.log('Balance: ' + balance);
            res.send(balance);
        });
});

// For all data in the database
/**
 * @openapi
 * /account/all:
 *   get:
 *     summary: Get all data in the database
 *     responses:
 *       '200':
 *         description: Data retrieved successfully
 */
app.get('/account/all', function (req, res) {
    dal.all()
        .then((docs) => {
            console.log('Docs in index', docs);
            res.send(docs);
        });
});

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});