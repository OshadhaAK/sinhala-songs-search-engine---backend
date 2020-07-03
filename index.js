const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('IR ES Project!')
});

const search = require('./routes/search');
app.use('/search',search);

const index = require('./routes/index');
app.use('/index',index);

app.use((req, res, next) => {
    if (!res.data) {
        return res.status(404).send({
            status: false,
            error: {
                reason: "Invalid Endpoint", 
                code: 404
            }
        });
    }

    res.status(res.statusCode || 200).send({ status: true, response: res.data });
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();
});

module.exports = app;