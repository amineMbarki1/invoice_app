import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, Fragment } from 'react';

import useAuth from './shared/hooks/useAuth';
import Invoices from './Invoices/pages/Invoices';
import InvoiceDetails from './Invoices/pages/InvoiceDetails';
import LoginPage from './users/pages/LoginPage';
import AuthContext from './shared/context/authContext';
import Sidebar from './shared/components/Sidebar';
import Modal from './shared/components/Modal';
import { ReactComponent as Avatar } from './shared/icons/avatar.svg';
import Button from './shared/components/Button';
import './App.css';

function App() {
  //state for tracking profile modal (false = closed)
  const [profileModal, setProfileModal] = useState(false);

  const openCloseProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const { login, logout, token, userId, userName } = useAuth();
  let routes;

  if (token)
    routes = (
      <Fragment>
        <Modal onCloseModalHandler={openCloseProfileModal} isVisible={profileModal}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar style={{ width: '5rem', borderRadius: '50%' }} />
            <p style={{ fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '1rem' }}>{userName}</p>
            <Button
              clickHandler={() => {
                logout();
                openCloseProfileModal();
              }}
              btnAction="logout"
            >
              logout
            </Button>
          </div>
        </Modal>

        <Sidebar openProfileModal={openCloseProfileModal} />

        <main className="container">
          <Switch>
            <Route path="/invoices" exact>
              <Invoices />
            </Route>
            <Route path="/invoices/new">
              <Invoices newInvoice={true} />
            </Route>
            <Route path="/invoices/:id/edit">
              <InvoiceDetails editInvoice={true} />
            </Route>
            <Route path="/invoices/:id" exact>
              <InvoiceDetails />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </main>
      </Fragment>
    );
  else
    routes = (
      <main className="container">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </main>
    );

  // return (
  //   <Router>
  //     <main className="container">
  //       <Switch>
  //         <Route path="/invoices" exact>
  //           <Invoices />
  //         </Route>
  //         <Route path="/invoices/new">
  //           <Invoices newInvoice={true} />
  //         </Route>
  //         <Route path="/invoices/:id/edit">
  //           <InvoiceDetails editInvoice={true} />
  //         </Route>
  //         <Route path="/invoices/:id" exact>
  //           <InvoiceDetails />
  //         </Route>
  //         <Route path="/login">
  //           <LoginPage />
  //         </Route>
  //       </Switch>
  //     </main>
  //   </Router>
  // );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId,
        token: token,
        login,
        logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
