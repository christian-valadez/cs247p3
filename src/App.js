import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import InfoCard from './InfoCard.js';
import Image from './Image.js';
import Canvas from './Canvas.js'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


const sampleInfoCard = {
  title: "Card Title", 
  imageLink: "https://www.efilecabinet.com/wp-content/uploads/2017/03/how-work-life-balance-can-be-achieved.jpg",
  affectsWomen: "This is how it affects women", 
  quote: "This is a quote"
}

const infoCards = [sampleInfoCard];


class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>

        {/* PROTOTYPE SECTION BEGINS HERE */}
        <Canvas /> 

        {/* Images SECTION BEGINS HERE */}
        <div className="picturesContainer" >

          {infoCards.map((card) =>{
            const {imageLink} = card; 

            //TODO: Calculate offset, pass it in as defaultX / Y
            return (
              <div style={{
                backgroundColor: "#F3F3F3",
                color: "black",
                width: "500px",
                height: "500px",
              }} >
                Images section goes here
                <Image imageLink={imageLink}
                  defaultX={0}
                  defaultY={0}
                />
              </div> 
            )
          })}

        </div>
        {/* CARDS SECTION BEGINS HERE */}
        <div> 
          {infoCards.map((card) => {
            return (
              <InfoCard 
              {...card}
            />
            )
          })}
        </div> 

      </div>
    );
  }
}

export const ItemTypes = {
  IMAGE: 'image'
};



export default DragDropContext(HTML5Backend)(App);
