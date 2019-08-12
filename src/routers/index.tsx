import React from 'react';
import history from './history';
import Bundle from 'tz-library/components/Bundle';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';


export default <Router history={history}>
    <Route render={({location})=>{
        return <Switch location={location}>
            <Route path={'/20181119'}  component={()=><Bundle el={()=>import('pages/Review/A20181119')}/>} />
            <Route path={'/curve'}  component={()=><Bundle el={()=>import('pages/Curve')}/>} />
            <Route path={'/'}  component={()=><Bundle el={()=>import('pages/Home')}/>} />
        </Switch>
    }} />
</Router>
