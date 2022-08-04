import "./App.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from "./components/Home";
import RecipeCreate from './components/RecipeCreate';
import Detail from "./components/Detail";
import './styles/styles.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path= '/home/:id' component={Detail} />
          <Route path= '/home' component={Home} />
          <Route path= '/recipes' component={RecipeCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
