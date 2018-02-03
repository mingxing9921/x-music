import App from './App';
import Home from './containers/home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import React, {Component} from 'react';

class Routers extends Component {
    render() {
        const Root = ({route}) => (
            <div>
                <App/>
                {renderRoutes(route.routes)}
            </div>
        );
        const Routes = [
            {
                component: Root,
                routes: [
                    {
                        path: '/',
                        exact: true,
                        component: Home
                    }
                ]
            }
        ];

        return (
            // <Router>
            //     <div>
            //     <Route component={App}/>
            //     <Route exact path="/" component={Home}/>
            //     </div>
            // </Router>
            <Router>{renderRoutes(Routes)}</Router>
        );
    }
}

export default Routers;
