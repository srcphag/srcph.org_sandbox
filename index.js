const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your Webflow site
app.use(cors({
  origin: 'https://srcphorg.webflow.io'
}));

// Your existing route handlers and other middleware here

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});