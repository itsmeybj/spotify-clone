import Cookies from "js-cookie"

//const url = "http://localhost:5000";
//const url = "https://spotify-clone-service.onrender.com";
const url = "https://spotify-clone-service.onrender.com";

//login and register
export const authUserApiDataToServer = async (route, data) => {
  console.log(data)
  try {
    const response = await fetch(`${url}/${route}`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    const result = await response.json();

    return result;
  } catch (err) {
    return err;
  }
};

//song create by artist
export const songApi = async (route, data) => {
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//song update by artist
export const updateSongApi = async (route, data) => {
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//song delete by song id
export const deleteSongByIdApi = async (route, data) => {

  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//delete user by its id
export const deleteUserApi = async (route, data) => {
  
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//get all song by artist login
export const allSongFetchApi = async (route) => {
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },      
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//get all playlist
export const allPlaylistFetchApi = async (route) => {
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },      
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//get song by artist name (artist) 
export const showSongByArtistName = async (route) => {
  try {
    //console.log(url,route,query)
    const token = Cookies.get("jwtSpotifyToken")
console.log(`${url}/${route}`)
    const response = await fetch(`${url}/${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      //body : JSON.stringify(query)      
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//get all artist 
export const getAllArtistApi = async (route) => {
  try {
    //console.log(url,route,query)
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      //body : JSON.stringify(query)      
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//get song by artist name (artist) 
export const allUsersSongFetchApi = async (route) => {
  try {
    //console.log(url,route,query)
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      //body : JSON.stringify(query)      
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//get song by artist name (artist) 
export const fetchAllUserApi = async (route) => {
  try {
    //console.log(url,route,query)
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      //body : JSON.stringify(query)      
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//song like dislike
export const likeSongApi = async (route, data) => {
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      //body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//song delete by song id
export const deletePlaylistByIdApi = async (route, data) => {

  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};

//song update by artist
export const updatePlaylistApi = async (route, data) => {
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};
//song add to playlist by artist
export const addSongToPlaylistApi = async (route, data) => {
  //console.log("xyz-",data)
  try {
    const token = Cookies.get("jwtSpotifyToken")

    const response = await fetch(`${url}/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    //console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
};
