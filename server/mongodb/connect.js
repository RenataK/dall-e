import mongoose from "mongoose";

//Created func to connect app to MongoDB
const connectDB = (url) => {
	mongoose.set('strictQuery', true); //useful for search functionality

	//connect
	mongoose.connect(url)
		.then(() => console.log('MongoDB connected'))
		.catch((err) => console.log(err));
}

export default connectDB;