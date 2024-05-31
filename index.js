import express from 'express';
import dbInit from './database/connection.js';
import cors from "cors";
import createNewExamSet from './controller/examSet.controller/createNewExamSet.js';
import readExamSet from './controller/examSet.controller/readExamSet.js';
import insertQuestionIntoExamSet from './controller/examSet.controller/insertQuestionsIntoExamSet.js';
import registerUser from './controller/users.controller/createUser.js';
const app = express()
const port = 3000

//important middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

dbInit();

app.get('/home',(req,res)=>{
    res.type('text/html');
    res.send('<h1>Home!</h1>')

});
app.get('/helloworld',(req,res)=>{
    res.type('text/html');
    res.send('<h1>Hello World!</h1>')

});


app.get('/product',(req,res)=>{
  res.status(201).send(
    [
      {code:"001",item:"A",price:"20"},
      {code:"002",item:"B",price:"120"},
      {code:"003",item:"C",price:"210"},
      {code:"004",item:"D",price:"200"}
    ]
  )
})

// user registartion
app.post('/register',registerUser);

app.post('/create-new-exam-set',createNewExamSet);
app.get('/read-exam-set/:exam_set_id',readExamSet);
app.post('/enter-q3',insertQuestionIntoExamSet);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})