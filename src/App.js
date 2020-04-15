import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import PostList from './PostList';


function App() {
  return (
    <BrowserRouter basename='/'>
       <Switch>
              <Route path="/" exact component={PostList}/>
              <Route path="/:id"  component={PostList}/>              
        </Switch>
    </BrowserRouter>
  );
}

export default App;
