require('dotenv').config();
const PORT = process.env.SERVER_PORT || 4000;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { shutdownPrisma } = require('./lib/utils/prismaDisconnect');

// Routes
const userRoute = require('./routes/user.route');
const eventRoute = require('./routes/event.route');
const competitionRoute = require('./routes/competition.route');
const scoresheetRoute = require('./routes/scoresheet.route');
const candidateRoute = require('./routes/candidate.route');

const app = express();

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get('/', (req, res) => res.send('Express on Vercel'));
app.use('/api/user', userRoute);
app.use('/api/event', eventRoute);
app.use('/api/competition', competitionRoute);
app.use('/api/scoresheet', scoresheetRoute);
app.use('/api/candidate', candidateRoute);

// Disconnect Prisma when the server exit
// process.on('SIGINT', shutdownPrisma);
// process.on('SIGTERM', shutdownPrisma);

// Error handler
app.use((err, req, res, next) => {
  // const statusCode = err.statusCode || 500;
  const errorTitle = err.title;
  console.error(`${errorTitle} :: ${err.stack}`);
  return res
    .status(500)
    .send(`Error: ${errorTitle || 'Internal Server Error'}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(process.env.DB_NAME),
    console.log(`Server running on PORT ${PORT}`);
});
