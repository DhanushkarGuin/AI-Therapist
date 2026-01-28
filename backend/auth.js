    require('dotenv').config();
    const mysql = require('mysql2/promise');
    const bcrypt = require('bcryptjs');
    const prompt = require('prompt-sync')({ sigint: true });
    const { chatbotFeature } = require('./chatbotTest');
    const { suggestionFeature } = require('./suggestionBOT-test');

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

    // ------------------- TABLE SETUP -------------------
    async function ensureTables() {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS SignUP (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS chat_history (
                chat_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                sender ENUM('user', 'bot') NOT NULL,
                message TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES SignUP(user_id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS login_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                email VARCHAR(150) NOT NULL,
                login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES SignUP(user_id) ON DELETE CASCADE
            )
        `);
    }

    // ------------------- SIGNUP -------------------
    async function signUP() {
        const email = prompt('Enter email: ');
        const password = prompt('Enter password: ', { echo: '*' });

        if (password.length < 6) {
            console.log('Password must be greater than 6 characters');
            return;
        }

        const [existing] = await pool.query('SELECT user_id FROM SignUP WHERE email = ?', [email]);
        if (existing.length > 0) {
            console.log('Email already registered');
            return;
        }

        const hashed = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO SignUP (email, password) VALUES (?, ?)', [email, hashed]);
        console.log('Signup successfully! Go to login');
    }

    // ------------------- LOGIN -------------------
    async function login() {
        const email = prompt('Enter email: ');
        const password = prompt('Enter password: ', { echo: '*' });

        const [rows] = await pool.query('SELECT user_id, password FROM SignUP WHERE email = ?', [email]);
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

        console.log('✅ Login successfully');

        // ✅ Record login timestamp
        await pool.query(
            'INSERT INTO login_history (user_id, email) VALUES (?, ?)',
            [user.user_id, email]
        );

        console.log(`🕒 Login recorded for ${email}`);

        return user.user_id;
    }

    // ------------------- FEATURES MENU -------------------
    async function featuresSelect(user_id) {
        while (true) {
            console.log(`\nChoose Features for User ${user_id}`);
            console.log('1. Chatbot');
            console.log('2. SuggestionBot');
            console.log('3. Logout');

            const choice = prompt('Choose(1-3): ');
            if (choice === '1') {
                // Chatbot submenu
                while (true) {
                    console.log('\n--- Chatbot Menu ---');
                    console.log('1. New Chat');
                    console.log('2. History Chats');
                    console.log('3. Back to Main Menu');

                    const chatChoice = prompt('Choose(1-3): ');

                    if (chatChoice === '1') {
                        await chatbotFeature(user_id, pool); // Start new chat
                    } else if (chatChoice === '2') {
                        const [rows] = await pool.query(
                            'SELECT sender, message, timestamp FROM chat_history WHERE user_id = ? ORDER BY chat_id ASC',
                            [user_id]
                        );
                        if (rows.length === 0) {
                            console.log('No previous chats found.');
                        } else {
                            console.log('\n--- Your Chat History ---');
                            rows.forEach(row => {
                                console.log(`[${row.timestamp.toISOString()}] ${row.sender.toUpperCase()}: ${row.message}`);
                            });
                            console.log('--- End of History ---\n');
                        }
                    } else if (chatChoice === '3') {
                        break; // Back to main menu
                    } else {
                        console.log('Invalid option');
                    }
                }
            } else if (choice === '2') {
                await suggestionFeature();            
            } else if (choice === '3') {
                console.log('Logged out successfully');
                break;
            } else {
                console.log('Invalid option');
            }
        }
    }

    // ------------------- MAIN LOOP -------------------
    async function main() {
        await ensureTables();

        while (true) {
            console.log('\n=== AUTH TERMINAL ===');
            console.log('1. Sign UP');
            console.log('2. Login');
            console.log('3. Exit');
            const choice = prompt('Choose (1-3): ');

            if (choice === '1') await signUP();
            else if (choice === '2') {
                const user_id = await login();
                if (user_id) {
                    await featuresSelect(user_id);
                }
            } else if (choice === '3') {
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
