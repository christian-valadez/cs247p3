import React, { Component } from 'react';
import logo from './logo.svg';
import top5TechJobsFigure from './top5TechJobs.png'
import './App.css';
import { infoCards } from './Constants';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import InfoCard from './InfoCard.js';
import Image from './Image.js';
import Canvas from './Canvas.js'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import _ from 'lodash';

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

shuffle(infoCards);

const bankImages = infoCards.map(item => {
  return item.imageLink; 
})

const women  = {
  red: require('./images/redWoman.png'),
  blank: require('./images/blankWoman.png'),
  green: require('./images/greenWoman.png')
}

let points = 0; 

class App extends Component {
  constructor(){
    super();


    //Default state for bank is the entire collection of cards
    this.state = {
      canvasImages: [], 
      bankImages: bankImages, 
      presentClicked: false
    }
  }
  
  presentClicked = () => {
    points = 0; 
    this.state.canvasImages.map((imageLink) => {
      infoCards.map((image) => {
        if (imageLink == image.imageLink){
          points += image.point;
        }
      })
    })
    this.setState({
      canvasImages: this.state.canvasImages,
      bankImages: this.state.bankImages,
      presentClicked: true
    });
  }


  // Add to Canvas, and remove from Bank 
  // Only add if the image isn't already in there. 
  addImageToCanvas = (imageLink) => {
    console.log("addingImageToCanvas");
    console.log(imageLink);

    const newBankImages = [];
    this.state.bankImages.map((item) => {
      if (imageLink !== item){
        newBankImages.push(item); 
      }
    })
    console.log(newBankImages);

    
    let inArrayAlready = false;  
    this.state.canvasImages.map(item => {
      if (imageLink === item){
        inArrayAlready = true; 
      }
    })


    if (!inArrayAlready){
      const newCanvasImages = this.state.canvasImages.concat([imageLink]);
      this.setState({bankImages: newBankImages, 
        canvasImages: newCanvasImages, 
        presentClicked: false}
      );
    }

    console.log(this.state);
  }

  // Remove from Canvas, add to Bank 
  removeImageFromCanvas = (imageLink) => {
    console.log("removeImageFromCanvas");
    console.log(imageLink);

   
    const newCanvasImages = [];
    this.state.canvasImages.map((item) => {
      if (imageLink != item){
        newCanvasImages.push(item);
      }
    })
    console.log(newCanvasImages);

    let inArrayAlready = false;  
    this.state.bankImages.map(item => {
      if (imageLink === item){
        inArrayAlready = true; 
      }
    })
    
    if (!inArrayAlready){
      const newBankImages = this.state.bankImages.concat([imageLink]);
      this.setState({bankImages: newBankImages, 
        canvasImages: newCanvasImages, 
        presentClicked: false}
      );
    }

    console.log(this.state);
  }

  renderImageBank() {
    const _this = this; 
    const images = this.state.bankImages.map((imageLink, index) =>{
      //TODO: Calculate offset, pass it in as defaultX / Y
      return (
          <Image imageLink={imageLink}
            defaultX={0}
            defaultY={0}
            key={imageLink}
            addImageToCanvas={_this.addImageToCanvas}
            removeImageFromCanvas={_this.removeImageFromCanvas}
          />
      )
    })
    return images; 
  }

  renderWomen() {
    let womenArr = [];
    
    //Render lost women 
    for (let i = 0; i > points; i--){
      const keyIndex = womenArr.length;
      womenArr.push(
        <div className="women" key={keyIndex}>
          <img src={women.red} height="70px" width="60px" />
        </div>);
    }

    //Render gained women
    for (let i = 0; i < points; i++){
      const keyIndex = womenArr.length;
      womenArr.push(
        <div className="women" key={keyIndex}> 
          <img src={women.green} height="70px" width="60px" />
        </div> 
      )
    }
    
    //Render the rest of the women 
    for (let i = 0; i < ( (points < 0) ? (10 + points) : 10); i++){
      const keyIndex = womenArr.length;
      womenArr.push(
        <div className="women" key={keyIndex}>
          <img src={women.blank} height="70px" width="60px" />
        </div>);
    }

    return womenArr; 
  }

