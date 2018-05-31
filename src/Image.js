import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

const imageSource = { 
    // Returns an object to monitor.getItem()
    beginDrag(props) {
        return {
            //Identifier for image
            imageLink: props.imageLink 
        };
    },

    endDrag(props, monitor, component){
        const newImage = monitor.getDropResult();
        if (newImage){
            console.log(newImage);
            component.setState({
                x: newImage.x,
                y: newImage.y
            })
            return newImage;
        }
        return null; 
    }
}

function collect (connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(), 
        newImage: monitor.getDropResult()
    }
}

//monitor.getItem() -> retrieves the item returned by beginDrag

// Change the item position, and rerender. 

// Just change the items' state, which will change the style  

class Image extends Component { 
    constructor(props){
        super(props)
        // Default props, defaultX, defaultY 
        const { x, y } = props;
        this.state = {
            x, y
        };
    }

    render(){
        const { connectDragSource, isDragging, imageLink, newImage } = this.props; 
        return connectDragSource( 
            <div style={{
                opacity: isDragging ? 0.5 : 1, 
                outlineColor: "#000000",
                outlineWidth: "10", 
                position: "absolute",
                left: this.state.x,
                top: this.state.y
            }}> 
                <img src={imageLink}
                    alt="Image"
                    className="scaledImage"/>
            </div> 
        )
    }
}

Image.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

export default DragSource("image", imageSource, collect)(Image); 