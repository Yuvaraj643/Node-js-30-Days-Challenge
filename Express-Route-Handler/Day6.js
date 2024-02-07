const express = require('express');
const app = express();

function greetHandler(req, res) {
  const { name } = req.query;
  const greeting = name ? `Hello, ${name}!` : "Hello, Guest!";
  res.send(greeting);
}

app.get('/greet', greetHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
