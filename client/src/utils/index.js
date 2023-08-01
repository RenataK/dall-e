import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

	const randomPrompt = surpriseMePrompts[randomIndex];

	//checks to make sure you don't get the same random quotes 2-3x in a row
	if (randomPrompt === prompt) return getRandomPrompt(prompt);

	return randomPrompt;
}

export async function downloadImage(_id, photo) {
	//using the file saver library
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}