const express = require('express');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

const sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
   maxAge: sixtyDaysInSeconds
}))

app.use(express.static('dist') );

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));