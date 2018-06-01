import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

import './App.css';

const imageSource = { 
    // Returns an object to monitor.getItem()
    beginDrag(props) {
        return {
            //Identifier for image
            imageLink: props.imageLink 
        };
    },

    //Component is Image that was just dropped 
    endDrag(props, monitor, component){
        const newImage = monitor.getDropResult();
        if (newImage){
            component.setState({
                imageLink: newImage.imageLink,
                x: newImage.x,
                y: newImage.y
            })
        }
    }
}

function collect (connect, monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(), 
        newImage: monitor.getDropResult()
    }
}



class Image extends Component { 
    constructor(props){
        super(props)
        // Default props, defaultX, defaultY 
        const { x, y, imageLink } = props;
        this.state = {
            x, y, imageLink
        };
    }

    render(){
        const { connectDragSource, isDragging, imageLink, x, y } = this.props; 
        
        if (isDragging){
            return null;
        }
        
        return connectDragSource && connectDragSource( 
            <div style={{
                opacity: isDragging ? 0.5 : 1, 
                outlineColor: "#000000",
                outlineWidth: "10", 

                cursor: "move"
            }}> 
                <img src={imageLink}
                    alt="Image"
                    className="scaledImage"
                    width="100px"
                    heigth="100px"
                    />
            </div> 
        )
    }
}

Image.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

export default DragSource("image", imageSource, collect)(Image); 