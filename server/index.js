// testaReactNode/index.js

// really important thingys dont remove or you'll feel my wrath come down on you with the fury of a thousand burnings suns
const express = require("express");
const multer = require('multer');
const OpenAI = require('openai');
const pdfParse = require('pdf-parse');
const mysql = require('mysql');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

// Project Imports
const DatabaseManager = require('./DatabaseManager');


// Correct way to configure the OpenAI API client, should probably store my api key in a .env file seperate from alla er, speciellt nils. men men 
const openai = new OpenAI({
  apiKey: "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"
})



// Connect to and setup database
const dbManager = new DatabaseManager();

dbManager.connect()
    .then(() => dbManager.runSqlScript('./db/create_db.sql'))
    .then(() => dbManager.runSqlScript('./db/setup_tables.sql'))
    .then(() => dbManager.runSqlScript('./db/seed_data.sql'))
    .then(() => {
        console.log('All scripts executed successfully.');
        dbManager.close();
    })
    .catch(err => {
        console.error('An error occurred:', err);
    });




//something something saying where to store the file the user uploads to the server momentarily, we will delete it after we have used it
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

// this recieves the file from the client side and then sends it to the openai api to get the questions and answers
// this entire function or whatever you'd call it could probalby be done in a better way but i dont really have the time to do that right now
app.post('/upload', (req, res) => {
  //something something javascript magic upload file
  upload(req, res, async function (err) {
      if (err) {
        //  some error thingy
          return res.status(500).send({ error: err.message });
      }
      if (!req.file) {
        //another error thingy
          return res.status(400).send('No file uploaded.');
      }

      try {
        // convert the file to a buffer and then to a string
        // since it costs more to upload files to gpt and we want to save money and its easier this whay probably
          const dataBuffer = await fs.promises.readFile(req.file.path);
          const data = await pdfParse(dataBuffer);

          // give exact promt to gpt so it returns the correct dataformat every time using our insane "service"
          const prompt = `Generate a series of multiple choice quiz questions (maximum and minimum of 5 questions and a maximum of 4 answers per question) based on the following text. Each question should be structured as a JSON object with the question text, four options, and a correct answer. Please format the entire output as a JSON array:
          Text: "${data.text}"
          User ID: "${req.body.userId}"  // Include user ID in prompt
          Quiz Title: "${req.body.title}" // Include quiz title in prompt
          Please format the output as follows:
          [
              {
                  "question": "What is the main theme of the text?",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "answer": "Option A"
              },
              {
                  "question": "How does the author describe the relationship between X and Y?",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "answer": "Option B"
              }
              // More questions as needed
          ]`;
          // here we actually send the prompt to the openai api and get the response
          const response = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: prompt }]
          });
          console.log('Response:', response);
         

          // Assuming response.data.choices[0].message.content contains a JSON string of questions
          const message = response.choices[0].message;
          const quizContent = JSON.parse(message.content);  // Parse the JSON content

          // add the user ID of the currently logged in user to the quiz data, the userid is sent in the json file from the client side from "FileUpload.js"
          //also add the title of the quiz that is just what the file name was called when the user uploaded it into the "FileUpload.js" file
          const responseData = {
              userId: req.body.userId,
              title: req.body.title,
              questionsAndAnswers: quizContent
          };

          console.log('Response data:', responseData);
          // Insert the quiz data into the database
          // call the function responsible for inserting the quiz data into the database
          createQuiz(responseData);
          res.status(200).json(responseData);  // Send the modified quiz questions and answers
      } catch (error) {
        //something error manager dont really know
          console.error('Error processing the request:', error);
          res.status(500).send({ error: 'Failed to parse PDF, generate quiz, or parse JSON: ' + error.message });
      } finally {
        //delete the file after it has been used
        //how? i dont know javascript magic
          fs.unlink(req.file.path, err => {
              if (err) console.error('Error deleting file:', err);
          });
      }
  });
});

function createQuiz(responseData) {
  // Call the stored procedure to insert the quiz data into the database
  const callProcedure = 'CALL InsertQuizData(?)';

  // Convert the quiz data to a JSON string and pass it as a parameter to the stored procedure
  con.query(callProcedure, [JSON.stringify(responseData)], function(err, result) {
      if (err) {
          console.error("Database error:", err);
          return;
      }
      //logg the success of the insertion
      console.log("Quiz and associated questions and answers inserted successfully.");
  });
}


















