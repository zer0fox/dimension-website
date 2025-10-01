import React from 'react';
import Content from "../../../components/Content";

const Offices = () => {
    return (
        <div>
            <Content
                href="projects/offices/blown-by-the-wind"
                image="/img/projects/offices/blownbythewind2018/blown-by-the-wind-1.jpg"
                imageTitle="Blown by the Wind"
                imageText="2018 | Nea Smyrni"
                alt="Blown by the Wind"
            />
            <Content
                href="projects/offices/connect-to-technology"
                image="/img/projects/offices/connecttotechnology2015/connect-to-technology-1.jpg"
                imageTitle="Connect to Technology"
                imageText="2015 | Nea Ionia"
                alt="Connect to Technology"
            />
        </div>
    );
};

export default Offices;
