import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

//
const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

//private Routes
//Access when login
const privateRoutes = [{ path: '/', component: Home }];

export { publicRoutes, privateRoutes };
