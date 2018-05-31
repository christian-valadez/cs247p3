import React from 'react'; 
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Image from './Image';



const target = {
    // Returns a function that calculates whether the image can 
    // be dropped at that xCoord / yCoord
    canDrop(props, monitor){
        return true;
    },

    drop(props, monitor, component) {
      const coords = monitor.getSourceClientOffset();
      console.log(`Coords: ${coords.x} and ${coords.y}`);
      return {
          imageLink: props.imageLink, 
          x: coords.x,
          y: coords.y
      }
    },

    //Change style of Canvas in response
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
    //Image: xCoord, yCoord, imageLink 

    //Don't move the image, just create a new one! 

    constructor(){
        super();
        this.state = {
            listOfImages: []
        }
    }
    
    componentDidMount(){
        const { connectDropTarget, isOver, item, dropResult, coords, didDrop, newImage } = this.props; 

        // Change the state, add that image to the array
        if (didDrop){
            console.log(newImage);
            this.setState({listOfImages: this.state.listOfImages.concat([newImage])});
        }
    }

    render(){
        const { connectDropTarget, isOver, item, dropResult, coords, didDrop, newImage } = this.props; 

        const { listOfImages } = this.state;
        /*
        {isOver &&
            <Image imageLink={item.imageLink}
                defaultX={coords.x}
                defaultY={coords.y}
            />  
            }
        */
       

        return connectDropTarget(
            <div style={{
                backgroundColor: "#F7F7F7",
                color: "black",
                width: "500px",
                height: "500px",
                position: 'relative'
              }} >
                {this.state.listOfImages.map((image) => {
                    <Image imageLink={newImage.imageLink}
                        x={0}
                        y={0} />
                })}
                Prototype section goes here
            </div> 
        )
    }
}

Canvas.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
}


export default DropTarget("image", target, collect)(Canvas)