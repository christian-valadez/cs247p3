import React, { Component } from 'react';
import logo from './logo.svg';
import top5TechJobsFigure from './top5TechJobs.png'
import './App.css';

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


const sampleInfoCard = {
  title: "Card Title",
  imageLink: "https://www.efilecabinet.com/wp-content/uploads/2017/03/how-work-life-balance-can-be-achieved.jpg",
  affectsWomen: "This is how it affects women",
  quote: "This is a quote"
}

const card1 = {
  title: "Diverse Workspace",
  imageLink: "https://images.unsplash.com/photo-1526029834688-277f359be090?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c3351000c439e5c44095ad3ae222b07c&auto=format&fit=crop&w=1673&q=80",
  affectsWomen: "Showing gender diversity in recruitment lets women know that there are people at your company who look like them, decreasing the likelihood of stereotype threat and tokenism. Stereotype threat is the fear that if one’s actions will confirm a negative stereotype about a group they are a part of, and tokenism is when a member of a minority group is singled out to represent or relate to that group (\“Women in Tech: The Facts\”, NCWIT 2016).",
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

const card6 = {
  title: "All-Male Coworkers",
  imageLink: "https://d2uetvsama7sl8.cloudfront.net/prod/wp-content/uploads/2015/07/27160153/gaming-2.jpg",
  affectsWomen: "The recruitment process can communicate unintended, subtle bias without even knowing it. In the Annual Review of Organizational Psychology and Organizational Behavior, it is shown that recruiters/interviewers can easily trigger stereotype threat—or the fear that one’s actions will confirm a negative stereotype—for women through showing an all-male work environment. Additionally, women may not feel like they are a good culture fit for the company if they are shown all males, which can lead them to go elsewhere (Walton et al., 2015).",
  quote: "\"What if we re-labelled it, and instead talked about belonging? In my mind, that’s the real issue: some folks feel that they don’t belong in tech. I don’t want to \“Be Diverse,\” I just want to be.\” -Katie Womersley, I Didn’t Notice"
}

const card7 = {
  title: "Masculine Office Culture",
  imageLink: "http://americaninno.com/wp-content/uploads/wpallimport/files/2/files/2012/04/IMG_3123.jpg",
  affectsWomen: "Beer pong and other stereotypically \“fratty\” references incorporated into office culture can contribute to alienating women (any many men, for that matter). Workplace norms that embody the “brogrammer” culture described in articles by Wired and the NYT has been shown to contribute to women’s perception of the tech industry as \“bro-ey\” and \“testosterone-fueled\” (Sandgren, Kennedy School Review).",
  quote: "\"The environment changed, [Ellen Pao] said, after the early venture-capital firms started investing in tech. ‘They happened to all be white guys who had graduated from the same handful of élite colleges,’ she said. ‘And they tended to make investments in new firms started by people they knew, or by people who were like them.’ This created a model of hiring and investing that some refer to as the ‘Gates, Bezos, Andreessen, or Google model,’ which Melinda Gates recently characterized as, ‘white male nerds who’ve dropped out of Harvard or Stanford.’\” -Sheelah Kolhatkar, New Yorker"
}

const card8 = {
  title: "\"Geeky\" Office Space",
  imageLink: "https://cdn.vox-cdn.com/uploads/chorus_image/image/47927217/post-its-office-818.0.jpg",
  affectsWomen: "The actual, physical office space provides subtle hints about who \“belongs there.\” A workspace communicates culture and community norms, so it is best to avoid depicting an environment that might make women feel excluded or unwelcome (Hattenhauer, 1984). Data suggest that tech offices often convey a stereotypically masculine culture and related expectations. For example, in an experiment done with college students, sci-fi posters, stacked soda cans, video games, etc. made young men and women feel alienated from a company if they didn’t resonate with these \“geeky\” characteristics (Cheryan et al., 2011; Cheryan et al., 2009).",
  quote: "\"When high school girls see Star Trek posters and video games in a computer science classroom, they are less interested than boys in taking the course. When the classroom is devoid of décor, girls still opt out. It is only when an alternate image of computer science is presented by replacing geeky objects with art and nature posters that girls become as interested as boys.\” -Cheryan, Ziegler, Quartz"
}

const card9 = {
  title: "Extreme Technicality",
  imageLink: "http://artificialbrilliance.com/wp-content/uploads/neural-net.jpg",
  affectsWomen: "Technical complexity may be part of the job as a software engineer, but it can be seen as a method of vetting or intimidating the audience. While extreme technicality can turn both men and women away, the effects in recruitment are pronounced with female applicants due to confidence in their technical skill due to stereotypes (Correll, 2001, 2004; Margolis and Fisher, 2002).",
  quote: "\"Narrow definitions of success in tech that emphasize only technical skills and not the real-world implications of those technical skills can lower women’s confidence and interest in pursuing tech careers.\” -Wynn, Correll, Puncturing the pipeline"
}

const card10 = {
  title: "Word Choice",
  imageLink: "http://www.ed-exec.com/wp-content/uploads/2018/02/rock-star-8.jpg",
  affectsWomen: "Phrases that brag or exude confidence such as \“best of the best,\” \“ninja,\” \“rock star,\” \“world-class,\” or \“unparalleled\” can inadvertently turn certain people away in a recruitment presentation. These words can deter people who have been raised or socialized to downplay their expertise; this is the case for many women, even if they are highly qualified.",
  quote: "\"A quick search on the jobs site Indeed.com on Tuesday found more than 800 jobs listings that included the word ‘ninja.’ The word is meant to signal that a company is looking for an aggressive candidate who’s an expert in his or her field. But to most of us, a ‘ninja’ is a dude, or, more notoriously, a ‘bro.’ Indeed, going back to its origins, the traditional Japanese ninja was a man.\” Emily Peck, HuffPost"
}

const infoCards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10];


class App extends Component {
  constructor(){
    super()
    this.state = {
      presentClicked: false,
      imageLinks: []
    }
  }
  
  // ONLY ACTIVATE WHEN PRESENT IS ACTUALLY CLICKED 
  presentClicked = (newImage) => {
    console.log("PRESENT CLICKED");
    this.setState({presentClicked: true, imageLinks: this.state.imageLinks});
    console.log(this.state);
  }

  callbackForImage = (newImage) => {
    console.log("callbakc for image");
    console.log(newImage);
    const imageLinks = this.state.imageLinks.concat([newImage.imageLink]);
    console.log(imageLinks);

    this.setState({imageLinks: imageLinks, presentClicked: false});
    console.log(this.state);
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


        {/* PROTOTYPE SECTION BEGINS HERE */}=
        <Canvas 
          callbackForImage={this.callbackForImage}
        /> 

        {/* Images SECTION BEGINS HERE */}
        <div className="picturesContainer" >
          {infoCards.map((card) =>{
            const {imageLink} = card; 
            //TODO: Calculate offset, pass it in as defaultX / Y
            return (
                <Image imageLink={imageLink}
                  defaultX={0}
                  defaultY={0}
                />
            )
          })}
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
            console.log(this.state.imageLinks);
            console.log(card.imageLink);
            if (this.state.imageLinks.includes(card.imageLink)){
              return (
                <InfoCard
                {...card}
              />
              )
            }
          })}
        </div>
        }


      </div>
    );
  }
}

export const ItemTypes = {
  IMAGE: 'image'
};

export default DragDropContext(HTML5Backend)(App);
