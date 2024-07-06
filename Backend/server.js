const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const userRoutes =require('./routes/userRoutes')
const blogRoutes =require('./routes/blogRoutes')


const app = express()
dotenv.config()
const port =process.env.PORT  ||8080;

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
dbConnect();


app.use('/api/user/',userRoutes);
app.use('/api/blog/',blogRoutes);

app.listen(port,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode at port ${port}`.bgCyan.white);
})