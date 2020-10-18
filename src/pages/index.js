import React from 'react';

import Navbar from 'components/Navbar';
import Hero from 'components/Hero';
import About from 'components/About';
import Projects from 'components/Projects';
import ContactLinks from 'components/ContactLinks';
import Footer from 'components/Footer';

import LogRocket from 'logrocket';

import projects from 'content/projects';
import statements from 'content/about-me';

export default class Home extends React.PureComponent {

  componentDidMount() {
    LogRocket.init('bnhdul/anand-dharne');

    LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
        name: 'Anand D',
        email: 'add@gmail.com',
      
        // Add your own custom user variables here, ie:
        subscriptionType: 'pro'
      });
  }


  render() {
    return (
      <div className="home-container">
        <Navbar />
        <Hero />
        <About statements={statements} />
        <h2 id="projects" className="section-title">
          Projects
        </h2>
        <Projects projects={projects} />
        <div className="background" />
        <h2 id="contact" className="section-title">
          Contact me!
        </h2>
        <ContactLinks />
        <Footer />
      </div>
    );
  }
}
