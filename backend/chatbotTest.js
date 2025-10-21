const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');


async function chatbotFeature(user_id, pool) {
    console.log('Chatbot started!');
    const pythonScript = path.join(__dirname, '../chatbot/app.py');

    const python = spawn('python', ['-u', pythonScript], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    let isReady = false;

    python.stdout.on('data', async (data) => {
        const message = data.toString().trim();

        if (message.includes("READY")) {
            isReady = true;
            console.log("✅ Chatbot connected! Type your message below.\n");
        } else if (message) {
            console.log(`Bot: ${message}\n`);

            // Save bot message to DB
            await pool.query(
                'INSERT INTO chat_history (user_id, sender, message) VALUES (?, ?, ?)',
                [user_id, 'bot', message]
            );
        }
    });

    python.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    await new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        function askUser() {
            rl.question('You: ', async (input) => {
                if (input.toLowerCase() === 'exit') {
                    python.stdin.write('exit\n');
                    rl.close();
                    resolve();
                    return;
                }

                if (isReady) {
                    python.stdin.write(input + '\n');

                    // Save user message to DB
                    await pool.query(
                        'INSERT INTO chat_history (user_id, sender, message) VALUES (?, ?, ?)',
                        [user_id, 'user', input]
                    );
                } else {
                    console.log("⚠️ Chatbot not ready yet...");
                }

                askUser();
            });
        }

        askUser();
    });

    python.on('close', (code) => {
        console.log(`Chatbot exited with code ${code}`);
    });
}

module.exports = { chatbotFeature };
