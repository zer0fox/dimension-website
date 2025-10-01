import React, { Component } from 'react';
import Content from '../components/Content';
import HomeBanner from "../components/HomeBanner";

class Home extends Component {
    render() {
        return (
            <div>
                <HomeBanner />
                {/* <Content
                    href="projects/commercial/soil"
                    image="/img/projects/commercial/soil2021/_AY51320.jpg"
                    alt="Soil Restaurant 1"
                    imageTitle="Soil Restaurant"
                />
                <Content
                    href="projects/commercial/soil"
                    image="/img/projects/commercial/soil2021/_AY51318.jpg"
                    alt="Soil Restaurant 2"
                    imageTitle="Soil Restaurant"
                /> */}
                <Content
                    href="projects/commercial/soil"
                    image="/img/projects/commercial/soil2021/soil1.jpg"
                    alt="Soil Restaurant"
                    imageTitle="Soil Restaurant"
                />
                <Content
                    // href="projects/residential/housingproject"
                    image="/img/projects/residential/housingproject2024/house1.jpg"
                    alt="Housing Project 1"
                    imageTitle="Housing Project"
                />
                <Content
                    image="/img/home/1.jpg"
                    alt="Space is the breath of art. --Frank Lloyd Wright"
                />
                <Content
                    image="/img/projects/residential/housingproject2024/house2.jpg"
                    alt="Housing Project 2"
                    imageTitle="Housing Project"
                />
                <Content
                    href="projects/residential/paros"
                    image="/img/projects/residential/paros2020/paros-a1.jpg"
                    imageTitle="Four Summer Houses"
                    alt="Paros"
                />
                <Content
                    image="/img/home/4.jpg"
                    alt=""
                    imageTitle="Kitchen Tiles Detail"
                />
                {/* <Content
                    image="/img/home/5.jpg"
                    alt=""
                /> */}
                <Content
                    image="/img/home/6.jpg"
                    alt=""
                    imageTitle="Work in Progress"
                />
                <Content
                    image="/img/home/8.jpg"
                    alt=""
                    imageTitle="Work in Progress"
                />
                <Content
                    image="/img/other/services.png"
                    alt=""
                />
            </div>

        );
    }
}

export default Home;