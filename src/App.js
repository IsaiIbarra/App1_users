import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);

//Pages
const Login = React.lazy(() => import('./views/login/Login'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const EditUser = React.lazy(() => import('./views/users/editUser/EditUser'));

const App = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path='/login'
            name='Login Page'
            render={(props) => <Login {...props} />}
          />

          <Route
            exact
            path='/'
            name='Dashboard'
            render={(props) => <Dashboard {...props} />}
          />

          <Route
            exact
            path='/editUser'
            name='Edit User'
            render={(props) => <EditUser {...props} />}
          />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
