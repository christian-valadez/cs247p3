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

class App extends Component {
  constructor(){
    super();

    const bankImages = infoCards.map(item => {
      return item.imageLink; 
    })

    //Default state for bank is the entire collection of cards
    this.state = {
      canvasImages: [], 
      bankImages: bankImages, 
      presentClicked: false,
    }
  }
  
  presentClicked = (newImage) => {
    this.setState({presentClicked: true, imageLinks: this.state.imageLinks});
  }


  // Add to Canvas, and remove from Bank 
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

//    const newBankImages = _.remove(this.state.bankImages);
    const newCanvasImages = this.state.canvasImages.concat([imageLink]);
    
    this.setState({bankImages: newBankImages, 
      canvasImages: newCanvasImages, 
      presentClicked: false}
    );
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

    const newBankImages = this.state.bankImages.concat([imageLink]);
    this.setState({bankImages: newBankImages, 
      canvasImages: newCanvasImages, 
      presentClicked: false}
    );
    console.log(this.state);
  }

  renderImageBank() {
    const _this = this; 
    const images = this.state.bankImages.map((imageLink, index) =>{
      console.log(imageLink);
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
            &nbsp;on the status of women in tech, and originally found by&nbsp;
            <a href="http://media.dice.com/report/spotlight-on-women-in-tech-3/">
              Dice’s 2012-2013 annual salary survey
            </a>
            &nbsp;(Ashcraft, McClain, and Eger 14). These positions contrast
            starkly with the more technical positions that comprise the top 5
            tech occupations for men. So why the difference?
          </p>
          <p className="introText">
            While many factors contribute to the gender gap in the tech
            industry, one in particular may be surprising: recruitment
            presentations meant to attract talent to the field and encourage
            people to apply often unintentionally repel and discourage
            prospective women applicants. The Clamen Institute for Gender
            Research at Stanford University studied this inadvertent alienation
            of women in depth during&nbsp;
            <a href="http://journals.sagepub.com/doi/pdf/10.1177/0306312718756766">
              one study
            </a>&nbsp;for which they observed 89 distinct recruitment sessions
            (Wynn and Correll 2018).
          </p>
          <p className="introText">
            We invite you to try our interactive explainable below to discover
            for yourself what the Clamen Institute and other studies found,
            and to learn how information presented in recruitment presentations
            can end up conveying unintended, yet impactful messages to women.
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
            Several&nbsp;
            <a href="https://digitalcommons.ilr.cornell.edu/cgi/viewcontent.cgi?referer=https://scholar.google.com/&httpsredir=1&article=1063&context=cahrswp">
              studies
            </a>
            &nbsp;have found a significant relationship between images used in
            recruitment and intentions to apply to the organization. Students
            use recruitment presentations to evaluate fit and attraction to a
            company.&nbsp;
            <a href="http://psycnet.apa.org/fulltext/2003-01068-011.pdf">
              Research
            </a>
            &nbsp;indicates that images also influence peoples’ expectancies for
            receiving a job offer, which contributes to their likelihood of
            applying.
          </p>
          <p className="introText">
            Your job is to design a powerpoint presentation that you think will
            attract the most talent to your company. Specifically, you will be
            choosing the images to include — in no particular order. Just drag
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
          <p className="introText">
            Let’s dive into your image selections.
          </p>
          {infoCards.map((card) => {
            if (this.state.imageLinks.includes(card.imageLink)){
              return (
                <InfoCard
                {...card}
              />
              )
            }
            return null;
          })}
        </div>
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
