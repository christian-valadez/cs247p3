import React from 'react';


const InfoCard = (props) => {
    const borderColor  = props.point > 0 ? "#2DC600" : "#C63A36"; 
    return(
        <div className="imageCard" style={{
          border: `solid 2px ${borderColor}`,
        }}>
          <div className="leftAligned">
            <h4 className="imageTitle">{props.title}</h4>
            <img src={props.imageLink}
               className="scaledImageCard"/>
          </div>
          <div className="rightAligned">
            <h5>How it affects women in general:</h5>
            <p>{props.affectsWomen}</p>
            <h5>Personal Quotes:</h5>
            <p>{props.quote}</p>
            <h5>Sources:</h5>
              <a href={props.citation}>{props.citation}</a> 
          </div>
        </div>
    )
}


export default InfoCard;
