const { spawn } = require('child_process');

const python = spawn('python', ['-u', 'test.py']);

python.stdout.on('data', (data) => console.log('Bot:', data.toString()));
python.stdin.write('hello\n');
