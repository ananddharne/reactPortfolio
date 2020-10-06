import React from 'react';
import Form from 'components/Form'

class ContactLinks extends React.PureComponent {
  render() {
    return (
      <div>
      <Form/>
      <div className="contact-links">
        <span>
          <a rel="noopener" target="_blank" href="mailto:dharneanand92@gmail.com">
            dharneanand92@gmail.com
          </a>
        </span>
        <span>
          <a
            rel="noopener"
            target="_blank"
            href="https://www.linkedin.com/in/ananddharne/"
          >
            LinkedIn
          </a>
        </span>
        <span>
          <a rel="noopener" target="_blank" href="https://github.com/ananddharne">
            github
          </a>
        </span>
      </div>
      </div>
    );
  }
}

export default ContactLinks;
