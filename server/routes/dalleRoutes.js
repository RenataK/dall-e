import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


//making sure the env variables are getting populated
dotenv.config();

const router = express.Router();

//utilizing the openai_key
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

//creating instance of openai 
const openai = new OpenAIApi(configuration);

//demo route for testing purposes 
router.route('/').get((req, res) => {
	res.send('hello from dall-e!!!!!!!!!');
})

router.route('/').post(async (req, res) => {
	try {
		const { prompt } = req.body; //comes from front-end side (the prompt that we create || uses the surprise me prompt)
		//generate prompt image
		const aiResponse = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
			response_format: 'b64_json',
		});

		//grab image from response
		const image = aiResponse.data.data[0].b64_json;

		//getting the img and sending it back to front-end
		res.status(200).json({ photo: image });
	} catch (error) {
		console.log(error);
		res.status(500).send(error?.response.data.error.message)
	}
})

export default router;