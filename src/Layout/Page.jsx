import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from '../Pages/Home';
import Projects from '../Pages/Projects';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Project from '../Pages/Project';
import PageNotFound from '../Pages/PageNotFound';

class Page extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    };

    getPage = ()=>{
        switch(this.props.name){
            case "home": return <Home />;
            case "projects": return <Projects />;
            case "about": return <About />;
            case "contact": return <Contact />;
            case "project": return <Project />;
            default: return <PageNotFound />;
        }
    };

    render() {
        return (
            <div className="content content-container">
                {this.getPage()}
            </div>
        );
    }
}

export default Page;
