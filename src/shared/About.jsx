const programmingSkills = [
    { name: 'React', value: 95 },
    { name: 'JavaScript', value: 90 },
    { name: 'CSS / Canvas', value: 85 },
    { name: 'Node.js', value: 80 },
];

const designSkills = [
    { name: 'Adobe Illustrator', value: 95 },
    { name: 'Adobe Photoshop', value: 80 },
    { name: 'Adobe InDesign', value: 90 },
    { name: 'Figma', value: 75 },
    { name: 'Typography', value: 90 },
    { name: 'Layout & Composition', value: 95 },
    { name: 'UX/UI & Web Design', value: 90 },
];

export default function About({ designerMode = false }) {
    // Keep both profiles in the same layout while swapping their copy and skill data by mode.
    const skills = designerMode ? designSkills : programmingSkills;

    return (
        <section className="screen-content" aria-labelledby="about-title">
            <p className="eyebrow">{designerMode ? 'CREATIVE PROFILE // LEVEL SELECT' : 'PLAYER DATA // LEVEL SELECT'}</p>
            <h1 className="section-heading" id="about-title">CHARACTER PROFILE</h1>
            <p className="section-lede">
                {designerMode
                    ? 'A visual storyteller drawn to expressive typography, thoughtful identities, and the details that make a design feel alive.'
                    : 'A curious builder with a soft spot for sharp interfaces and satisfying interactions.'}
            </p>

            <div className="profile-layout">
                <article className="panel profile-card">
                    <div className="profile-portrait" aria-label="Pixel character portrait">
                        <div className="portrait-avatar" aria-hidden="true">P1</div>
                        <span className="portrait-label">PLAYER 01</span>
                    </div>
                    <h2 className="profile-name">{designerMode ? 'EMILEE STONE' : 'PLAYER ONE'}</h2>
                    <dl>
                        <div className="profile-stat">
                            <dt>PLAYER LEVEL</dt>
                            <dd><span className="high-score">99</span></dd>
                        </div>
                        <div className="profile-stat">
                            <dt>CLASS</dt>
                            <dd>{designerMode ? 'Graphic Designer' : 'Full-Stack Engineer'}</dd>
                        </div>
                        <div className="profile-stat">
                            <dt>SPECIALTY</dt>
                            <dd>{designerMode ? 'Flyers, Social Media Content, Print Advertising, Digital Advertising, and Web Graphics' : 'React &amp; Game Dev'}</dd>
                        </div>
                        <div className="profile-stat">
                            <dt>STATUS</dt>
                            <dd><span className="high-score">{designerMode ? 'READY TO CREATE' : 'READY TO BUILD'}</span></dd>
                        </div>
                    </dl>
                </article>

                <div className="panel skill-panel">
                    <h2 className="panel-label"><span>{designerMode ? 'CREATIVE TOOLKIT' : 'SKILL TREE'}</span><span>XP: MAX</span></h2>
                    {skills.map(({ name, value }) => (
                        <div className="skill-row" key={name}>
                            <div className="skill-meta">
                                <span>{name}</span>
                                <span className="skill-percent">{value}%</span>
                            </div>
                            <div
                                className="skill-track"
                                role="meter"
                                aria-label={`${name} skill`}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-valuenow={value}
                            >
                                <div className="skill-fill" style={{ width: `${value}%` }} />
                            </div>
                        </div>
                    ))}
                    <p className="profile-note">
                        {designerMode
                            ? 'I turn ideas into clear, characterful visual systems—from the first sketch to the final print-ready detail.'
                            : 'I turn ideas into responsive, accessible experiences—then add a little extra polish to make them memorable.'}
                    </p>
                </div>
            </div>
        </section>
    );
}