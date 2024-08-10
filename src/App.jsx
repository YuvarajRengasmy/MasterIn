import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MasterIn from './Pages/MasterIn';
import Login from './Components/Login/Login';
import SignUp from './Components/MasterPanel/SignUp/SignUp';
import ForgotPassword from './Components/Login/ForgotPassword';
import Home from './Components/MasterPanel/Feed/Home';
import Notification from './Components/MasterPanel/Notification/Notification';

import Community from './Components/MasterPanel/Community/Community';
import Chat from './Components/MasterPanel/Chat/Chat';
import ProfilePage from './Components/MasterPanel/Profile/ProfilePage';
import ResetPassword from './Components/Login/ResetPassword';
import PostFeed from './Components/MasterPanel/SearchNavTabs/PostFeed';
import People from './Components/MasterPanel/SearchNavTabs/People';
import Search from './Components/MasterPanel/SearchNavTabs/Search';
import PeopleProfile from './Components/MasterPanel/PeopleProfile/PeopleProfile';
import EducationEdit from './Components/MasterPanel/Profile/editEducation';
import CreatePlaylist from './Components/MasterPanel/Playlist/CreatePlaylist';
import ViewPlaylist from './Components/MasterPanel/Playlist/ViewPlaylist';
import ViewAppointment from './Components/MasterPanel/ViewAppointment/ViewAppointment';

// UserPanel

import UserProfile from './Components/UserPanel/UserProfile/UserProfile';
import UserHome from './Components/UserPanel/Feed/Home';
import MasterPeopleProfile from './Components/UserPanel/MasterPeopleProfile/MasterPeopleProfile';

import CompanyProfile from './Components/UserPanel/CompanyProfile/CompanyProfile';
import UserSearch from './Components/UserPanel/SearchNavTabs/Search';
import UserEdit from './Components/UserPanel/UserProfile/UserProfileEdit';
import UserNotification from './Components/UserPanel/Notification/Notification';
import UserPeopleProfile from './Components/UserPanel/UserPeopleProfile/UserPeopleProfile';
import PlaylistView from './Components/UserPanel/Playlist/ViewPlaylist';
import Dashboard from './Components/MasterPanel/Dashboard/Dashboard';
import "react-big-calendar/lib/css/react-big-calendar.css"
import Event from './Components/MasterPanel/Event/Event';
// CompanyPanel
// import CompanyPanelProfile from './Components/CompanyPanel/CompanyProfile/CompanyPanelProfile';  

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MasterIn />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/ForgotPassword' element={<ForgotPassword />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/Notification' element={<Notification />}></Route>
      
          <Route path='/Community' element={<Community />}></Route>
          <Route path='/Chat' element={<Chat />}></Route>
          <Route path='/ProfilePage' element={<ProfilePage />}></Route>
          <Route path='/ResetPassword' element={<ResetPassword />}></Route>
          <Route path='/PostFeed' element={<PostFeed />}></Route>
          <Route path='/People' element={<People />}></Route>
          <Route path='/PeopleProfile' element={<PeopleProfile />}></Route>
          <Route path='/Search' element={<Search />}></Route>
          <Route path='/EducationEdit' element={<EducationEdit />}></Route>
          <Route path='/UserHome' element={<UserHome />}></Route>
          <Route path='/UserSearch' element={<UserSearch />}></Route>
          <Route path='/ViewAppointment' element={<ViewAppointment />}></Route>
          <Route path='/CreatePlaylist' element={<CreatePlaylist />}></Route>
          <Route path='/ViewPlaylist' element={<ViewPlaylist />}></Route>
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/Event' element={<Event/>}></Route>



          {/* User Panel Routes */}
          <Route path='/UserProfile' element={<UserProfile />}></Route>
          <Route path='/MasterProfile' element={<MasterPeopleProfile />}></Route>
          <Route path='/UserPeopleProfile' element={<UserPeopleProfile />}></Route>
          
          <Route path='/UserEdit' element={<UserEdit />}></Route>
          <Route path='/UserNotification' element={<UserNotification />}></Route>
          <Route path='/CompanyProfile' element={<CompanyProfile />}></Route>
          <Route path='/PlaylistView' element={<PlaylistView/>}></Route>


          {/* Company Panel Routes */}
          {/* <Route path='/CompanyPanelProfile' element={<CompanyPanelProfile />}></Route> */}

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
