// suggestionBOT-test.js
const readline = require("readline");
const { spawn } = require("child_process");
const path = require("path");

async function suggestionFeature() {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, "../suggestion-bot/bot.py");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const python = spawn("python", ["-u", pythonScript]);

    // Buffer output to handle multi-line JSON
    let buffer = "";
    python.stdout.on("data", (data) => {
      buffer += data.toString();

      // Only parse once full JSON arrives
      if (buffer.trim().endsWith("}")) {
        try {
          const parsed = JSON.parse(buffer.trim());
          console.log(`\n🧠 ${parsed.response || parsed.error}\n`);
          rl.close();
          python.stdin.end();
          resolve();
        } catch (err) {
          console.log("⚠️ Waiting for complete data from Python...");
        }
      }
    });

    python.stderr.on("data", (data) => {
      console.error(`Python Error: ${data}`);
    });

    // Strict input validation function
    async function askQuestion(question, min = 0, max = 2) {
      return new Promise((res) => {
        rl.question(question, (ans) => {
          if (!/^[0-9]$/.test(ans)) {
            console.log("\n❌ Invalid input! Enter only a single digit.");
            process.exit(1);
          }
          const num = parseInt(ans);
          if (num < min || num > max) {
            console.log(`\n❌ Invalid input! Enter a number between ${min} and ${max}.`);
            process.exit(1);
          } else {
            res(num);
          }
        });
      });
    }

    (async () => {
      console.log("🤖 Suggestion Bot Started!\nEnter numbers based on options.\n");

      const current_emotion = await askQuestion(`
How have you been feeling lately?
  2: Mostly okay, just a bit stressed
  1: Low or anxious often
  0: Overwhelmed or hopeless
Enter number (0–2): `);

      const duration_distress = await askQuestion(`
How long have you been feeling this lately?
  2: Just a few days
  1: For a few weeks
  0: For a few months or longer
Enter number (0–2): `);

      const type_concern = await askQuestion(`
What would you like to talk about?
  4: Work or study stress
  3: Relationship or social issues
  2: Motivation or daily balance
  1: Trauma or loss
  0: Thoughts of self-harm or crisis situations
Enter number (0–4): `, 0, 4);

      const urgency_level = await askQuestion(`
Do you feel safe right now?
  2: Yes, I feel safe
  1: I'm not sure
  0: No, I need urgent help
Enter number (0–2): `);

      const support_style = await askQuestion(`
How would you like your sessions to feel?
  2: Short and focused — quick, frequent check-ins
  1: Balanced — mix of chat and reflection
  0: In-depth — deep conversations and guidance
Enter number (0–2): `);

      const openness_to_technology = await askQuestion(`
How comfortable are you talking with an AI chatbot?
  2: Very comfortable — I actually prefer it
  1: Somewhat comfortable — I can give it a try
  0: Not comfortable — I’d rather talk to a person
Enter number (0–2): `);

      const time_availability = await askQuestion(`
How much time can you dedicate per session?
  2: 10–15 minutes at a time
  1: 30–45 minutes
  0: Around an hour or more
Enter number (0–2): `);

      const issue_clarity = await askQuestion(`
Do you know what's been bothering you?
  2: Yes, I can describe it clearly
  1: Kind of, but I’m not sure
  0: Not really — I just feel off or confused
Enter number (0–2): `);

      const userData = {
        current_emotion,
        duration_distress,
        type_concern,
        urgency_level,
        support_style,
        openness_to_technology,
        time_availability,
        issue_clarity,
      };

      python.stdin.write(JSON.stringify(userData) + "\n");
    })();
  });
}

module.exports = { suggestionFeature };