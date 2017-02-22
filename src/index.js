import React from 'react';
import ReactDOM from 'react-dom';
import { App, Home, Login, Register, Mypage, Out, Thumbnail, List, Writer, ListDetail, Message, Admin } from 'containers';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

import './style.css';
import './nav.css';
import './authenticate.css';
import './form.css';

const store = createStore(reducers, applyMiddleware(thunk));

console.log(store.getState());
store.subscribe(() => { console.log(store.getState()) })
const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <Route path="mypage" component={Mypage} />
                <Route path="out" component={Out} />
                <Route path="thumbnail" component={Thumbnail} />
                <Route path="/list" component={List} />
                <Route path="/list/:_id" component={ListDetail} />
                <Route path="writer" component={Writer} />
                <Route path="message" component={Message} />
                <Route path="admin" component={Admin} />
            </Route>
        </Router>
    </Provider>, rootElement
);
