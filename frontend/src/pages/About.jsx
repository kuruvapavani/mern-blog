import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Me: Kuruva Pavani</h2>
      <p style={styles.intro}>Hello! I'm Kuruva Pavani, a passionate web developer on a journey to explore the digital realm. Allow me to share a glimpse into my world:</p>
      
      <h3 style={styles.subHeading}>My Journey into Web Development</h3>
      <p style={styles.paragraph}>
        <strong>Learning Enthusiast:</strong> My journey began with a deep curiosity to unravel the mysteries of web development. I embarked on this exciting path, diving into the realms of HTML, CSS, JavaScript, and Node.js.
        <br/><br/>
        <strong>Creating the Blog App:</strong> My latest project, the very blog you’re reading, stands as a testament to my dedication. I've woven together code, design, and functionality to bring this platform to life.
      </p>
      
      <h3 style={styles.subHeading}>Behind the Scenes</h3>
      <p style={styles.paragraph}>
        <strong>Tech Stack:</strong> I utilized HTML, CSS, and JavaScript for crafting the user interface. Node.js powered the backend, while MongoDB served as the database, forming the backbone of this blog.
        <br/><br/>
        <strong>Dummy Posts and Users:</strong> As part of my learning journey, I created dummy posts using the classic “Lorem Ipsum” text. These posts facilitated experimentation and skill enhancement. Additionally, I introduced dummy users to simulate interactions within the app.
        <br/><br/>
        <strong>One Week, Many Victories:</strong> It took me a week of relentless effort to shape this blog. Late-night coding sessions and debugging challenges were embraced with zeal. And now, here we are!
      </p>
      
      <h3 style={styles.subHeading}>Connect with Me</h3>
      <p style={styles.paragraph}>
        <strong><a href="https://kuruvapavani.github.io/my_portfolio/" target="_blank" rel="noopener noreferrer">Portfolio:</a></strong> Curious to explore more of my work? Head over to my portfolio for a deeper dive into my projects.
        <br/><br/>
        <strong><a href="https://www.linkedin.com/in/kuruva-pavani-10388b27b/" target="_blank" rel="noopener noreferrer">LinkedIn:</a></strong> Let's connect professionally! Find me on LinkedIn, and let's discuss all things web development.
      </p>
      
      <a href='/contact'><p style={styles.thanks}>Thank you for joining me on this journey. Whether you're a fellow developer, an avid reader, or just passing by, I'm thrilled to have you here. Kindly spare some time to review my project, motivating me to embark on more such endeavors and improve myself. If you have any suggestions or notice any mistakes, please don't hesitate to reach out.</p></a>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    animation: 'fadein 2s',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
    animation: 'slidein 1s',
  },
  intro: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '16px',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  thanks: {
    fontSize: '14px',
    fontStyle: 'italic',
    marginTop: '30px',
    animation: 'fadein 2s',
  },
  '@keyframes fadein': { 
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes slidein': { 
    from: { transform: 'translateX(-50px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
};

export default About;
