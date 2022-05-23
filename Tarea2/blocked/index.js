const express = require("express");
const fs = require("fs/promises");
const kafka = require("./kafkasecurity");
const app = express();
app.use(express.json());

const consumer = kafka.consumer({ groupId: "security-group" });


app.get("/blocked", async function (req, res) {
    const bloqFile = await fs.readFile("/bloqUsers.json", "utf-8");
    const bloqUsers = JSON.parse(bloqFile);
    res.json({
      "users-blocked": bloqUsers,
    });
  });