import React, {useState, useEffect} from 'react';

function Typewriter (props) {
const { headingText, minTypeSpeed = 10, maxTypeSpeed = 50, initDelay = 0, className } = props

  const [hState, setHeading] = useState('')
  function clicketyClack(text, minTypeSpeed, maxTypeSpeed, initDelay) {
    let str = '';
    console.log(minTypeSpeed)
    let typeSpeed = 0;
    console.log(text)
    text.split('').forEach(c => {
      typeSpeed += Math.random() * (maxTypeSpeed - minTypeSpeed) + minTypeSpeed;
      setTimeout(() => {
        str += c;
       setHeading(str)
      }, initDelay + typeSpeed);
    });
  }

  

  useEffect(() => {
    clicketyClack(
      headingText || 'I break things',
      minTypeSpeed,
      maxTypeSpeed,
      initDelay
    );
  }, [headingText]);

    return (
      <div className={className}>
        {hState}
        {/* <p style={{marginLeft: '285px', fontSize: '27px', marginTop: '50px'}}>I make things!</p> */}
      </div>
    );
}

export default Typewriter;
