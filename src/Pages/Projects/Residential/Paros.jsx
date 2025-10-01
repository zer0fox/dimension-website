import React from 'react';
import Content from "../../../components/Content";

const Paros = () => {
    return (
        <div>
            <Content
                title="Four Summer Houses"
                text="This project is located on Paros Island and consists of
four independent luxury suites
, mainly intended for
tourists during the summer season. Our main concept was to design a fragmented volume that embraces the
landscape and adapts to the natural morphology of the site. The characteristic “white” of Cycladic architecture
harmonizes beautifully with the stone, while the deliberate use of earthy tones further enhances the integration
with the surroundings."
            />
            <Content
                image="/img/projects/residential/paros2020/paros-1.jpg"
                imageTitle="Four Summer Houses"
                imageText={<span>2020 | Dryos, Paros<br /><span className="small-text">in collaboration with Marouso Marinopoulou, Architect NTUA</span></span>}
                alt="Paros Four summer houses"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-a.jpg"
                alt="Paros A"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-a1.jpg"
                alt="Paros A1"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-b.jpg"
                alt="Paros B"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-ccc.jpg"
                alt="Paros C"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-d.jpg"
                alt="Paros D"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-e1.jpg"
                alt="Paros E1"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-e2.jpg"
                alt="Paros E2"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-f.jpg"
                alt="Paros F"
            />
            {/*
            <Content
                image="/img/projects/residential/paros2020/paros-2.jpg"
                alt="Paros 2"
            />
            */}
            <Content
                image="/img/projects/residential/paros2020/paros-3.jpg"
                alt="Paros 3"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-4.jpg"
                alt="Paros 4"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-5.jpg"
                alt="Paros 5"
            />
            <Content
                image="/img/projects/residential/paros2020/paros-6.jpg"
                alt="Paros 6"
            />
            {/*<Content
                image="/img/projects/residential/paros2020/paros-7-under-construction.jpg"
                alt="Under Construction"
            />*/}
        </div>
    );
};

export default Paros;
