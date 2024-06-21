import express from 'express';
import dbInit from './database/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
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

const app = express();
const port = 3000;

// Important middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

dbInit();

app.get('/home', (req, res) => {
    res.type('text/html');
    res.send('<h1>Home!</h1>');
});
app.get('/helloworld', (req, res) => {
    res.type('text/html');
    res.send('<h1>Hello World!</h1>');
});

// User registration
app.post('/register', registerUser);

// User login
app.post('/login', createToken);

// User attempt fetch answer list
app.post('/fetch-attempt-result/:examination_id', submitAttemptResult);

// To-do: Read user info to render on user profile page
app.get('/profile/:username', isAuth, viewUserProfile); // Didn't implement yet

// Question management
app.post('/create-new-exam-set', createNewExamSet);
app.get('/read-exam-set', readAllExamSet);
app.get('/fetch-questions/:subject/:year/:exam_id', isAuth, fetchQuestions);
app.post('/enter-q21', insertQuestionIntoExamSet);
app.post('/update-question', updateQuestionData);

// Media files management
// Upload
app.post('/uploads', upload.single('question-image-sejarah-2022-mrsx'), uploadFile);

// Serve static files
app.use('/serve/assets', express.static(path.join(__dirname, '../public/assets')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
