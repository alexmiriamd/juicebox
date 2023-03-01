const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/juicebox-dev');

async function getAllUsers(){       //helper func from "Write Some Helper Functions" not connected to seed.js yet
    const { rows } = await client.query(
        `SELECT id, username
        FROM users;
    `);

    return rows;
}

module.exports ={
    client,
    getAllUsers,
}