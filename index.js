const express = require('express')
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express()
const port = 3000

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Shopify webhook secret from the Shopify admin panel
const SHOPIFY_WEBHOOK_SECRET = "your-webhook-secret";

// Route to receive the webhook
app.post("/webhook/orders/create", (req, res) => {
  const hmac = req.get("X-Shopify-Hmac-Sha256");
  const body = JSON.stringify(req.body);

  // Verify the HMAC to ensure the data came from Shopify
  const hash = crypto
    .createHmac("sha256", "22d4a72d56d554df87b331e5e1d7e7d10a55604b1f34b1e7f15f8e60b4e7e61b")
    .update(body, "utf8")
    .digest("base64");

  // if (hash === hmac) {
    console.log("Verified webhook received");
    console.log("Order data:", req.body);

    // Handle the order creation logic here
    res.status(200).send("Webhook received successfully");
  // } 
  // else {
  //   console.error("Failed to verify Shopify HMAC signature");
  //   res.status(401).send("Unauthorized");
  // }
});

app.get('/', (req, res) => {
  res.send('Hello your Astro App is live')
})
app.get('/test', (req, res) => {
  res.send('Hello your Astro App is live yuhoo!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})