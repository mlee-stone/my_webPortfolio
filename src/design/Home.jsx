import { playBeep } from '../utils/audio.js';

export default function DesignHome({ onStart, onRecruiter, soundEnabled }) {
    return (
        <section className="home-screen" aria-labelledby="design-hero-title">
            <div className="hero design-hero">
                <div className="hero-copy">
                    <p className="hero-kicker"><span className="status-dot" /> OPEN TO CREATIVE COLLABORATIONS</p>
                    <h1 className="hero-title" id="hero-title">
                        EMILEE STONE
                        <span>PORTFOLIO</span>
                        <span>2026</span>
                    </h1>
                    <p className="design-role">GRAPHIC DESIGNER</p>
                    <p className="hero-subtitle">
                        Thoughtful visuals, playful details, and identities made to leave a lasting impression.
                    </p>
                    <div className="hero-actions">
                        <button
                            className="button button--gold insert-coin"
                            type="button"
                            onClick={onStart}
                        >
                            EXPLORE DESIGN WORK
                        </button>
                        <button
                            className="button button--plain design-resume-button"
                            type="button"
                            onPointerEnter={() => soundEnabled && playBeep()}
                            onClick={onRecruiter}
                        >
                            QUICK RESUME
                        </button>
                    </div>
                    <p className="hero-hint">BRAND IDENTITY · EDITORIAL · PRINT</p>
                </div>

                {/* The hero illustration is built from CSS shapes so it needs no external artwork. */}
                <div className="design-hero-art" role="img" aria-label="Pixel art pencil writing on a sheet of paper">
                    <div className="paper-sheet" aria-hidden="true">
                        <span className="paper-line" />
                        <span className="paper-line paper-line--short" />
                        <span className="paper-spark paper-spark--one">✦</span>
                        <span className="paper-spark paper-spark--two">✧</span>
                    </div>
                    <div className="pixel-pencil" aria-hidden="true">
                        <span className="pencil-body" />
                        <span className="pencil-tip" />
                        <span className="pencil-eraser" />
                    </div>
                    <span className="pencil-caption" aria-hidden="true">IDEAS IN PROGRESS</span>
                </div>
            </div>

            <div className="home-features">
                <button
                    className="feature-card design-feature-card"
                    type="button"
                    onPointerEnter={() => soundEnabled && playBeep()}
                    onClick={onRecruiter}
                >
                    <span className="feature-icon" aria-hidden="true">30</span>
                    <span className="design-feature-copy">
                        <span className="feature-title">QUICK RESUME</span>
                        <span className="feature-description">The creative toolkit, strengths, and highlights—at a glance.</span>
                        <span className="design-feature-action">OPEN FAST PASS ↗</span>
                    </span>
                </button>
                <button
                    className="feature-card design-feature-card"
                    type="button"
                    onClick={onStart}
                >
                    <span className="feature-icon design-feature-icon" aria-hidden="true">✦</span>
                    <span className="design-feature-copy">
                        <span className="feature-title">DESIGN PROJECTS</span>
                        <span className="feature-description">Explore visual identities, editorial ideas, and creative concepts.</span>
                        <span className="design-feature-action">BROWSE PROJECTS ↗</span>
                    </span>
                </button>
            </div>
        </section>
    );
}
