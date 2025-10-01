import React from 'react';
import Content from "../../../components/Content";

const Karaklioumi = () => {
    return (
        <div>
            <Content
                image="/img/projects/residential/karaklioumi2009/02-wood-construction.jpg"
                imageTitle="Endless Lines"
                imageText={<span>2009 | Lycabettus<br /><span className="small-text">in collaboration with Marina Arampatzi, Architect NTUA</span></span>}
                alt="wood entrance"
            />
            <Content
                image="/img/projects/residential/karaklioumi2009/03-wood-detail.jpg"
                alt="wood construction"
            />
            <Content
                image="/img/projects/residential/karaklioumi2009/01-wood-entrance.jpg"
                alt="wood detail"
            />
        </div>
    );
};

export default Karaklioumi;
