import React from 'react';
import Content from "../../components/Content";

const Kampi = () => {
    return (
        <div>
            <Content
                image="/img/projects/commercial/kampi2015/kampi-1.jpg"
                imageTitle="Beach Bar"
                imageText="2015 | Fournoi Ikarias"
                alt="Beach Bar"
            />
            <Content
                image="/img/projects/commercial/kampi2015/kampi-3.jpg"
                alt="Beach Bar 3"
            />
            <Content
                image="/img/projects/commercial/kampi2015/kampi-4.jpg"
                alt="Beach Bar 4"
            />
            <Content
                image="/img/projects/commercial/kampi2015/kampi-5.jpg"
                alt="Beach Bar 5"
            />
            <Content
                image="/img/projects/commercial/kampi2015/kampi-2.jpg"
                alt="Beach Bar 2"
            />
            {/*
            <Content
                image="/img/projects/commercial/kampi2015/kampi-6.jpg"
                alt="Beach Bar 6"
            />
            */}
        </div>
    );
};

export default Kampi;
