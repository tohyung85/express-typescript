import * as dotenv from 'dotenv';
const configOutput = dotenv.config();
console.log('dotenv file', process.env.PORT)

export default configOutput;