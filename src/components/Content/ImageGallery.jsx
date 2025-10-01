import React from 'react';

const Column = ({images, columnIndex, alt, columnCount})=>{
    let count = 0;
    let column = [];
    for(let i = 0; i < images.length; i++){
        if(columnIndex === count) column.push(<img src={images[i]} alt={alt[i]} key={i} />);
        count++;
        if(columnCount === count) count = 0;
    }
    return column;
};

export default (props) => {
    let content = [];
    for(let i = 0; i < props.columns; i++){
        content.push(
            <div className={"image-gallery__column column-size-" + props.columns} key={"c"+i}>
                <Column images={props.imageGallery} columnIndex={i} alt={props.alt} columnCount={props.columns} />
            </div>
        );
    }

    return <div className="image-gallery">
        {content}
    </div>;
};