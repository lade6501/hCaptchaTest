const express = require('express');
const path = require('path');
const axios = require('axios')
var cors = require('cors')



const app = express(),
      bodyParser = require("body-parser");
      port = 8001

app.use(cors())
// place holder for the data

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.post('/api/verify', async (req, res) => {
  console.log('api/users called!')
  var secret = '0x3649aAFdBe7B4B65044eB9a5dB7626fcE0f1DE3f'
  var token = req.body.token 

  //var data = { 'secret': secret, 'response': token }
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  const hcaptchaurl = `https://hcaptcha.com/siteverify?response=${token}&secret=${secret}`
  const result = await axios.post(hcaptchaurl,{ headers: headers})
  const {success } = result.data;
  if(success){
    return res.json({success:true})
  }else{
    return res.status(400).json({error: "Invalid Captcha. Trya again"})
  }
  console.log(token)
  console.log('\n' + success);
  
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});