import React, { useState, useEffect } from 'react';
import Typewriter from 'components/Typewriter';
import Scrollchor from 'react-scrollchor';
import Confetti from 'react-dom-confetti';

function Hero() {

  const [headingText, setHeading] = useState('Anand Dharne')
  const [hovered, setHover] = useState(false)


  function debounce (func, wait = 200) {
    let timeoutID = null;
    return function (...args) {
      const context = this;
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        timeoutID = null; // Not strictly necessary but good to include.
        func.apply(context, args);
      }, wait);
    };
  }

  const setText = (str) => {
    setHeading(str)
    setHover(!hovered)
}

  useEffect(() => {
    setTimeout(() => {
      setText('I break \'em')
    }, 2000)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setText('Anand Dharne')
    }, 3000)
  }, []);


  return (
    <div className="hero-container">
      <Confetti active={hovered} config={{
              angle: 90,
              spread: 960,
              startVelocity: 60,
              elementCount: 30,
              dragFriction: 0.12,
              duration: 3000,
              stagger: 3,
              width: "8px",
              height: "50px",
              perspective: "-500px",
              colors: ["#747fe0"]
      }}/>
        <div onMouseOver={() => headingText === 'Anand Dharne' ? setText('I break \'em') : () => {}} onMouseLeave={() => setText('Anand Dharne')}>
          <Typewriter className="hero-title" headingText={headingText} />
        </div>
      <br></br>
      <span className='make-break'> <b> { headingText === 'Anand Dharne' ? 'I make things' : '' } </b></span>
      <div className="hero-description">
        I am a Software Front End Engineer at <a target="_blank" href="https://www.perchhq.com/"> Perch. </a>  <br />
        I have worked on all stages of the SDLC lifecycle including but not limited to Design, Planning, Test strategy, Development, Automation, User Acceptance. <br/>
        I'm proficient with Linux, predominantly Arch and Ubuntu. I am good in Javascript and Python  <br />
        I enage with the cloud using the python and node sdk and deal with various AWS services mainly; 
        <a target="_blank" href="https://aws.amazon.com/ecs/"> ECS</a>, <a target="_blank" href="https://aws.amazon.com/lambda/"> Lambdas</a>,  <a target="_blank"  href="https://aws.amazon.com/cloudformation/"> Cloudformation</a>, <a target="_blank"  href="https://aws.amazon.com/s3/"> S#</a> <a target="_blank"  href="https://aws.amazon.com/sns/"> SNS</a>, <a target="_blank"  href="https://aws.amazon.com/sqs/"> SQS</a>,<a target="_blank"  href="https://aws.amazon.com/cloudwatch/"> Cloudwatch</a>, <a target="_blank" href="https://aws.amazon.com/step-functions/"> Step functions</a>, <a target="_blank" href="https://aws.amazon.com/dynamodb"> DynamoDb</a>, <a target="_blank" href="https://aws.amazon.com/athena"> Athena</a>
        <br />Check out my{' '}
        <Scrollchor to="#projects">projects</Scrollchor> below.
      </div>
    </div>
  );
}
// class Hero extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: ' make',
//       completed: false,
//       config: {
//         angle: 90,
//         spread: 960,
//         startVelocity: 60,
//         elementCount: 30,
//         dragFriction: 0.12,
//         duration: 3000,
//         stagger: 3,
//         width: "8px",
//         height: "50px",
//         perspective: "-500px",
//         colors: ["#747fe0"]
//       },
//       headingTexts: "Anand Dharne",
//       makeBreak: 'I make things'
//     };
//     this.changeBackground = this.changeBackground.bind(this)
//     this.changebg = this.changebg.bind(this)
//     // this.headingText = React.createRef();

//   }

//   changeBackground(e) {
//     this.setState({text: ' break'})
//     this.setState({completed: true})
//     e.target.innerHTML = 'I BREAK THINGS'
//     const elem1 = document.getElementsByClassName('make-break')
//     elem1[0].innerHTML = ''
//     console.log(e.target)
//   }

//   changebg(e) {
//     this.setState({text: ' make'})
//     this.setState({completed: false})
//     e.target.innerHTML = 'ANAND DHARNE'
//     // setTimeout(() => {
//     // elem[0].style.display = 'block'
//     const elem1 = document.getElementsByClassName('make-break')
//     elem1[0].innerHTML = 'I MAKE THINGS'
//     // },250)
  
//   }

//   render() {
//     return (
//       <div className="hero-container">
//         <Confetti active={ this.state.completed } config={this.state.config}/>
//         <div ref={this.headingText} onMouseOver={this.changeBackground} onMouseLeave={this.changebg}>
//         <Typewriter className="hero-title" headingText={this.state.headingTexts} />
//         </div>
//         <br></br>
//         <span className='make-break'> <b>I MAKE THINGS</b></span>
//         <div className="hero-description">
//           I am a software professional at <a target="_blank" href="https://www.sessionm.com/"> SessionM.</a>  At my current job, I work on all stages of the SDLC lifecycle; as part of automation, setting up the test environment, developing automation frameworks, writing scripts for data generation, handling CI/CD pipelines, working with technical product owners to ensure best practices and work on development of features and bug fixes. I'm proficient with Linux, predominantly Arch and Ubuntu. I am good in Javascript and Python  <br />
//           I enage with the cloud using the sdk and deal with various AWS services mainly; <a target="_blank" href="https://aws.amazon.com/ecs/"> ECS</a>, <a target="_blank" href="https://aws.amazon.com/lambda/"> Lambdas</a>,  <a target="_blank"  href="https://aws.amazon.com/cloudformation/"> Cloudformation</a>, <a target="_blank"  href="https://aws.amazon.com/s3/"> S#</a> <a target="_blank"  href="https://aws.amazon.com/sns/"> SNS</a>, <a target="_blank"  href="https://aws.amazon.com/sqs/"> SQS</a>,<a target="_blank"  href="https://aws.amazon.com/cloudwatch/"> Cloudwatch</a>, <a target="_blank" href="https://aws.amazon.com/step-functions/"> Step functions</a>, <a target="_blank" href="https://aws.amazon.com/dynamodb"> DynamoDb</a>, <a target="_blank" href="https://aws.amazon.com/athena"> Athena</a>
//           I have also worked on integration of various messaging plugins like <a target="_blank" href="https://www.twilio.com/"> Twilio</a>, <a target="_blank" href="https://www.sendgrid.com/"> SendGrid</a>, <a target="_blank" href="https://www.cheetahmail.com/"> Cheetah Mail</a>, <span>etc and Audience export plugins like <a target="_blank" href="https://www.facebook.com/"> Fb export</a></span> 
//           <br />Check out my{' '}
//           <Scrollchor to="#projects">projects</Scrollchor> below.
//         </div>
//       </div>
//     );
//   }
// }

export default Hero;
