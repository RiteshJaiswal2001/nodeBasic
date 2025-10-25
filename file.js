const fs = require("fs");

fs.writeFileSync(
  "./example.txt",
  "Hey what the fuck are you doing in this room"
);

console.log("ram");

fs.appendFileSync(
  "./example.txt",
  "Hey what the fuck are you doing in this room"
);
