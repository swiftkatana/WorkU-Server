import React from 'react';
import {Router,Route} from 'react-router-dom'
 
import StreamList from './streames/StreamList'
import StreamShow from './streames/StreamShow'
import StreamDelete from './streames/StreamDelete'
import StreamEdit from './streames/StreamEdit'
import StreamCreate from './streames/StreamCreate'
import Header from './Header'
import history from '../history';
import LoginRegister from './LoginRegister';
import Profile from './Profile'
// 


function App() {
  return (
    <div className="ui container">
    <Router history={history}>
    <div>

    <Header />

    <Route path="/" exact component={StreamList} />
    <Route path="/streams/new" exact component={StreamCreate} />
    <Route path="/streams/edit/:id" exact component={StreamEdit} />
    <Route path="/streams/delete/:id" exact component={StreamDelete} />
    <Route path="/streams/show/:id" exact component={StreamShow} />
    <Route path='/streams/loginregister' exact component={LoginRegister} />
    <Route path="/profile" exact component={Profile} />
    </div>
    </Router>
    </div>
  );
}

export default App;
