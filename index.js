import express from 'express';
import dbInit from './database/connection.js';
import path from "path"
import { fileURLToPath } from 'url';
import cors from "cors";
import createNewExamSet from './controller/examSet.controller/createNewExamSet.js';
import insertQuestionIntoExamSet from './controller/examSet.controller/insertQuestionsIntoExamSet.js';
import registerUser from './controller/users.controller/createUser.js';
import createToken from './controller/auth.js';
import viewUserProfile from './controller/views/viewUserProfile.js';
import isAuth from './middleware/isAuth.js';
import updateQuestionData from './controller/examSet.controller/updateQuestions.js';
import uploadFile from './controller/media-file.controller/uploadFile.js';
import upload from './middleware/upload.js';
import readAllExamSet from './controller/examSet.controller/readAllExamSet.js';
import fetchQuestions from './controller/examSet.controller/fetchQuestions.js';
import submitAttemptResult from './controller/users.controller/user.attempts/userAnswerCheck.js';
import dashboardProfileMath from './controller/users.controller/user.attempts/dashboardProfileMath.js';
import connectionFirebase from './database/connectionFirebase.js';
import { uploadFirebase } from './middleware/uploadFirebase.js';
import uploadFileFirebase from './controller/media-file.controller/uploadFIleFirebase.js';
const app = express()
const port = 3000

//important middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/uploads',express.static("uploads"))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// initialize Database connection
dbInit();

// initialize firebase connection
connectionFirebase();

app.get('/home',(req,res)=>{
    res.type('text/html');
    res.send('<h1>Home!</h1>')

});
app.get('/helloworld',(req,res)=>{
    res.type('text/html');
    res.send('<h1>Hello World!</h1>')

});

// User VIEW : : Client request
// user registartion
app.post('/register',registerUser);
// user login
app.post("/login",createToken);
//userAttempt fetchResult 
app.post("/fetch-attempt-result/:examination_id",submitAttemptResult) 
//user profile : Client request
app.get("/profile/:username",isAuth, viewUserProfile); //didnt implement yet
app.get("/dashboard/:username",dashboardProfileMath)


// //question VIEW: Client request
app.get('/read-exam-set',readAllExamSet);
app.get('/fetch-questions/:subject/:year/:exam_id',isAuth,fetchQuestions);

// question management: admin request
app.post('/create-new-exam-set',createNewExamSet);
app.post('/:questions_subject/enter-q1',insertQuestionIntoExamSet);
app.post('/update-question',updateQuestionData);

//media files management :admin request
// upload :FIrebase
app.post('/upload-firebase',uploadFirebase.single("biologi-2022-8"),uploadFileFirebase)

//upload
app.post('/uploads',upload.single(""),uploadFile);
// serve
app.use('/serve/assets', express.static(path.join(__dirname, 'assets')));
//serve images
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})