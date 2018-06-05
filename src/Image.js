import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

import './App.css';

const imageSource = { 
    // Returns an object to monitor.getItem()
    beginDrag(props, monitor, component) {
        console.log(`starting to drag:${props.imageLink}`); 
        return {
            //Identifier for image
            imageLink: props.imageLink 
        };
    },

    //Component is Image that was being dropped 
    endDrag(props, monitor, component){
        const newImage = monitor.getDropResult();
        const didDrop = monitor.didDrop(); 
        const imageLink = component.state.imageLink; 

        console.log(`Did drop:${component.state.imageLink}`);
        console.log(imageLink);
        const {addImageToCanvas, removeImageFromCanvas } = props; 

        console.log(typeof(addImageToCanvas));
        // Dropped inside of Canvas 
        if (didDrop){
            console.log('dropped inside of canvas');
            console.log(imageLink);
            props.addImageToCanvas(imageLink);
        }
        // Dropped outside of Canvas 
        // We don't know which one was dropped. 
        else { 
            console.log('dropped outside of canvas');
            console.log(imageLink);
            props.removeImageFromCanvas(imageLink);
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
                margin: 10
            }}> 
                <img src={imageLink}
                    height={200}
                    width={200}
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