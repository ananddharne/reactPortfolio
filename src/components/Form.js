import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const form = document.querySelector('form');
  const formResponse = document.querySelector('js-form-response');

  form.onsubmit = e => {
    e.preventDefault();

    // Prepare data to send
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    // Log what our lambda function will receive
    console.log(JSON.stringify(data));

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
        formResponse.innerHTML = 'Thanks for the message. I’ll be in touch shortly.';
      } else {
        // The form submission failed
        alert('Something went wrong')
        console.error(JSON.parse(response.target.response).message);
      }
    };
  };
  }

  render() {
    return (
      <div id="js-form-response">
      <form action="https://e44yvqrzdi.execute-api.us-east-1.amazonaws.com/dev" method="POST">
      <label>
        Name
        <input type="text" name="name" required/>
      </label>
      <label>
        Email
        <input type="email" name="reply_to" required/>
      </label>
      <label>
        Message:
        <textarea name="message" required></textarea>
      </label>
      <button type="submit">Send Message</button>
    </form>
    <p id="js-form-response"></p>
    </div>
    )
  }
}

export default Form