const data = require("./data.json")
const { parsePrice } = require("./parse-price")
const desired = data.find(x => x.title.includes("Kruthusgatan"))
parsePrice(desired.regularPrice)
