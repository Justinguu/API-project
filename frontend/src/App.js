// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpts from "./components/Spots/GetAllSpts";
import CreateSpotForm from "./components/Spots/CreateSpot";
import GetSingleSpot from "./components/Spots/GetCurrSpot"



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);




  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/spots/create">
            <CreateSpotForm />
          </Route>
            <Route exact path="/spots/:spotId">
              <GetSingleSpot />
            </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">  
            <GetAllSpts/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;