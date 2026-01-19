import React from 'react';
import {GlobaleStyle} from './AppElements';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Researcher from './components/Researcher/Researcher';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Connection from './components/Connection/Connection';
import AuthWrapper from "./utils/AuthWrapper";
import PageNotExist from "./components/pageNotExist";
import ActivityList from "./components/Activity/ActivityList";
import DataImporter from "./components/Configuration/import-data/DataImporter";
import Statistiques from "./components/Statistiques/Statistiques";
import Team from "./components/Team/Team";

function App() {
    return (
        <>
            <Router>
                <GlobaleStyle/>

                {/*Add navigation bar only when user is logged in*/}
                <Routes>
                    <Route path='/Configuration' exact element={<Navbar/>}/>
                    <Route path='/Home' exact element={<Navbar/>}/>
                    <Route path='/Researcher' exact element={<Navbar/>}/>
                    <Route path='/Team' exact element={<Navbar/>}/>
                    <Route path='/Activity' exact element={<Navbar/>}/>
                    <Route path='/Statistiques' exact element={<Navbar/>}/>
                    

                    <Route path='*' exact element={<></>}/>
                </Routes>

                <Routes>
                    <Route path='/About' exact element={<About/>}/>
                    <Route path='/' exact element={<Connection/>}/>
                    <Route path='*' exact element={<PageNotExist/>}/>

                    <Route element={<AuthWrapper />}>
                        <Route path='/Configuration' exact element={<DataImporter/>}/>
                        <Route path='/Home' exact element={<Home/>}/>
                        <Route path='/Researcher' exact element={<Researcher/>}/>
                        <Route path='/Team' exact element={<Team/>}/>
                        <Route path='/Activity' exact element={<ActivityList/>}/>
                        <Route path='/Statistiques' exact element={<Statistiques/>}/>
                    </Route>

                </Routes>

                <Footer/>

            </Router>
        </>

    );
}


export default App;