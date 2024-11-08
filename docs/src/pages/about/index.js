import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function About() {
  return (
    <Layout title="About Snapper">
      <div className={styles.aboutPage}>
        
        {/* Project Overview */}
        <section className={styles.section}>
          <h1 className={styles.title}>About Snapper</h1>
          <p>Snapper is an open-source tool designed to simplify and enhance your workflow. Our project empowers users by providing innovative, customizable tools that adapt to their needs.</p>
        </section>
        
        {/* Mission and Vision */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Mission and Vision</h2>
          <div className={styles.textBox}>
            <p><strong>Mission:</strong> To empower developers with accessible, open-source tools that foster collaboration and innovation.</p>
            <p><strong>Vision:</strong> To be the leading tool in X by making technology accessible to everyone.</p>
          </div>
        </section>

        {/* Project History */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Project History</h2>
          <p>Founded in 2023, Snapper was created to address the lack of customizable and powerful open-source solutions in our domain. Since then, we've grown with the support of our community and contributors worldwide.</p>
        </section>
        
        {/* Core Values */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Core Values</h2>
          <ul className={styles.valueList}>
            <li><strong>Collaboration:</strong> We believe in building together.</li>
            <li><strong>Transparency:</strong> Our process is open and transparent.</li>
            <li><strong>Innovation:</strong> Constantly improving to meet user needs.</li>
          </ul>
        </section>

        {/* Key Features */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Key Features</h2>
          <ul className={styles.featureList}>
            <li>Open-source and free to use</li>
            <li>Customizable and flexible</li>
            <li>Strong community support</li>
          </ul>
        </section>

        {/* Meet the Team */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Meet the Team</h2>
          <p>Our team is a group of passionate developers, designers, and community builders dedicated to maintaining and growing Snapper. <a href="/team">Learn more about our team here.</a></p>
        </section>

        {/* Community and Contributors */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Community and Contributors</h2>
          <p>Our project thrives on contributions from people all over the world. Join our community on <a href="https://discord.com/invite/yourproject" target="_blank" rel="noopener noreferrer">Discord</a> or start contributing on <a href="https://github.com/sayfer-io/Snapper" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        </section>

        {/* How to Get Involved */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>How to Get Involved</h2>
          <p>We welcome contributions! You can start by checking out the <a href="/contributing">contribution guide</a>, reporting issues, or joining discussions on <a href="https://discord.com/invite/yourproject" target="_blank" rel="noopener noreferrer">Discord</a>.</p>
        </section>

        {/* Future Plans / Roadmap */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Future Plans</h2>
          <p>We’re working on adding XYZ features in the upcoming months. Check out our <a href="/roadmap">roadmap</a> for more details.</p>
        </section>

        {/* Contact Information */}
        <section className={styles.section}>
          <h2 className={styles.subtitle}>Contact Us</h2>
          <p>Have questions? Reach out via our <a href="/contact">Contact Page</a> or join our community on <a href="https://discord.com/invite/yourproject" target="_blank" rel="noopener noreferrer">Discord</a>.</p>
        </section>

      </div>
    </Layout>
  );
}
