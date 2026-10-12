import { playBeep } from '../utils/audio.js';

export default function Home({ onStart, onRecruiter, soundEnabled }) {
    return (
        <section className="home-screen" aria-labelledby="hero-title">
            <div className="hero">
                <div className="hero-copy">
                    <p className="hero-kicker"><span className="status-dot" /> PLAYER ONE ONLINE</p>
                    <h1 className="hero-title" id="hero-title">
                        EMILEE STONE
                        <span>PORTFOLIO</span>
                        <span>2026</span>
                    </h1>
                    <p className="dev-role">SOFTWARE ENGINEER</p>
                    <p className="hero-subtitle">
                        Full-stack engineer. Pixel enthusiast. Here to build the next level.
                    </p>
                    <div className="hero-actions">
                        {/* These callbacks let the app shell handle navigation and the shared resume drawer. */}
                        <button
                            className="button button--gold insert-coin"
                            type="button"
                            onClick={onStart}
                        >
                            EXPLORE DEV WORK
                        </button>
                        <button
                            className="button button--plain dev-resume-button"
                            type="button"
                            onClick={onRecruiter}
                        >
                            QUICK RESUME
                        </button>
                    </div>
                    <p className="hero-hint">REACT · FULL-STACK · GAME DEV</p>
                </div>

                <div className="hero-art" aria-hidden="true">
                    <div className="art-orbit" />
                    <div className="pixel-sun">
                        <div className="pixel-ship" />
                    </div>
                </div>
            </div>

            <div className="home-features">
                <article className="feature-card">
                    <div className="feature-icon" aria-hidden="true">30</div>
                    <div>
                        <h3>CONTACT ME</h3>
                        <p>The essential stats, power-ups, and experience at a glance. Recruiter speedrun ready.</p>
                    </div>
                    <button
                        className="button"
                        type="button"
                        OnClick
                    >
                        REACH OUT
                    </button>
                </article>
                <article className="feature-card">
                    <div className="feature-icon" aria-hidden="true">▶</div>
                    <div>
                        <h3>INTERACTIVE ARCADE CABINETS</h3>
                        <p>Projects are playable builds. Pick a cabinet, press start, and explore the work.</p>
                    </div>
                </article>
            </div>
        </section>
    );
}