  render() {
    return (
      <div className="pageContainer"> 
          <Navbar>
          <Nav>
            <NavItem>
              <NavLink href="#theProblem">The Problem</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#howItWorks">How It Works</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#interactiveExplainable">Interactive Explainable</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#debrief">Debrief</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        {/* INTRO SECTION BEGINS HERE */}
        <div className="introTextContainer">
          <a name="theProblem">
            <h1 className="sectionTitle">The Problem</h1>
          </a>
          <img src={top5TechJobsFigure}
               alt="Top 5 Tech Jobs For Men and Women"
               className="figure"/>
          <p className="introText">
            Project manager, business analyst, other IT, QA tester, technical
            recruiter—these are the top five tech occupations for women, as
            reported by the&nbsp;
            <a href="https://www.ncwit.org/sites/default/files/resources/womenintech_facts_fullreport_05132016.pdf">
              National Center for Women & Information Technology
              (NCWIT)’s 2016 update
            </a>
            &nbsp;on the status of women in tech. These positions contrast
            starkly with men. So why the difference?
          </p>
          <p className="introText">
            While many factors contribute to the gender gap in the tech
            industry, one in particular may be surprising: <b>recruitment
            presentations meant to attract talent to the field often have the adverse effect on women.</b>
          </p>
          <p className="introText">
            We invite you to try our interactive explainable below to discover
            for yourself how information presented in recruitment presentations
            can end up having unintended consequences.
          </p>
        </div>

        {/* INSTRUCTIONS SECTION BEGINS HERE */}
        <div className="introTextContainer">
          <a name="howItWorks">
            <h1 className="sectionTitle">How It Works</h1>
          </a>
          <p className="introText">
            Imagine you are a college recruiter for a Silicon Valley tech
            company. You’re giving a recruitment presentation to a bunch of
            computer science majors. There are 100 people in the audience —
            50 men, and 50 women.
          </p>
          <p className="introText">
            Students
            use recruitment presentations to evaluate fit and attraction to a
            company. Several&nbsp;
            <a href="https://digitalcommons.ilr.cornell.edu/cgi/viewcontent.cgi?referer=https://scholar.google.com/&httpsredir=1&article=1063&context=cahrswp">
              studies
            </a>
            &nbsp;have found a significant relationship between images used in
            recruitment and intentions to apply to the organization.
          </p>
          <p className="introText">
            Your job is to design a powerpoint presentation that you think will
            attract the most talent to your company. Specifically, you will be
            choosing the images to include. Just drag
            and drop which images you think will be the most effective
            at recruiting the best group of engineers! Simple as that.
          </p>
        </div>

        {/* CANVAS SECTION BEGINS HERE */}=
        <Canvas 
          canvasImages={this.state.canvasImages}
          addImageToCanvas={this.addImageToCanvas}
          removeImageFromCanvas={this.removeImageFromCanvas}
        /> 

        {/* IMAGE BANK SECTION BEGINS HERE */}
        <div className="picturesContainer" >
          {this.renderImageBank()}
        </div> 


        <button style={{alignSelf: "center"}} 
            onClick={this.presentClicked}>
             Present
        </button> 
        {/* CARDS SECTION BEGINS HERE */}
        {this.state.presentClicked && 
          <div className="cardsContainer">
          <a name="debrief">
            <h1 className="sectionTitle">Debrief</h1>
          </a>
          <p className="introText">
            Phew, the presentation is over! Let’s see what the response was
            from the students.
          </p>
          <p className="introText">
            Recruitment presentations are an important tool for communicating
            commitment to inclusion and diversity to prospective employees.
            Unfortunately, it’s easier than you might think to alienate or
            simply turn someone off to your whole company by what you put in
            front of them.
          </p>
          
          {/* WOMEN PNG SECTION BEGINS HERE */}
          <p className="introText"> 
            Here's what your workforce might look like: 
          </p> 
          <div className="womenContainer"> 
            {this.renderWomen()}
          </div> 
          
          {(points < 0) && 
            <div> 
              Oh no! It looks like you lost {Math.abs(points)} women from your workforce!
            </div>
          }

          {(points > 0) && 
            <div> 
              Awesome! Your presentation was great, and you were able to successfully recruit {points} woman into your workforce! 
            </div>
          }

          {(points == 0) && 
            <div>
              You didn't lose any of the women in your workforce, but you didn't recruit any, either!
            </div>
          }
          

          {/* CARDS BEGIN HERE */}
          <p className="introText">
            Let’s dive into your image selections.
          </p>

          {infoCards.map((card) => {
            if (this.state.canvasImages.includes(card.imageLink)){
              return (
                <InfoCard
                key={card.imageLink}
                {...card}
              />
              )
            }
            return null;
          })}
          <h1 className="sectionTitle">The Big Picture</h1>
          <p className="introText">
            For recruiters, it is important to actively keep implicit bias in mind when putting together a recruitment presentation. Without knowing what to look for, subtle bias in imagery and language can unintentionally push certain groups away from applying and misrepresent your company values.
          </p>
          <p className="introText">
            This mindfulness takes both research and empathy — it’s too easy to play into societal biases, especially when a quick Google search for “programmer” results in almost entirely photos and cartoons of men coding in the dark. Seriously, go ahead and Google it.
          </p>
          <p className="question">
            <i>So why is it so important that we work to attract women, specifically?</i>
          </p>
          <p className="introText">
            By ignoring red flags and implicit bias in recruitment, the pipeline of women (which is already small from lack of encouragement at a young age to go into STEM majors) gets even smaller.
          </p>
          <p className="question">
            <i>Why do we care?</i>
          </p>
          <p className="introText">
            It turns out that without a diverse group of employees, your company could be missing out on highly qualified candidates, important innovation contributions, and increased productivity and therefore profit. There is a myriad of research demonstrating better business outcomes when underrepresented groups (like women) are valued and lead others.
          </p>
        </div>
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
