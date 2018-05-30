import React from 'react';


const InfoCard = (props) => {
    return(
        <div className="imageCard">
        <div className="leftAligned">
          <h1 className="imageTitle">{props.title}</h1>
          <img src={props.imageLink}
               alt="Image"
               className="scaledImage"/>
        </div>
        <div className="rightAligned">
          <h4>How it affects women in general:</h4>
          <div>{props.affectsWomen}</div> 
          <h4>Personal Quotes</h4>
          <div>{props.quote}</div> 
        </div>
      </div>
    )
}


export default InfoCard; 