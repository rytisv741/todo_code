import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { useAuth } from "./store";

import { useEffect } from "react";
import { Text } from "@chakra-ui/react";
axios.defaults.withCredentials = true;
axios.defaults.baseURL =process.env.REACT_APP_BASE_URL|| "http://localhost:5000/";
function App() {
  const { loading, user, setUser, setLoading } = useAuth();
  
  const checkUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "api/auth/getUser"
      );
      if (data) {
        setUser(data);
        setLoading(false);
      }
    } catch (error) {
      setUser(null);
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    checkUser();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Text mx="auto" textAlign={"center"} color="teal.500" size={"md"}>Loading....</Text>;
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Protected user={user}>
              <Home />
            </Protected>
          }
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          exact
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
