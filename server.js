const express = require('express');
const app = express();

const mongodb = require('./src/data/database');
const indexRouter = require('./src/routes/index');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Accept', 'Z-Key');
    next();
})

app.use('/', indexRouter);

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
        console.log(`Database listening and Server is running through node on http://localhost:${port}`);
    });
    }
});
