import React, { Component } from 'react';
import Content from '../components/Content';

class About extends Component {
    render() {
        return (
            <div>
                <Content
                    title="Dimitra Gogi"
                    text={<span className="content__profile">
                        <img src="/img/profile.jpg" alt="Profile Pic" />
                        <strong>Dimension Studio</strong> was founded at 2008 and is located in Athens.<br />
                        I have studied Architecture in NTUA, National Technical University of Athens (1999 - 2006) and "Interior Design for Commercial Spaces" in IED, Barcelona (2006 - 2007).<br />
                        For the past years, I have been involved in various architectural projects (design concepts, site supervision and construction).
                        <br />
                        Creativity and innovation are my main concerns.
                    </span>}
                />
            </div>
        );
    }
}

export default About;
