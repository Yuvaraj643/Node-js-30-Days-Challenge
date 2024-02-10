const express = require('express');
const path = require('path');

function staticFileServer(req, res) {
  const publicPath = path.join(__dirname, 'public');
  express.static(publicPath)(req, res, () => {
    res.status(404).send('File not found');
  });
}

const app = express();
app.get('/', staticFileServer);

app.use(express.static(path.join(__dirname, 'public','index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
