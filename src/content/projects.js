import notesapp from 'images/notesapp.png';
import simon from 'images/simon.png';
import test from 'images/test.png';
import devops from 'images/devops.png';
import calculator from 'images/calculator.jpg';
import portfolio from 'images/portfolio.png';
import tomsmetal from 'images/tomsmetal.jpg';

// image can be any size. just make sure it is close to a 1:1 ratio - a square.

export default [
  {
    title: 'SmartNotes',
    description:
      'Basic functionality of a simple notes app but a tad bit smart. I plan to add a rich text editor next for notes editing',
    skills: ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'ES6', 'VueJS', 'vuex', 'Nodejs', 'Firebase'],
    image: notesapp,
    links: {
      github: 'https://github.com/ananddharne/smartNotes',
      preview: 'https://notesapp-6547c.firebaseapp.com/',
    },
  },
  {
    title: 'Simon Game',
    description:
      'This project is a simple game widely played by children as a memory game. One of the first projects that I built in Vue.',
    skills: ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'ES6', 'VueJS'],
    image: simon,
    links: {
      github: 'https://github.com/ananddharne/simon-game',
      preview: 'https://simongameanand.netlify.com/',
    },
  },
  {
    title: 'Portfolio',
    description:
      'This page! Responsive website built with ReactJS. The site content is passed in as JSON data, auto-generating components for easy maintenance.',
    skills: ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'ReactJS'],
    image: portfolio,
    links: {
      github: 'https://github.com/ananddharne/reactPortfolio',
      preview: 'https://adharne.netlify.com/',
    },
  },
  {
    title: 'Test setup and configuration',
    description:
      'This project was a part of my current job. I was responsible for setting up and configuring the front-end test environemnt. There were no tests written for the front-end when I joined. Had to set up the test framework Jest from scratch. I cannot display a demo for obvious reasons, but I have attached aa video to demonstrate usage',
    skills: ['Test framework setup', 'Webpack-test-configuration', 'Testcafe', 'Jest', 'vue-test-utils'],
    image: test,
    links: {
      github: 'https://github.com/vai0/portfolio',
      preview: 'https://www.hippovideo.io/video/play/YbT0z7y8ZhHR738wvFP39wV0dgygBfgsJXcCfqdBwH8',
    },
  },
  {
    title: 'CI/CD Automation and Deployment',
    description:
      'Worked with various CI clients like CircleCI, GitlabCI, JenkinsCI. Helped setup a standalone version of GitlabCI for our automation pipelines. Since I handle the test frameworks, my job was also to oversee QA Automation and deployment i.e make sure there are no broken tests on deploy, fix tests if any found broken and so on.',
    skills: ['CI/CD - Devops tooling', 'Docker', 'Google Cloud', 'Traefik'],
    image: devops,
    links: {
      github: '',
      preview: '',
    },
  }
];
