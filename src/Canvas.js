import React from 'react'; 
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Image from './Image';

const target = {

    // Move here, or move inside endDrag() handler 
    drop(props, monitor, component) {
      const coords = monitor.getSourceClientOffset();
      const item = monitor.getItem(); 
        const newImage = { 
            imageLink: item.imageLink, 
            x: coords.x,
            y: coords.y
        }
      component.addImage(newImage);
      props.addImageToCanvas(newImage);
    },

    //Change style of Canvas when hovering over it 
    hover(props, monitor, component){
    }

  };

function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      item: monitor.getItem(), 
      dropResult: monitor.getDropResult(),
      coords: monitor.getSourceClientOffset(),
      didDrop: monitor.didDrop(),
      newImage: monitor.getDropResult() 
    };
}


class Canvas extends React.Component { 
    constructor(){
        super();
        this.state = {
            listOfImages: []
        }
    }

    render(){
        const { connectDropTarget, isOver, item, dropResult, coords, didDrop, newImage } = this.props; 
        const { listOfImages } = this.state;

        return connectDropTarget(
            <div className="canvasContainer"> 
                {isOver && 
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0, 
                            bottom: 0,
                            height: '100%',
                            width: '100%',
                            opacity: 0.5,
                            backgroundColor: 'yellow'
                        }} />
                }
                {this.state.listOfImages.map((image, i) => {
                        return (
                        <div key={i}
                        style={{
                            position: 'relative',
                            border: '1px solid black'
                        }}> 
                        <Image imageLink={image.imageLink}
                            x={0}
                            y={0} />
                        
                        </div>
                        )
                })}
            </div> 
        )
    }
    addImage(newImage){
        this.setState({listOfImages: this.state.listOfImages.concat([newImage])});
    }
}

Canvas.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
}

export default DropTarget("image", target, collect)(Canvas)