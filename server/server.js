const express = require("express");
const cors = require("cors");
const { json } = require("express");
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3001;
const bootcampsRouter = require('./routes/bootcamps');
const developersRouter = require('./routes/developers');
const instructorsRouter = require('./routes/instructors');

app.use(cors());
app.use(json());

app.use('/bootcamps', bootcampsRouter)
app.use('/instructors', instructorsRouter)
app.use('/developers', developersRouter)

app.use(
  '/swagger',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.use("*", (_, res) => {
  res.status(400).json({
    message: "Trying to find easter eggs? There are only 3 end points!",
  });
});

app.listen(PORT, () =>
  console.log(`Remember to take breaks. Running on localhost:${PORT}`)
);
