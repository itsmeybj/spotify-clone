import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./components/welcomeComponent/Welcome";
import UserHome from "./components/userComponent/UserHome";
import AdminHome from "./components/adminComponent/AdminHome";
import ArtistHome from "./components/artistComponent/ArtistHome";
import UserLogin from "./components/authComponent/UserLogin";
import UserRegister from "./components/authComponent/UserRegister";
import UserLogout from "./components/authComponent/UserLogout";
import UserDashboard from "./components/userComponent/UserDashboard";
import UserCreatePlaylist from "./components/userComponent/UserCreatePlaylist";
import ArtistUploadSong from "./components/artistComponent/ArtistUploadSong";
import ArtistDashboard from "./components/artistComponent/ArtistDashboard";

import songContext from "./contexts/SongContext";
import ShowEditSongArtist from "./components/artistComponent/ShowEditSongArtist";
import UserProfile from "./components/shared/UserProfile";
import UserProfileUpdate from "./components/shared/UserProfileUpdate";
import AdminDashboard from "./components/adminComponent/AdminDashboard";
import ShowEditSongAdmin from "./components/adminComponent/ShowEditSongAdmin";
import ShowAllUsers from "./components/adminComponent/ShowAllUsers";
import UserLikeSong from "./components/userComponent/UserLikeSong";
import Search from "./components/userComponent/Search";
import Library from "./components/userComponent/Library";
import ShowPlaylist from "./components/userComponent/ShowPlaylist";
import ShowEditPlaylist from "./components/userComponent/ShowEditPlaylist";
import ShowPlaylistSongs from "./components/userComponent/ShowPlaylistSongs";
import ShowEditSongUser from "./components/userComponent/ShowEditSongUser";

function App() {
  // alt + updown
  // shift+alt+updown
  const [currentSong, setCurrentSong] = useState(null);
  const [isPaused,setIsPaused] = useState(null);
  const [soundPlay,setSoundPlay] = useState(null);
  const [songClicked,setSongClicked] = useState(null);
  const [userInfo,setUserInfo] = useState(null);

  return (
    <div className="w-screen h-screen">

      <songContext.Provider value={{userInfo,setUserInfo, songClicked, setSongClicked,currentSong, setCurrentSong, isPaused,setIsPaused,soundPlay,setSoundPlay}}>
      
        <Routes>

          <Route path="/" element={<Welcome />} />
          <Route path="auth/login" element={<UserLogin />} />
          <Route path="auth/register" element={<UserRegister />} />
          <Route path="auth/logout" element={<UserLogout />} />

          <Route path="user" element={<UserHome />}>
            <Route index element={<UserDashboard />} />
            <Route path="create-playlist" element={<UserCreatePlaylist />} />
            <Route path="show-playlist" element={<ShowPlaylist />} />
            <Route path="show-edit-playlist" element={<ShowEditPlaylist />} />
            <Route path="show-playlist-songs" element={<ShowPlaylistSongs />} />
            <Route path="like-songs" element={<UserLikeSong />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="search" element={<Search />} />
            <Route path="library" element={<Library />} />
            <Route path="show-edit-song-user" element={<ShowEditSongUser />} />
          </Route>

          <Route path="admin" element={<AdminHome />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<UserProfile />} />
            <Route path="profile-update" element={<UserProfileUpdate />} />
            <Route path="show-edit-song-admin" element={<ShowEditSongAdmin />} />
            <Route path="show-users" element={<ShowAllUsers />} />
            </Route>

          <Route path="artist" element={<ArtistHome />}>
            <Route path="upload-song" element={<ArtistUploadSong />} />
            <Route path="dashboard" element={<ArtistDashboard />} />
            <Route path="show-edit-song-artist" element={<ShowEditSongArtist />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="profile-update" element={<UserProfileUpdate />} />
          </Route>

          <Route path="*" element={<h1>Page Not Found</h1>} />

        </Routes>

      </songContext.Provider>
    </div>
  );
}

export default App;
