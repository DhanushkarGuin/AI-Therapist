const express = require("express");
const { spawn } = require("child_process");

const router = express.Router();

// Start Python chatbot process ONCE
const pythonProcess = spawn("python", ["./chatbot/app.py"]);

pythonProcess.stdout.on("data", (data) => {
  const output = data.toString().trim();

  // Ignore READY signal
  if (output === "READY") return;

  console.log("PYTHON:", output);
});

pythonProcess.stderr.on("data", (data) => {
  console.error("PYTHON ERROR:", data.toString());
});

// 🔹 POST /chat
router.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      message: "Message is required",
    });
  }

  let responded = false;

  const handleResponse = (data) => {
    if (responded) return;
    responded = true;

    const reply = data.toString().trim();

    // Ignore READY again just in case
    if (reply === "READY") return;

    res.status(200).json({
      reply,
    });

    // Clean up listener
    pythonProcess.stdout.removeListener("data", handleResponse);
  };

  // Listen ONCE for response
  pythonProcess.stdout.on("data", handleResponse);

  // Send message to Python
  pythonProcess.stdin.write(message + "\n");
});

module.exports = router;
