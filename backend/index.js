const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const port=3000;

const dbUser = process.env.DB_USER || 'secadv';
const dbHost = process.env.DB_HOST || 'db';
const dbDatabase = process.env.DB_DATABASE || 'pxldb';
const dbPassword = process.env.DB_PASSWORD || 'ilovesecurity';
const dbPort = process.env.DB_PORT || 5432;

const pool = new pg.Pool({
    user: dbUser,
    host: dbHost,
    database: dbDatabase,
    password: dbPassword,
    port: dbPort,
    connectionTimeoutMillis: 5000
});

console.log("Connecting...:")

const whitelist = ['http://localhost:8088']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const username = request.params.username;
    // const password = request.params.password;
    const password = await bcrypt.hash(request.params.password, 12);

    // const query = `SELECT * FROM users WHERE user_name='${username}' and password='${password}'`;
    // console.log(query);
    // pool.query(query, (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    //   response.status(200).json(results.rows)});
    
    const query = `SELECT * FROM users WHERE user_name = $1 and password = $2`;
    const values = [username, password];

    try {
        const results = await pool.query(query, values);
        response.status(200).json(results.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

