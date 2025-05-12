const express = require('express');
const mongoose = require('mongoose');
port = 3000;
const app = express();

const MONGOURL = 'mongodb://127.0.0.1:27017/wanderlust';


main().then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
})


async function main(){
  await mongoose.connect(MONGOURL); 
}

app.get('/' , (req , res) => {
  res.send('all working fine!!')
})




app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})