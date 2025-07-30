import React ,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import VerifyEmailWrapper from './components/verifyEmail/verifyEmailWrapper.jsx';
// import CreatePage from './routes/createPage/createPage.jsx';
// import PostPage from './routes/postPage/postPage.jsx';
// import AuthPage from './routes/authPage/authPage.jsx';
// import HomePage from './routes/homepage/homepage.jsx';
// import UserProfile from './routes/userProfile/userProfile.jsx';
// import SearchPage from './routes/searchPage/searchPage.jsx';
// import MainLayout from './routes/layouts/mainLayout.jsx';


const HomePage = React.lazy(() => import('./routes/homepage/homepage.jsx'));
const UserProfile = React.lazy(() => import('./routes/userProfile/userProfile.jsx')); 
const SearchPage = React.lazy(() => import('./routes/searchPage/searchPage.jsx'));
const CreatePage = React.lazy(() => import('./routes/createPage/createPage.jsx'));
const PostPage = React.lazy(() => import('./routes/postPage/postPage.jsx'));
const AuthPage = React.lazy(() => import('./routes/authPage/authPage.jsx'));
const MainLayout = React.lazy(() => import('./routes/layouts/mainLayout.jsx'));
const VerifyEmailWrapper = React.lazy(() => import('./components/verifyEmail/verifyEmailWrapper.jsx'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
       <QueryClientProvider client={queryClient}>
    <BrowserRouter>
     {/* ✅ Add toaster here (global) */}
<Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: '#333',
      duration:"9000",
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '8px',
      padding: '12px 16px',
    },
    success: {
      iconTheme: {
        primary: '#4ade80', // green-400
        secondary: '#1e293b', // slate-800
      },
    },
    error: {
      iconTheme: {
        primary: '#f87171', // red-400
        secondary: '#1e293b',
      },
    },
  }}
/>
        
      <Routes>
        <Route element={<MainLayout/>}> {/* mainlayout for most pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/pin/:_id" element={<PostPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:username" element={<UserProfile />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
<Route path="/DannicInspoVerificationPage" element={<VerifyEmailWrapper />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
