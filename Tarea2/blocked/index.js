const express = require("express");
const fs = require("fs/promises");
const consumer = require("./kafkasecurity");
const app = express();
app.use(express.json());
const incorrectLogins = {};


app.get("/bloq", async function (req, res) {
    const bloqFile = await fs.readFile("/bloqUsers.json", "utf-8");
    const bloqUsers = JSON.parse(bloqFile);
    res.json({
      "users-blocked": bloqUsers,
    });
});

app.listen(5000, async function() {
    await consumer.connect();
    await consumer.subscribe({ topic: "login", fromBeginning: true });
    console.log("listening in port 5000");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          //console.log("hola")
          //console.log(incorrectLogins)
          const value = JSON.parse(message.value.toString());
          const { user, validation } = value;
          const bloqUsersFile = await fs.readFile("/bloqUsers.json", "utf-8");
          const bloqUsers = JSON.parse(bloqUsersFile);
          if (bloqUsers.includes(user)) {
            return;
          }
          if (!validation) {
            if (!incorrectLogins[user]) {
              incorrectLogins[user] = [Date.now()];
            } else {
              incorrectLogins[user].push(Date.now());
              const incorrectLoginsLength = incorrectLogins[user].length;
              if (incorrectLoginsLength >= 5) {
                if (
                  incorrectLogins[user][incorrectLoginsLength - 1] -
                    incorrectLogins[user][0] <=
                  60 * 1000
                ) {
                  bloqUsers.push(user);
                  await fs.writeFile(
                    "/bloqUsers.json",
                    JSON.stringify(bloqUsers)
                  );
                } else {
                  incorrectLogins[user].shift();
                }
              }
            }
          }
        },
      });
    });

