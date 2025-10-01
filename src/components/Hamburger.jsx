import React, { Component } from 'react';
import NavButton from './NavButton';

class Hamburger extends Component {
    constructor(props) {
        super(props);
        this.hamburgerInput = null;
        this.state = { projectsShowMore: false }
    }

    linkSelected = () => {
        this.hamburgerInput.checked = false;
    };

    toggleProjectsShowMore = (e) => {
        e.preventDefault();
        this.setState({ projectsShowMore: !this.state.projectsShowMore });
    };

    render() {
        return (
            <div className="navigation d-block d-sm-block d-md-block d-lg-none">
                <input ref={hamburgerInput => (this.hamburgerInput = hamburgerInput)} type="checkbox" className="navigation__checkbox" id="nav-toggle" />
                <label htmlFor="nav-toggle" className="navigation__button">
                    <span className="navigation__icon"></span>
                </label>
                <div className="navigation__background">&nbsp;</div>
                <nav className="navigation__nav">
                    <NavButton text="Home" href="" onClick={this.linkSelected} />
                    <NavButton text="Projects" href="projects" onClick={this.toggleProjectsShowMore} />
                    <div className={"show-more" + (this.state.projectsShowMore ? " show" : "")}>
                        <NavButton text="Residential▐" href="projects/residential" onClick={this.linkSelected} />
                        <NavButton text="Offices▐" href="projects/offices" onClick={this.linkSelected} />
                        <NavButton text="Commercial▐" href="projects/commercial" onClick={this.linkSelected} />
                        <NavButton text="Graphic▐" href="projects/graphic" onClick={this.linkSelected} />
                    </div>
                    <NavButton text="About" href="about" onClick={this.linkSelected} />
                    {/* <NavButton text="Contact" href="contact" onClick={this.linkSelected} /> */}
                </nav>
            </div>
        );
    }
}

export default Hamburger;
