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

const card1 = {
  title: "Diverse Workspace",
  imageLink: "https://images.unsplash.com/photo-1526029834688-277f359be090?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c3351000c439e5c44095ad3ae222b07c&auto=format&fit=crop&w=1673&q=80",
  affectsWomen: "The stereotypical image of a programmer that most people see in their head is a man. Seeing someone who looks like you tells you ‘you can do this,’ when you may be accustomed to hearing that you can’t.",
  quote: "\"Women and girls need to see female role models in the workplace that look like them - over and over and over again. They need to receive the message that women can work in STEM careers and be successful and fulfilled in their work life, and they need to receive this message repeatedly.\" -Donna Milgram, International Technology Education Association"
}

const card2 = {
  title: "Collaboration",
  imageLink: "http://www.afr.com/content/dam/images/g/l/k/d/i/o/image.imgtype.afrArticleInline.620x0.png/1449730364672.jpg",
  affectsWomen: "According to an article by Shanna Tellerman, CEO and Founder of Modsy, women often prioritize a collaborative environment while searching for jobs. Featuring collaboration, rather than just computers and machinery, sends a positive message of teamwork.",
  quote: "\"In one study, both mid-level men and women strongly valued teamwork and collaboration as important for success.\" -\“Women in Tech: The Fact,\” NCWIT"
}

const card3 = {
  title: "Opportunities for Growth",
  imageLink: "https://images.techhive.com/images/article/2015/04/business_woman_walking_up_financial_arrow_stairs_career_progress_growth_development_achievement_success_getty_images_468068968-100580812-primary.idge.jpg",
  affectsWomen: "According to Catalyst’s current report on Women CEOs of the S&P 500, women make up only 4.6% of CEO’s in these companies. Of these 23 women, only 2 are in tech-related industries (Oracle and IBM). Another study shows that in Silicon Valley, the odds of being in a leadership position was 2.7 times greater for men than for women (Simard et al., 2008). Even further, studies show that the most significant factor that leads to women leaving the tech industry is lack of pay and promotion opportunities. Women need to be shown that there are opportunities for growth.",
  quote: "\"The most recent study by the Center for Talent Innovation found that 32 percent—roughly 1 in 3 SET women—report that they feel “stalled” in their careers and are likely to quit their jobs in one year.\" -\"Women in Tech: The Facts,\" NCWIT"
}

const card4 = {
  title: "Work-Life Balance",
  imageLink: "https://www.efilecabinet.com/wp-content/uploads/2017/03/how-work-life-balance-can-be-achieved.jpg",
  affectsWomen: "Work-life concerns are becoming increasingly important to both women AND men. That being said, women are still asks more frequently than men are to explain how they balance work and family responsibilities. Evidence suggests that employers significantly underestimate the importance of flexible arrangements for employee retention and job satisfaction.",
  quote: "\"Men and women are quite similar in the value they place on being a parent and having a successful marriage, with both ranking these as significantly more important than having a high-paying career\” -\”Women in Tech: The Facts\", NCWIT (Pew Research Center, 2012)."
}

const card5 = {
  title: "Inclusive Imagery and Language",
  imageLink: "https://images.unsplash.com/photo-1453873012442-a18cac0f8b85?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c304cee1914a5b9effb04ec316313d87&auto=format&fit=crop&w=2850&q=80",
  affectsWomen: "Explicitly showing commitment to diversity shows underrepresented groups that they are valued (CareerArc 2015). While this doesn’t have to be done through imagery, describing diversity as an advantage to the company helps to dispel the myth of meritocracy in tech and communicate fair, but not preferential, treatment.",
  quote: "\“Though tech often prides itself on being a meritocracy, research shows that this is not the case. Subtle biases affect who we are predisposed to see as the “best.” Without even realizing it, companies may be creating conditions that cause candidates to underperform and that cause them to miss out on highly qualified talent.\” -\”Women in Tech: The Facts\”, NCWIT"
}


const infoCards = [card1, card2, card3, card4, card5];


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
        <div className="cardsContainer">
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
