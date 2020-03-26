import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
// import HomePage from "../../features/home/HomePage";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
// import ProfilePage from "../../features/profiles/ProfilePage";
import ClassDashboard from "../../features/classes/dashboard/SchoolClassDashboard";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "../../features/landing/LandingPage";
import ClassDetails from "../../features/classes/details/SchoolClassDetails";
import ClassForm from "../../features/classes/form/SchoolClassForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);
  if (!appLoaded) return <LoadingComponent content="Kis türelmet.." />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={LandingPage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/classes"
                  component={ClassDashboard}
                />
                <PrivateRoute path="/classes/:id" component={ClassDetails} />
                <PrivateRoute
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ClassForm}
                />
                {/*<PrivateRoute
                  path="/profile/:username"
                  component={ProfilePage}
                />*/}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
