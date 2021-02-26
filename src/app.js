import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RandomMeal from "./RandomMeal";
import AnotherMeal from "./AnotherMeal";

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/randommeal" exact component={RandomMeal} />
        <Route path="/anothermeal" exact component={AnotherMeal} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
