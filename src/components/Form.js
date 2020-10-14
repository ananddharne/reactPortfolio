import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const form = document.querySelector('form');
  // const formResponse = document.querySelector('js-form-response');

  form.onsubmit = e => {
    e.preventDefault();

    // Prepare data to send
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    console.log(JSON.stringify(data));
    console.log(data)
    // Construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    // Callback function
    xhr.onloadend = response => {
      if (response.target.status === 200) {
        // The form submission was successful
        form.reset();
        // formResponse.innerHTML = 'Thanks for the message. I’ll be in touch shortly.';
      } else {
        form.reset();
        // The form submission failed
        alert('Something went wrong')
        console.error(JSON.parse(response.target.response).message);
      }
    };
  };
  }

  render() {
    return (
      // <div id="js-form-response">
      <form action="https://hz03bsqszl.execute-api.us-east-1.amazonaws.com/default/serverlessAppFunction" method="POST">
        <p>Contact me via a serverless lambda hosted on aws!</p>
      <label style={{marginRight: '2px'}}>
        Name:
        <input style={{marginRight: '20px'}} type="text" name="name" required/>
      </label>
      <label style={{marginRight: '2px'}}>
        Email:
        <input style={{marginRight: '20px'}} type="email" name="reply_to" required/>
      </label>
      <label style={{marginRight: '2px'}}>
        Message:
        <textarea style={{marginRight: '20px'}} name="message" required></textarea>
      </label>
      <button type="submit">Send Message</button>
    </form>
    )
  }
}

export default Form