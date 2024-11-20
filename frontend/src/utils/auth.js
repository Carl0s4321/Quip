import axios from 'axios';

const auth = {
  setToken: (token) => {
    sessionStorage.setItem("User", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    window.dispatchEvent(new Event("tokenChange"));
  },

  clearToken: () => {
    sessionStorage.removeItem("User");
    delete axios.defaults.headers.common["Authorization"];
    window.dispatchEvent(new Event("tokenChange"));
  },

  initializeToken: () => {
    const token = sessionStorage.getItem("User");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },

  getToken: () => {
    return sessionStorage.getItem("User");
  }
};

export default auth;
