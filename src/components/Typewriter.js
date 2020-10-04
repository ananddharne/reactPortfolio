import React from 'react';

class Typewriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headingText: '',
    };
  }

  clicketyClack(text, minTypeSpeed, maxTypeSpeed, initDelay) {
    let str = '';
    let typeSpeed = 0;
    const self = this;

    text.split('').forEach(c => {
      typeSpeed += Math.random() * (maxTypeSpeed - minTypeSpeed) + minTypeSpeed;
      setTimeout(() => {
        str += c;
        this.setState({ headingText: str });
      }, initDelay + typeSpeed);
    });
  }

  componentDidMount() {
    this.clicketyClack(
      this.props.headingText,
      this.props.minTypeSpeed,
      this.props.maxTypeSpeed,
      this.props.initDelay
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.state.headingText}
        <span>&nbsp;</span>
        <br></br>
        <p style={{marginLeft: '285px', fontSize: '27px', marginTop: '50px'}}>I make things!</p>
      </div>
    );
  }
}

Typewriter.defaultProps = {
  headingText: 'Give me something to type!',
  minTypeSpeed: 50,
  maxTypeSpeed: 90,
  initDelay: 700,
};

export default Typewriter;
