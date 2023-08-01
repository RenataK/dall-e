import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config(); //allows us to pool env variables from .env file

//initialize express application
const app = express();

//add additional middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//adding routes to middleware
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//create 1st route (root route)
//Lets us know our app is running once we visit the url of our server
app.get('/', async (req, res) => {
	res.send('Hello from DALL-E!')
})

//to run app
const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL); //special URL of our mongodb atlas database
		app.listen(8080, () => console.log('Server now running on port http://localhost:8080'))
	} catch (error) {
		console.log(error);
	}
}

startServer();