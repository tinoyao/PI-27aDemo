import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';
import homeVideo from '../assets/home-video.mp4';

function LandingPage() {
  return (
    <div>
        <video
          width="100%"
          height="100%"
          loop
          autoPlay
          muted
          className={styles.video}
        >
          <source src={homeVideo} type="video/mp4" />
        </video>

        <div className={styles.overlay} >
          <h1>Welcome to my page!</h1>
          <Link className={styles.link} to= '/home'>
              ENTER
          </Link>
        </div>
    </div>
  )
}

export default LandingPage