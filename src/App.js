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
    // for (let i = 0; i < ( (points < 0) ? (10 + points) : 10); i++){
    //   const keyIndex = womenArr.length;
    //   womenArr.push(
    //     <div className="women" key={keyIndex}>
    //       <img src={women.blank} height="70px" width="60px" />
    //     </div>);
    // }

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
            <h1 className="sectionTitle">Debugging The Tech Pipeline</h1>
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
            presentations meant to attract talent to the field often have an adverse effect on women.</b>
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
            Imagine you are a <b>college recruiter</b> for a Silicon Valley tech
            company. You’re giving a recruitment presentation to a bunch of
            computer science majors. 
          </p>
 
          <p className="introText">
            Your job is to design a powerpoint presentation that you think will
            attract the most talent to your company. Specifically, you will be
            choosing the images to include. Just <b>drag
            and drop</b> the images you think will be the most effective
            at recruiting the best group of engineers! Simple as that.
          </p>
        </div>

        {/* CANVAS SECTION BEGINS HERE */}
        <Canvas 
          canvasImages={this.state.canvasImages}
          addImageToCanvas={this.addImageToCanvas}
          removeImageFromCanvas={this.removeImageFromCanvas}
        /> 

          {/* IMAGE BANK SECTION BEGINS HERE */}
          <div className="picturesContainer" id="interactiveExplainable" >
            {this.renderImageBank()}
          </div>


        <button className="button"
            href="#debrief"
            onClick={this.presentClicked}
            >
             Done!
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
            Students
            use recruitment presentations to evaluate fit and attraction to a
            company. Several&nbsp;
            <a href="https://digitalcommons.ilr.cornell.edu/cgi/viewcontent.cgi?referer=https://scholar.google.com/&httpsredir=1&article=1063&context=cahrswp">
              studies
            </a>
            &nbsp;have found a significant relationship between images used in
            recruitment and intentions to apply to the organization.
          </p>
          
          {/* WOMEN PNG SECTION BEGINS HERE */}
          <div style={{"marginTop": "30px"}} />
          <h3> 
            Here's what your female applicant pool might look like: 
          </h3> 
          <div style={{"marginBottom": "30px"}} />
          <div className="womenContainer"> 
            {this.renderWomen()}
          </div> 
          
          {(points < 0) && 
            <div className="introText"> 
              Oh no! It looks like you lost {Math.abs(points)} {points == -1 ? `woman` : `women`} - they will not be applying to your company.
            </div>
          }

          {(points > 0) && 
            <div className="introText"> 
              Awesome! Your presentation was great, and you were able to successfully recruit {points} {points == 1 ? `woman` : `women`} into your female applicant pool! 
            </div>
          }

          {(points == 0) && 
            <div className="introText">
              You didn't lose any of the women in your female applicant pool, but you didn't recruit any, either!
            </div>
          }
          <div style={{"font-family": "Open Sans, sans-serif", "font-size": "12px"}}> 
            *Each "good" image adds 1 point to your total. Each "bad" image subtracts 2 points 
            from your total. The final number of points represents the women you lost / gained 
            during your presentation. 
          </div>
          <div style={{"font-family": "Open Sans, sans-serif", "font-size": "10px"}}> 
            The reason for this method of score calculation is that 
            once a woman has been negatively impacted by an image, seeing a “good” image can 
            partially—but likely not fully—make up for it.
          </div>
          <div style={{"marginBottom": "30px"}} />
          {/* CARDS BEGIN HERE */}
          <p className="introText" style={{marginTop: "10px"}}>
            Let’s dive into your image selections.
          </p>
          
          <div> 
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
          </div> 

          <h1 className="sectionTitle">The Big Picture</h1>
          <p className="introText">
            For recruiters, it is important to actively keep implicit bias in mind when putting together a recruitment presentation. Without knowing what to look for, <b>subtle bias in imagery and language can unintentionally push certain groups away from applying and misrepresent your company values.</b>
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
          <p className="introText">
            Well, here’s the bad news.
          </p>
          <p className="introText">
            The tech world, as it lives now, lacks diversity. From 1991 to 2014, the percentage of women with computing jobs went down from 36% to 26%. That number has slowly increased over the last six years by 2%. But when you take racial diversity into account the numbers are even more dismal, with black women holding only 3% of women’s positions in computing, and latinas holding only 1%.
          </p>
          <p className="introText">
            And if you think recruiting college grads is the end of the pipeline shrinkage, we wish it were that simple. <b>Women are leaving their jobs in tech at alarming rates, reporting unsupportive work environments and lack of pay and promotion opportunities. Women are leaving tech for other industries twice as quickly as men are.</b>
          </p>
          <p className="introText">
            So it’s not just graduating computer science majors who are abandoning their formal training, it’s also industry professionals.
          </p>
          <p className="question">
            <i>And where are they going?</i>
          </p>
          <p className="introText">
            According to data collected by NCWIT in 2016, only about 20% of the women who leave their jobs in computing take time out of the workforce, an alarmingly low percentage if you had thought that women were leaving work to start families.
          </p>
          <p className="introText">
            In fact, an overwhelming majority of these women who leave their tech careers stay in the workforce, about 80%.
          </p>
          <p className="introText">
            The myth that the “best” naturally rise to the top continues to plague companies today, and in turn they may be unknowingly missing out on highly qualified employees. It’s imperative to recognize that people don’t start off on equal ground.
          </p>
          <p className="introText">
            So yeah, recruitment is just one part of a much bigger problem in the tech industry. But the good news is that there is <i>so much</i> research out there that we know how to fix (or at least help) the gender gap in tech. It’s not going to be easy, it’s going to take a lot of time, and recruitment is just one part of the prong. But with the right mindset — one that embraces accountability and improvement — it’s entirely possible to close that gap!
          </p>
          <p className="introText">
            <i>For further background and research-based strategies for closing the gender gap, see</i> &nbsp;
            <a href="https://www.ncwit.org/sites/default/files/resources/ncwit_women-in-it_2016-full-report_final-web06012016.pdf">
              <i>NCWIT's Women in Tech: The Facts.</i>
            </a>
            &nbsp;
          </p>
        </div>
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
