
import './App.css';
import { BrowserRouter , Route, Switch  }  from 'react-router-dom'
import routes from "./Router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <>
                  <Switch>
                      {
                          routes.map(route=> <Route key={route.path} path={route.path} component={route.component}   /> )
                      }
                  </Switch>
              </>
          </BrowserRouter>

      </Provider>

  );
}

export default App;
