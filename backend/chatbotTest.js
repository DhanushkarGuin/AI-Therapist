const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');

async function chatbotFeature(user_id, pool) {
    console.log('🤖 Chatbot started! Please wait...');
    // Adjust path for Python script (inside backend/chatbot/app.py)
    const pythonScript = path.join(__dirname, './chatbot/app.py');

    // Spawn Python process
    const python = spawn('python', ['-u', pythonScript], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    let isReady = false;

    // Handle output from Python
    python.stdout.on('data', async (data) => {
        const message = data.toString().trim();
        if (!message) return;

        // Bot ready message
        if (message.includes('READY')) {
            isReady = true;
            console.log(' Chatbot connected! Type your message below.\n');
            return;
        }

        // Crisis alert message from Python
        if (message.startsWith('NOTIFY:')) {
            const notification = message.replace('NOTIFY:', '').trim();
            console.log('\n===============================');
            console.log('   CRISIS ALERT DETECTED');
            console.log('===============================');
            console.log(notification);
            console.log('===============================\n');
            return;
        }

        // Regular chatbot output
        console.log(`Bot: ${message}\n`);

        // Save bot response to database
        try {
            await pool.query(
                'INSERT INTO chat_history (user_id, sender, message) VALUES (?, ?, ?)',
                [user_id, 'bot', message]
            );
        } catch (err) {
            console.error('DB Error (bot message):', err.message);
        }
    });

    // Handle Python errors
    python.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    // Read user input from terminal
    await new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        async function askUser() {
            rl.question('You: ', async (input) => {
                if (input.toLowerCase() === 'exit') {
                    python.stdin.write('exit\n');
                    rl.close();
                    resolve();
                    return;
                }

                if (!isReady) {
                    console.log('⚠️ Chatbot not ready yet...');
                    askUser();
                    return;
                }

                // Send user input to Python
                python.stdin.write(input + '\n');

                // Save user input to DB
                try {
                    await pool.query(
                        'INSERT INTO chat_history (user_id, sender, message) VALUES (?, ?, ?)',
                        [user_id, 'user', input]
                    );
                } catch (err) {
                    console.error('DB Error (user message):', err.message);
                }

                askUser();
            });
        }

        askUser();
    });

    // Handle chatbot exit
    python.on('close', (code) => {
        console.log(`Chatbot exited with code ${code}`);
    });
}

module.exports = { chatbotFeature };
