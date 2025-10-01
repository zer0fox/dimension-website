import React, { Component } from 'react';
import NavButton from './NavButton';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { projectsShowMore: false }
    }

    toggleProjectsShowMore = (e) => {
        e.preventDefault();
        this.setState({ projectsShowMore: !this.state.projectsShowMore });
    };

    render() {
        return (
            <nav>
                <NavButton text="Home" href="" />
                <NavButton text="Projects" href="projects" onClick={this.toggleProjectsShowMore} />
                <div className={"show-more" + (this.state.projectsShowMore ? " show" : "")}>
                    <NavButton text="Residential▐" href="projects/residential" />
                    <NavButton text="Offices▐" href="projects/offices" />
                    <NavButton text="Commercial▐" href="projects/commercial" />
                    <NavButton text="Graphic▐" href="projects/graphic" />
                </div>
                <NavButton text="About" href="about" />
                {/* <NavButton text="Contact" href="contact" /> */}
            </nav>
        );
    }
}

export default Navigation;
