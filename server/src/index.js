const express = require('express');
const cors = require('cors');
const authControllers = require('./controllers/authControllers');
const courseControllers = require('./controllers/courseControllers');
const courseTypeControllers = require('./controllers/courseTypeControllers');
const userControllers = require('./controllers/userControllers'); 
const lessonControllers = require('./controllers/lessonControllers');
const frameControllers = require('./controllers/frameControllers');
const frameVocabularyControllers = require('./controllers/frameVocabularyControllers');
const userFrameItemControllers = require('./controllers/userFrameItemControllers');
const vocabularyControllers = require('./controllers/vocabularyControllers');
const connectDatabase = require('./config/connectDatabase');

const app = express();
app.use(cors());
app.use(express.json());
connectDatabase();
app.use('/api', authControllers);
app.use('/api/courses', courseControllers);
app.use('/api/course-types', courseTypeControllers);
app.use('/api/users', userControllers);
app.use('/api/lessons', lessonControllers);
app.use('/api/frames', frameControllers);
app.use('/api/vocabularies', vocabularyControllers);
app.use('/api/frame-vocabularies', frameVocabularyControllers);
app.use('/api/user-frame-items', userFrameItemControllers);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const { createHandler } = require("graphql-http/lib/use/express");
// const express = require("express");
// const bodyParser = require("body-parser");
// const { typeDefs } = require("./schema/courseSchema");
// const courseResolver = require("./resolvers/courseResolver");
// const db = require("../db");
// const authRoutes = require("./routes/auth");
// const cors = require("cors");
// // Tạo schema đơn giản

// const app = express();
// app.use("/api", authRoutes);
// app.use(express.json()); // Phân tích JSON từ request body
// app.use(express.urlencoded({ extended: true })); // Phân tích dữ liệu URL-encoded
// app.use(bodyParser.json()); // Phân tích JSON cho body (tương tự express.json)
// // Gắn handler GraphQL
// app.all(
//   "/graphql",
//   createHandler({
//     schema: typeDefs,
//     rootValue: courseResolver,
//   })
// );

// // Khởi động server
// app.listen(4000, () => {
//   console.log("GraphQL API running at http://localhost:4000/graphql");
// });
