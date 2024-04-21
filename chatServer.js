const Express = require("express");
const app = Express();
const fs = require("fs");
const EvenEmitter = require("events");
const chatEmitter = new EvenEmitter();
chatEmitter.on("message", console.log);

const port = 5000;
app.listen(port);
console.log(`Server listening on port ${port}`);

app.get("/", respondText);
function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("hi");
}
app.get("/json", respondJson);
function respondJson(req, res) {
  res.json({ text: "hi", numbers: [1, 2, 3] });
}
app.get("/echo", respondEcho);
function respondEcho(req, res) {
  const { input = "" } = req.query;
  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split("").reverse().join(""),
  });
}
app.get("/static/*", respondStatic);
function respondStatic(req, res) {
  //   const filename = `${__dirname}/public/${req.params[0]}`;
  const filename = `${__dirname}/${req.params[0]}`;
  fs.createReadStream(filename)
    .on("error", () => respondNotFound(req, res))
    .pipe(res);
}
function respondNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

app.get("/chat", respondChat);
function respondChat(req, res) {
  const { message } = req.query;
  chatEmitter.emit("message", message);
  res.end();
}
app.get("/sse", respondSSE);
function respondSSE(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  const onMessage = (msg) => res.write(`data:${msg}\n\n`);
  chatEmitter.on("message", onMessage);
  res.on("close", function () {
    chatEmitter.off("message", onMessage);
  });
}
