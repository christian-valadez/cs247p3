import React from 'react'; 
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import Image from './Image';



const target = {
    // Returns a function that calculates whether the image can 
    // be dropped at that xCoord / yCoord

    // Component is Canvas, how do we get image?
    drop(props, monitor, component) {
      const coords = monitor.getSourceClientOffset();
      const item = monitor.getItem(); 
      console.log(item);
      console.log(`Coords: ${coords.x} and ${coords.y}, ${item.imageLink}`);
      return {
          imageLink: item.imageLink, 
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
        // if (newImage){
        //     console.log(newImage);
        //     console.log("DID DROP");
        //     this.setState({listOfImages: this.state.listOfImages.concat([newImage])});
        // }
    }
    //make a method, that accesses target.wahatever, and then modifies the state
    //in response

    // Problem: In response to a user event, wich is accessible via...{ }

    render(){
        const { connectDropTarget, isOver, item, dropResult, coords, didDrop, newImage } = this.props; 

        const { listOfImages } = this.state;


        // {isOver &&
        //     <Image imageLink={item.imageLink}
        //         defaultX={coords.x}
        //         defaultY={coords.y}
        //     />  
        //     }
        
        // imageLink, .x, .y, 
        // console.log(dropResult);
        // Works when dropped 
        // console.log(didDrop);

        if (didDrop){
            console.log("DID DROP!");
        }
    
        return connectDropTarget(
            <div className="canvasContainer"> 
                Canvas container here

                {didDrop && 
                    <div>
                        Did drop! 
                    </div> }
                        
                {this.state.listOfImages.map((image) => {
                        console.log("rendering new images");
                        <Image imageLink={image.imageLink}
                            x={image.x}
                            y={image.y} />
                })}

            </div> 
        )
        // this.props.imageLink = this. 
    }
}

Canvas.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
}


export default DropTarget("image", target, collect)(Canvas)