const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.route');

// ✅ Connect to the database
connectToDb();

// ✅ CORS Configuration (allow localhost and tunnel URLs)
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin.startsWith('http://localhost') || origin.endsWith('.devtunnels.ms')) {
            callback(null, true); // ✅ Allow localhost and tunnel URLs
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // ✅ Allow cookies and credentials
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Test Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// ✅ Route Handlers
app.use('/users', userRoutes);
app.use('/captain', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

// ✅ Export the app
module.exports = app;
