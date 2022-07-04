import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Share from "./components/post/Share";
import Profile from "./components/profile/Profile";
import Notifications from "./components/notification/Notifications";
import Loading from "./components/common/Loading";
import PrivateRoute from "./components/common/PrivateRoute";
import Context from "./context";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [hasNewPost, setHasNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(false);

  useEffect(() => {
    initAuthUser();
  }, []);

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem("auth");
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
        hasNewPost,
        setHasNewPost,
        selectedPost,
        setSelectedPost,
      }}
    >
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/post/:id" component={Share} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
      {isLoading && <Loading />}
    </Context.Provider>
  );
}

export default App;
