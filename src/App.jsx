import './App.css'
// import axios from './api/axios'; // We will remove this axios import as well since we don't use global axios here
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from './assets/js/pages/Index'
import Dashboard from './assets/js/pages/Dashboard'
import CompanyDashboard from './pages/Company/CompanyDashboard';
import StudentJobBoard from './pages/StudentJobBoard';
import ProtectedRoute from './assets/js/components/New/ProtectedRoute';
import SignInSignUp from './assets/js/components/New/SignInSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './assets/js/components/New/Store/store';

import AdminDashboard from './assets/js/components/New/admin/AdminDashboard';
import JobPostingForm from './assets/js/components/New/Company/JobPostingForm';
import CompanyJobPostings from './assets/js/components/New/Company/CompanyJobPostings';
import CompanyApplications from './assets/js/components/New/Company/CompanyApplications';
import RecruitmentAnalytics from './assets/js/components/New/Company/RecruitmentAnalytics';
import Content from './assets/js/components/New/Content/Content.jsx';
import Chat from './assets/js/components/New/Chat/Chat.jsx';
import Requests from './assets/js/components/SideBar/Friends/Requests.jsx';
import GroupRoutes from './assets/js/routes/group.routes'
import WebSocket from './assets/js/components/New/WebSocket';
import Test from './assets/js/components/New/Test';
function App() { 
  return (
    <>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<SignInSignUp flag={true} />} />
          <Route path="/signup" element={<SignInSignUp flag={false} />} />
          <Route path="/websocket" element={<WebSocket />} />
          <Route path="/test" element={<Test />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student/dashboard" element={<Dashboard />}>
              <Route index element={<Content />} />
              <Route path="jobs" element={<StudentJobBoard />} />
              <Route path="chat" element={<Chat />} />
              <Route path="friends" element={<Requests />} />
              <Route path="group/*" element={<GroupRoutes />} />
              {/* <Route path='profile' element={<Profile />} /> */}
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['company']} />}>
            <Route path="/company/dashboard" element={<CompanyDashboard />}>
              <Route index element={<JobPostingForm />} />
              <Route path="create-posting" element={<JobPostingForm />} />
              <Route path="job-postings" element={<CompanyJobPostings />} />
              <Route path="applications" element={<CompanyApplications />} />
              <Route path="analytics" element={<RecruitmentAnalytics />} />
            </Route>
          </Route>

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/signin" element={<Home />} />
          <Route path="/signup" element={<Home />} />
          <Route path="/forgotpassword" element={<Home />} />
          <Route path="/resetpassword" element={<Home />} />
          <Route path="/404" element={<Home />} />
          <Route path="/500" element={<Home />} />
          <Route path="/lockscreen" element={<Home />} />
          <Route path="/blank" element={<Home />} />
          <Route path="/profile" element={<Home />} /> */}
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </BrowserRouter>
    </>
  )
}

export default App