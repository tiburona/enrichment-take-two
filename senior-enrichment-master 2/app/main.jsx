'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

import store from './store'
import Root from './components/Root'
import Students from './components/Students'


render (
  <Provider store={store}>
  <Router history={hashHistory}>
  <Route path='/' component={Root} />
  </Router>
  
  </Provider>,
  document.getElementById('main')
)

// <Router history={hashHistory}>
//     <Route path='/' component={AppContainer} foo={'foo'}>
//       <Route path="/albums" component={Albums} />
//       <Route path="/albums/:albumId" component={Album} />
//       <Route path="/artists" component={Artists} />
//       <Route path="/artists/:artistId" component={Artist}>
//         <Route path="/artists/:artistId/albums" component={Albums} />
//         <Route path="/artists/:artistId/songs" component={Songs} />
//       </Route>
//       <IndexRedirect to='/albums' />
//     </Route>
//   </Router>,