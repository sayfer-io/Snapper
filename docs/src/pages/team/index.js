import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const GITHUB_REPO = 'sayfer-io/Snapper';
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contributors`;

export default function Team() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(GITHUB_API_URL, {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        });
        const data = await response.json();

        // Fetch additional user details for each contributor
        const enrichedData = await Promise.all(
          data.map(async (contributor) => {
            const userDetails = await fetchUserDetails(contributor.login);
            return { ...contributor, ...userDetails };
          })
        );

        setContributors(enrichedData);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    fetchContributors();
  }, []);

  const fetchUserDetails = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    return response.json();
  };

  const coreTeam = contributors.slice(0, 2);
  const otherContributors = contributors.slice(2);

  return (
    <Layout title="Our Team">
      <div className={styles.teamLandingPage}>
        {/* Introduction */}
        <section className={styles.introSection}>
          <h1 className={styles.title}>Meet the Team Behind Snapper</h1>
          <p>Snapper is an open-source project maintained by a dedicated team of developers and contributors.</p>
        </section>

        {/* Core Team Members */}
        <section className={styles.teamSection}>
          <h2 className={styles.subtitle}>Core Team</h2>
          <div className={styles.contributorsGrid}>
            {coreTeam.map((member) => (
              <div key={member.id} className={styles.contributorCard}>
                <img src={member.avatar_url} alt={member.login} className={styles.contributorImage} />
                <h3>{member.login}</h3>
                <p>{member.bio ? member.bio : 'Contributor'}</p>
                <p>Commits: {member.contributions}</p>
                <a href={member.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
              </div>
            ))}
          </div>
        </section>

        {/* Contributors Section */}
        <section className={styles.contributorsSection}>
          <h2 className={styles.subtitle}>Our Contributors</h2>
          <div className={styles.contributorsGrid}>
            {otherContributors.map((contributor) => (
              <div key={contributor.id} className={styles.contributorCard}>
                <img src={contributor.avatar_url} alt={contributor.login} className={styles.contributorImage} />
                <h3>{contributor.login}</h3>
                <p>{contributor.bio ? contributor.bio : 'Contributor'}</p>
                <p>Commits: {contributor.contributions}</p>
                <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
              </div>
            ))}
          </div>
        </section>

        {/* Community Involvement */}
        <section className={styles.communitySection}>
          <h2 className={styles.subtitle}>Join the Community</h2>
          <p>Interested in contributing? Join our community on <a href="https://discord.com/invite/yourproject" target="_blank">Discord</a> or <a href="https://github.com/sayfer-io/Snapper" target="_blank">GitHub</a> to start collaborating with us.</p>
        </section>
      </div>
    </Layout>
  );
}
