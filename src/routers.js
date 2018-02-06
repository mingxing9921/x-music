import App from './App';
import Home from './containers/home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import React, {Component} from 'react';

class Routers extends Component {
    render() {
        //把主页嵌套进去
        const Root = ({route}) => (
            <div className="root">
                <App routs={renderRoutes(route.routes)}/>
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
            <Router>{renderRoutes(Routes)}</Router>
        );
    }
}

export default Routers;
