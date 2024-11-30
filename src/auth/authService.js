import axios from "axios";
axios.defaults.withCredentials = true;

const checkSession = async () => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      "http://localhost:8000/api/session",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return true; // Session is valid
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      return false; // Session is not valid
    }
    console.log(error);
    return false; // Session is not valid
  }
};

export default checkSession;
