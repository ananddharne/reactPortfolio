import React from 'react';
import Typewriter from 'components/Typewriter';
import Scrollchor from 'react-scrollchor';

class Hero extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hero-container">
        <Typewriter className="hero-title" headingText="Anand Dharne" />
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
