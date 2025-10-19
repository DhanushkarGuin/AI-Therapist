require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const prompt = require('prompt-sync')({ sigint: true }); // <-- prompt-sync

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 5
});

async function ensureUsersTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS login (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// ------------------- SIGNUP -------------------
async function signUP() {
    const email = prompt('Enter email: ');

    const password = prompt('Enter password: ', { echo: '*' }); // shows '*' while typing

    if (password.length < 6) {
        console.log('Password must be greater than 6 characters');
        return;
    }

    const [existing] = await pool.query('SELECT user_id FROM login WHERE email = ?', [email]);
    if (existing.length > 0) {
        console.log('Email already registered');
        return;
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO login (email, password) VALUES (?, ?)', [email, hashed]);
    console.log('Signup successfully!');
    console.log(`Go to login`)

}

// ------------------- LOGIN -------------------
async function login() {
    const email = prompt('Enter email: ');
    const password = prompt('Enter password: ', { echo: '*' }); // shows '*' while typing

    const [rows] = await pool.query('SELECT user_id, password FROM login WHERE email = ?', [email]);
    if (rows.length === 0) {
        console.log('Invalid email or password');
        return;
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        console.log('Invalid email or password');
        return;
    }

    console.log('Login successfully');

    return user.user_id;
}

async function featuresSelect(user_id) {
    while(true){
        console.log(`Choose below Features for ${user_id}`)
        console.log('1.Chatbot')
        console.log('2.Note-taking')
        console.log('3.Dashboard')
        console.log('4.Logout')

        const choice = prompt('Choose(1-4):')
        if(choice === '1'){
            console.log('Chatbot feature is here')
        }
        else if(choice === '2'){
            console.log('Note-taking  feature is here')
        }
        else if(choice === '3'){
            console.log('Dashboard feature is here')
        }
        else if(choice === '4'){
            console.log('Logged out successfully')
            break;
        }
        else{
            console.log('Invalid option')
        }
    }
}

// ------------------- MAIN LOOP -------------------
async function main() {
    await ensureUsersTable();

    while (true) {
        console.log('\n === AUTH TERMINAL ===');
        console.log('1. Sign UP');
        console.log('2. Login');
        console.log('3. Exit');
        const choice = prompt('Choose (1-3): ');

        if (choice === '1') await signUP();
        else if (choice === '2') {
          const user_id =   await login();
            if(user_id){
                await featuresSelect(user_id)
            }
        }
            else if (choice === '3') {
            console.log('Bye!');
            await pool.end();
            process.exit(0);
        } else {
            console.log('Invalid option');
        }
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
