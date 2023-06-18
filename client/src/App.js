import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRouter } from './routes';
import { DefaultLayout } from '~/components/Layout';
import { Fragment, useState } from 'react';
import Login from './pages/Login';

function App() {
    const [token, setToken] = useState();
    if (!token) {
        <Login setToken={setToken} />;
        console.log(token)
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRouter.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                exact = {route.exact}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