app.post("/login", async (req, res) => {
    // Destructure and immediately trim the username
    let { username, password } = req.body;
    username = username.trim();  // Trim the username to remove accidental whitespace

    const callProcedure = 'CALL login_user(?, ?)';

    con.query(callProcedure, [username, password], function(err, result, fields) {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ success: false, message: err.sqlMessage || "Database error" });
            return;
        }

        if (result[0][0].message.includes("Login successful")) {
            // Extract user data from the same result set
            const userData = {
                user_id: result[0][0].user_id,
                username: result[0][0].username,
                email: result[0][0].email,
                firstname: result[0][0].firstname,
                lastname: result[0][0].lastname,
                last_login: result[0][0].last_login
            };
            console.log("User data:", userData);
            res.json({ success: true, message: "Login successful", user: userData });
        } else {
            res.json({ success: false, message: result[0][0].message });
        }
    });
});

app.get("/getQuizDetailed/:quizId", async (req, res) => {
    const quizId = req.params.quizId; // Get quizId from URL parameters
    // Optionally, get userId from an authenticated session or token if needed
    const userId = req.user?.id; // Assuming you have some authentication middleware

    con.query('CALL GetQuizDetailsByQuizId(?)', [quizId], function(err, result, fields) {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ success: false, message: err.sqlMessage || "Database error" });
            return;
        }

        if (result[0] && result[0].length > 0) {
            const quizData = JSON.parse(result[0][0].QuizData);
            console.log("Quiz Title:", quizData.title);
            quizData.questions.forEach(question => {
                console.log("Question:", question.text);
                question.answers.forEach(answer => {
                    console.log("Answer:", answer.text, "Correct:", answer.is_correct ? "Yes" : "No");
                });
            });

            res.json({ success: true, quiz: quizData });
        } else {
            res.status(404).json({ success: false, message: "No quiz found with ID " + quizId });
        }
    });
});


app.get("/getQuiz", async (req, res) => {
    const querystring = 'CALL GetQuizNamesByUserId(?)';
    const userId = req.query.userId;
    // Ensure userId is present
    if (!req.query.userId) {
        console.log("No userId provided");
        res.status(400).json({ success: false, message: "userId is required" });
        return;
    }

    con.query(querystring, [userId], function(err, result, fields) {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ success: false, message: err.sqlMessage || "Database error" });
            return;
        }

        // Check if there are any quizzes returned
        if (result[0] && result[0].length > 0) {
            const quizNames = result[0].map(row => row.title);
            //add their quizz id to the quiz names
            quizNames.forEach((quizName, index) => {
                quizNames[index] = { id: result[0][index].quiz_id, title: quizName };
            });
            console.log("Query result:", result[0]); // Log the raw result for debugging
            console.log("Quiz names:", quizNames); // Log the processed names for clarity

            res.json({ success: true, quizzes: quizNames });
        } else {
            console.log("No quizzes found for userId:", req.query.userId); // Log this scenario for debugging
            res.status(404).json({ success: false, message: "No quizzes found" });
        }
    });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/register", async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  const callProcedure = 'CALL register_user(?, ?, ?, ?, ?)';
    
  con.query(callProcedure, [username, email, firstName, lastName, password], function(err, result) {
    if (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: err.sqlMessage || "Database error" });
        return;
    }

    const message = result[0][0].message;
    if (message.includes("User registered")) {
      const userData = {
        user_id: result[0][0].user_id,
        username: result[0][0].username,
        email: result[0][0].email,
        firstname: result[0][0].firstname,
        lastname: result[0][0].lastname,
        last_login: result[0][0].last_login
      };
      console.log("User data:", userData);
      res.json({ success: true, message: "User registered successfully", user: userData });

    } else {
        res.json({ success: false, message: message });
    }
});
});



//yooooo

//old code somethign scared to remove it
/*
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/asdlogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM public."Users" WHERE "User_Email" = $1 AND "User_Password" = $2';
    
    const result = await pool.query(query, [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
*/

//require('dotenv').config({ path: './yoo.env' });
//const { Pool } = require('pg');
/*
  const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
*/