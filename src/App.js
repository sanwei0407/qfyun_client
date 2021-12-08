
import './App.css';
import { BrowserRouter , Route, Switch  }  from 'react-router-dom'
import routes from "./Router";

function App() {
  return (
      <BrowserRouter>
       <>
          <Switch>
              {
                  routes.map(route=> <Route key={route.path} path={route.path} component={route.component}   /> )
              }
          </Switch>
       </>
      </BrowserRouter>
  );
}

export default App;
