import express from 'express';
import dbInit from './database/connection.js';
import cors from "cors";
import createNewExamSet from './controller/examSet.controller/createNewExamSet.js';
import readExamSet from './controller/examSet.controller/readExamSet.js';
import insertQuestionIntoExamSet from './controller/examSet.controller/insertQuestionsIntoExamSet.js';
import registerUser from './controller/users.controller/createUser.js';
import createToken from './controller/auth.js';
import viewUserProfile from './controller/views/viewUserProfile.js';
import isAuth from './middleware/isAuth.js';
import updateQuestionData from './controller/examSet.controller/updateQuestions.js';
import uploadFile from './controller/media-file/uploadFile.js';
import upload from './middleware/upload.js';
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


// user registartion
app.post('/register',registerUser);

// user login
app.post("/login",createToken);

//todo read user info to render on user profile page
app.get("/profile/:username",isAuth, viewUserProfile);

//question management
app.post('/create-new-exam-set',createNewExamSet);
app.get('/read-exam-set/:exam_set_id',readExamSet);
app.post('/enter-q21',insertQuestionIntoExamSet);
app.post('/update-question',updateQuestionData);

//media files management
app.post('/upload',upload.single("question-image-sejarah-2022-mrsx"),uploadFile);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})