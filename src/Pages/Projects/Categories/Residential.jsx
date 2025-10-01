import React from 'react';
import Content from "../../../components/Content";

const Residential = () => {
    return (
        <div>
            <Content
                href="projects/residential/paros"
                image="/img/projects/residential/paros2020/paros-1.jpg"
                imageTitle="Four Summer Houses"
                imageText={<span>2020 | Dryos, Paros<br /><span className="small-text">in collaboration with Marouso Marinopoulou, Architect NTUA</span></span>}
                alt="Paros Four summer houses"
            />
            {/* <Content
                href="projects/residential/grey-house"
                image="/img/projects/residential/greyhouse2019/bathroom-wood-tile-1.jpg"
                imageTitle="The Grey Project"
                imageText="2019 | Palaio Faliro"
                alt="The Grey Project"
            /> */}
            <Content
                href="projects/residential/small-but-classy-apartment"
                image="/img/projects/residential/smallbutclassyapartment2018/sbc-main.jpg"
                imageTitle="Small but Classy"
                imageText="2018 | Kypseli"
                alt="Small But Classy Apartment"
            />
            <Content
                href="projects/residential/playful-apartment"
                image="/img/projects/residential/playfulapartment2018/02-herringbone-detail.jpg"
                imageTitle="Playful Apartment"
                imageText="2018 | Cholargos"
                alt="Playful Apartment"
            />
            <Content
                href="projects/residential/its-a-girls-game"
                image="/img/projects/residential/itsagirlsgame2017/01-kitchen.jpg"
                imageTitle="It's a Girls Game"
                imageText="2017 | Pangrati"
                alt="It's a Girls Game"
            />
            {/*<Content
                href="projects/residential/home-sweet-home"
                image="/img/projects/residential/prigkiponnison2016/01-floor-appartment.jpg"
                imageTitle="Home Sweet Home"
                imageText="2016 | Polygono"
                alt="Home"
            />*/}
            <Content
                href="projects/residential/endless-lines"
                image="/img/projects/residential/karaklioumi2009/02-wood-construction.jpg"
                imageTitle="Endless Lines"
                imageText={<span>2009 | Lycabettus<br /><span className="small-text">in collaboration with Marina Arampatzi, Architect NTUA</span></span>}
                alt="Endless Lines"
            />
            <Content
                href="projects/residential/elianthos"
                image="/img/projects/residential/elianthos2007/01-general-dp.jpg"
                imageTitle="Elianthos Gi"
                imageText="2007 | Gythio"
                alt="Elianthos Gi"
            />
        </div>
    );
};

export default Residential;
