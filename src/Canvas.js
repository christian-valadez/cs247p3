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
    },

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
    render(){
        const { connectDropTarget, isOver, item, dropResult, coords, didDrop, newImage } = this.props; 

        return connectDropTarget(
            <div className="canvasContainer"> 
                {/* YELLOW OVERLAY */}
                {isOver && 
                        <div style={{
                            position: 'relative',
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
                {this.props.canvasImages.map((image, i) => {
                        return (
                        <div
                            key={image}
                        style={{
                        }}> 
                        <Image imageLink={image}
   
                            addImageToCanvas={this.props.addImageToCanvas}
                            removeImageFromCanvas={this.props.removeImageFromCanvas}
                          />
                        
                        </div>
                        )
                })}
            </div> 
        )
    }
}

Canvas.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
}

export default DropTarget("image", target, collect)(Canvas)