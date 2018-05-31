import React from 'react';


const InfoCard = (props) => {
    return(
        <div className="imageCard">
          <div className="leftAligned">
            <h4 className="imageTitle">{props.title}</h4>
            <img src={props.imageLink}
               alt="Image"
               className="scaledImage"/>
          </div>
          <div className="rightAligned">
            <h5>How it affects women in general:</h5>
            <p>{props.affectsWomen}</p>
            <h5>Personal Quotes:</h5>
            <p>{props.quote}</p>
          </div>
        </div>
    )
}


export default InfoCard;
