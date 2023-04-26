

const express = require("express");
const serverless = require("serverless-http");
const waitlistRoutes = require("./routes/waitlist");
const cors = require('cors')

// import express from 'express';
// import serverless from 'serverless-http';
// import cors from 'cors';



const app = express();



app.use(express.json());
app.use(cors())


// app.get("/users/:userId", async function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   };

//   try {
//     const { Item } = await dynamoDbClient.send(new GetCommand(params));
//     if (Item) {
//       const { userId, name } = Item;
//       res.json({ userId, name });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'Could not find user with provided "userId"' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not retreive user" });
//   }
// });

// app.post("/users", async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.send(new PutCommand(params));
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  const name = req.body.name

  res.send(`Hello ${name}!`)
})

app.use('/waitlist', waitlistRoutes) // added waitlist routes


module.exports.handler = serverless(app);

// added secrets