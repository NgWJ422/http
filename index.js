const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose')
const app = express()
const port = 3000

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jng010422:f6c2e57f6bB.@cluster0.xtnraql.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const user = await client.db("BENR2423_test").
    collection("user").
    insertMany(dbuser)
    console.log(user);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

let dbuser =[
  {
      username : "soo",
      password: "password",
      name: "Soo",
      email: "soo@utem.edu.my "
  },

  {
      username: "ali",
      password: "123456",
      name: "ali",
      email: "ali@utem.edu.my "
  },

  {
      username: "wee",
      password: "1234567",
      name: "wee",
      email: "wee@utem.edu.my "
  },

  {
      username: "hee",
      password: "hee123",
      name: "hee",
      email: "hee@utem.edu.my "
  },

  {
      username: "utah",
      password: "gdyyrgg",
      name: "utah",
      email: "uuuu@utem.edu.my "
  },
]
app.use(express.json())


app.post('/', (req, res) => {
  let data= req.body
  let loginresult = login(
    data.username,
    data.password
  )
  res.send({
    status: loginresult,
    originaldata: data,
    date: Date.now
  });
});

app.get('/hello', verifytoken,(req, res) => {
  console.log(req.user)
  res.send('Hello World!')
})


app.post('/login',(req,res) =>{
  const{username, password}=req.body;
  let user=login(username,password)
  res.send(generatetoken(user))
  //const user = dbuser.find(user => user.username === username && user.password === password);

  //if(user){
  //  res.send(user);
  //}else{
   // res.send({error:"user not found"});
  }
//}
)

app.post('/register',(req,res)=>{
  let data=req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  );
});

app.post('/bye', (req, res) => {
  res.send('Bye Bye World!')
})
// post is one of the method to request to the server


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function login(username,password){
  console.log("someone try to login with",username,password)
  let matched = dbuser.find(Element=>
      Element.username == username
  )
  if(matched){
      if(matched.password == password ) {
          return matched
      } else {
          return "Password not matched"
      }
  } else {
      return "username not found"
  }
}

function register(newusername,newpassword,newname,newemail){
  let matched = dbuser.find(Element=>
      Element.username == newusername
  )
  if(matched){
      return "username was used"
  }else{


  dbuser.push({
      username: newusername,
      password: newpassword,
      name: newname,
      email: newemail
  })
  console.log("account has been created")
  

  
}
}

function generatetoken(userprofile){
  return jwt.sign(
    userprofile,
    'secret',
    {expiresIn:60*60});
}

//verify the token
function verifytoken(req, res, next){
  let header= req.headers.authorization
  console.log(header)
  let token=header.split(' ')[1]
  jwt.verify(token,'secret',function(err,decoded){
    if(err){
      res.send("invalid token")
    }
    req.user=decoded
    console.log(decoded)
    next()
  });
}

app.post('/visitor',verifyToken,(req,res)=>{
   if(req.user.role == 'user'){
    //insertone to database
    insertOne{
      name:req.body.name,
      purpose:req.body.purpose,
      date:req.body.date,
      user:req.user.username
    }
    

    }
   
})

app.get('/visitor',verifyToken,(req,res)=>{
  if(req.user.role == 'security'){
    find({date: {$eq: new Date()}})
  }
  if(req.user.role == 'user'){
    find({username:{$eq:req.user.username}})
  }
})