import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import LoadingAnimation from '../components/Loader';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const service = process.env.REACT_APP_EMAILJS_USER_ID;
  const template = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const key = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(service, template, e.target, key);
      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAnimation />;

  return (
    <form onSubmit={handleSubmit} className="container mt-5 d-flex flex-column align-items-center ">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" style={{ width: '300px' }} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" style={{ width: '300px' }} required />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message:</label>
        <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" style={{ height: '200px', width: '300px' }} required />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '300px' }}>Send</button>
    </form>
  );
};

export default Contact;
