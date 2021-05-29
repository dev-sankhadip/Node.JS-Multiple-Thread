const express = require("express");
const { Worker } = require('worker_threads');

const app = express();

const getSum = (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }
  return sum;
};

app.get("/main-thread", (req, res) => {
  const result = getSum(1000);
  res.send(`Processed function getSum on main thread and result: ${result}`);
});

app.get("/separate-thread", (req, res) => {
  const seprateThread = new Worker(__dirname + "/separateThread.js");
  seprateThread.on("message", (result) => {
    res.send(`Processed function getSum on seprate thread: ${result}`);
  });
  seprateThread.postMessage(1000);
});

app.listen(3000, (res) => {
  console.log("Running on 3000....");
});
