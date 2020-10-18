import React from 'react';
import Typewriter from 'components/Typewriter';
import Scrollchor from 'react-scrollchor';
// import Confetti from 'react-confetti'
import Confetti from 'react-dom-confetti';


class Hero extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: ' make',
      completed: false,
      config: {
        angle: 90,
        spread: 960,
        startVelocity: 60,
        elementCount: 20,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: "8px",
        height: "50px",
        perspective: "-500px",
        colors: ["#747fe0"]
      },
      headingTexts: "Anand Dharne",
      makeBreak: 'I make things'
    };
    this.changeBackground = this.changeBackground.bind(this)
    this.changebg = this.changebg.bind(this)
    // this.headingText = React.createRef();

  }

  changeBackground(e) {
    this.setState({text: ' break'})
    this.setState({completed: true})
    // this.headingText.style.display = 'none'
    // const elem = document.getElementsByClassName('hero-title')
    // elem[0].style.display = 'none'
    e.target.innerHTML = 'I BREAK THINGS'
    const elem1 = document.getElementsByClassName('make-break')
    elem1[0].innerHTML = ''
    console.log(e.target)
    // e.stopPropogation()
  }

  changebg(e) {
    this.setState({text: ' make'})
    this.setState({completed: false})
    e.target.innerHTML = 'ANAND DHARNE'
    // const elem = document.getElementsByClassName('hero-title')
    setTimeout(() => {
    // elem[0].style.display = 'block'
    const elem1 = document.getElementsByClassName('make-break')
    elem1[0].innerHTML = 'I MAKE THINGS'
    },250)
  
  }

  render() {
    return (
      <div className="hero-container">
        <Confetti active={ this.state.completed } config={this.state.config}/>
        <div ref={this.headingText} id="s" onMouseOver={this.changeBackground} onMouseLeave={this.changebg}>
        <Typewriter className="hero-title" headingText={this.state.headingTexts} />
        </div>
        <br></br>
        <span className='make-break' style={{fontSize: '24px', textAlign: 'center', color: "#747fe0" }}> <b>I MAKE THINGS</b></span>
        <div className="hero-description">
          I am a web developer leaning towards full stack development at <a href="https://www.gethappie.me/"> Happie.</a> My passion is building simple,
          beautiful user experiences. At my current job, I work on all stages of the SDLC lifecycle; as part of QA automation, setting up the test environment, writing tests and handling CI/CD pipelines. Work with dockers and sporadically with gcr(google cloud registry) to maintain and configure images. I am proficient with Linux, predominantly Arch and Ubuntu. <br />Check out my{' '}
          <Scrollchor to="#projects">projects</Scrollchor> below.
        </div>
      </div>
    );
  }
}

export default Hero;
