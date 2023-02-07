import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { publicRoutes, privateRoutes } from './routes';

function App() {
    const { currentUser } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                currentUser ? <Navigate to="/" /> : <Page />
                            }
                        ></Route>
                    );
                })}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                currentUser ? (
                                    <Page />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
