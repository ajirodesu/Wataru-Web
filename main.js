const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const loadAll = require("./system/utility/loadAll");
const { install } = require("./system/utility/install");

// Load config.json
const config = require("./config.json");
global.config = config;
const { prefix } = config;

global.client = {
  commands: new Map(),
  events: new Map(),
};

// Middleware to parse JSON
app.use(express.json());

loadAll()

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "system", "public")));

const { listen } = require("./system/listen");
listen({ app });
install();

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
