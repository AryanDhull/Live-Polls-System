import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, useUser } from './context/userContext';
import UserTypeSelection from './components/UserSelection';
import PollForm from './components/PollForm';
import AnswerForm from './components/AnswerForm';
import PollResults from './components/PollResults';
import Error404 from './components/Error404';
import ChatPopup from './components/ChatPopup'; // New Chat Popup
import PastPolls from './components/PastPolls'; // New Past Polls
import KickStudent from './components/KickStudent'; // New KickStudent
import './main.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </Router>
  );
}

function AppRoutes() {
  const { userType } = useUser();
  console.log('AppRoutes: Current userType ->', userType);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={userType ? (userType === "teacher" ? <PollForm /> : <AnswerForm />) : <UserTypeSelection />} />
        {userType === 'teacher' && <Route path="/createPoll" element={<PollForm />} />}
        {userType === 'student' && <Route path="/answerQuestion" element={<AnswerForm />} />}
        <Route path="/pollResults" element={<PollResults teacherMode={userType === "teacher" ? true : false} />} />
        {userType === 'teacher' && <Route path="/pastPolls" element={<PastPolls />} />} {/* Route for past polls */}
        {userType === 'teacher' && <Route path="/kickStudent" element={<KickStudent />} />} {/* Route for kicking students */}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ChatPopup /> {/* Include Chat Popup */}
    </div>
  );
}

export default App;
