# Live Polls System

## Overview
The Live Polls System is a real-time polling application designed to facilitate interaction between teachers and students during class. Teachers can create and manage polls, and students can participate and see live results.

- **Frontend Repository**: [Live Polls System Frontend](https://github.com/AryanDhull/Live-Polls-System/tree/main/Frontend)
- **Backend Repository**: [Live Polls System Backend](https://github.com/AryanDhull/Live-Polls-System/tree/main/Backend)
- **Deployed Project**: [Live Polls System](https://live-polls-system.onrender.com)
- **Hosted Backend URL**: [Live Polls System Backend](https://live-polls-system-backend.onrender.com)

## Technologies Used
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB, Mongoose

## Steps to Run the Project Using Deployed Link
1. **Go to the Backend URL**:
   - Visit [https://live-polls-system-backend.onrender.com](https://live-polls-system-backend.onrender.com).
   
2. **Choose User Type**:
   - Select either "Student" or "Teacher".

3. **For Teachers**:
   - You'll see a form to create a poll and ask a question.
   - Fill in the question and set the timer as desired.
   - Open the same link ([https://live-polls-system.onrender.com](https://live-polls-system.onrender.com)) on a different tab or mobile device and choose "Student".

4. **For Students**:
   - Enter your name and continue.
   - Open as many tabs or devices as needed, all as "Student".

5. **Conducting the Poll**:
   - Students will see a waiting message until the teacher asks a question.
   - In the teacher's profile, fill out the PollForm and click on "Ask Question".
   - Students will see the question and can submit their answers within the given time (default is 60 seconds).

6. **Live Polling**:
   - Students see live poll results after submitting their answers.
   - If the timer expires or a student chooses not to answer, their submission won't be counted.
   - Students can only submit their answer once.

7. **Teacher Actions**:
   - The teacher sees live poll results along with additional options:
     - **Reveal Answer**: Show the answer to all students.
     - **Ask Another Question**: Start a new poll.
     - **Chat**: Real-time chat between teacher and students.
     - **Past Polls**: View previous poll results.

## Features
- Real-time polling and live results.
- Teacher can manage polls and interact with students via chat.
- Students can participate in polls and see live updates.
- Past poll results are accessible for review.

