const express = require("express");
const fs = require("fs/promises");
const consumer = require("./kafkasecurity");
const app = express();
app.use(express.json());

app.get("/blocked", async function (req, res) {
    const bloqFile = await fs.readFile("/bloqUsers.json", "utf-8");
    const bloqUsers = JSON.parse(bloqFile);
    res.json({
      "users-blocked": bloqUsers,
    });
  });