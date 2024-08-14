import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import Routes from './routes/index.js'
dotenv.config()

const app = express()

app.unsubscribe(express.json())
app.use(cors())
mongoose.connect(process.env.MONGODB_BASE_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch(() => console.log("MongoDB is not connected"))

app.use('/', Routes);
// uploads to create a images or videos
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static("./images"))

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`${PORT} has been listening`));