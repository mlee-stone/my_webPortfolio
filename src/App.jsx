import { useCallback, useEffect, useRef, useState } from 'react';
import About from './shared/About.jsx';
import Contact from './shared/Contact.jsx';
import DesignHome from './design/Home.jsx';
import DesignProjects from './design/Projects.jsx';
import Home from './dev/Home.jsx';
import Projects from './dev/Projects.jsx';
import RecruiterDrawer from './shared/RecruiterDrawer.jsx';
import { playBeep, playSelect } from './utils/audio.js';

const screens = ['home', 'about', 'projects', 'contact'];
const initialEntries = [
    { initials: 'ACE', score: '009,999' },
    { initials: 'R2D', score: '008,400' },
    { initials: 'PIX', score: '007,250' },
];

// Stored UI preferences are optional; the fallback keeps the app usable when storage is blocked.
function readPreference(key, fallback) {
    try {
        const value = window.localStorage.getItem(key);
        return value === null ? fallback : value === 'true';
    } catch {
        return fallback;
    }
}

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('home');
    const [soundEnabled, setSoundEnabled] = useState(() => readPreference('arcade-sound', true));
    const [crtEnabled, setCrtEnabled] = useState(() => readPreference('arcade-crt', true));
    const [designerMode, setDesignerMode] = useState(() => readPreference('arcade-designer-mode', false));
    const [recruiterOpen, setRecruiterOpen] = useState(false);
    const [highScore, setHighScore] = useState(9999);
    const [leaderboard, setLeaderboard] = useState(initialEntries);
    const contactJumpRequested = useRef(false);

    // Mirror the persisted preferences into global body/theme hooks consumed by the stylesheets.
    useEffect(() => {
        document.body.classList.toggle('crt-disabled', !crtEnabled);
        try {
            window.localStorage.setItem('arcade-crt', String(crtEnabled));
        } catch {
            // The visual preference still works when storage is unavailable.
        }
    }, [crtEnabled]);

    useEffect(() => {
        document.documentElement.dataset.theme = designerMode ? 'designer' : 'programmer';
        try {
            window.localStorage.setItem('arcade-designer-mode', String(designerMode));
        } catch {
            // The selected theme still works for the current session.
        }
    }, [designerMode]);

    useEffect(() => {
        try {
            window.localStorage.setItem('arcade-sound', String(soundEnabled));
        } catch {
            // Audio can still be toggled for the current session.
        }
    }, [soundEnabled]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setRecruiterOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Run the contact jump after navigation has rendered the form.
    useEffect(() => {
        if (currentScreen !== 'contact' || !contactJumpRequested.current) return;

        const contactForm = document.querySelector('.contact-form');
        contactForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        contactForm?.querySelector('input')?.focus({ preventScroll: true });
        contactJumpRequested.current = false;
    }, [currentScreen]);

    const navigate = useCallback((screen) => {
        if (!screens.includes(screen)) return;
        setCurrentScreen(screen);
        if (soundEnabled) playSelect();
    }, [soundEnabled]);

    const goToContactForm = () => {
        contactJumpRequested.current = true;
        navigate('contact');
        // If Contact is already active, the navigation effect will not run again.
        if (currentScreen === 'contact') {
            const contactForm = document.querySelector('.contact-form');
            contactForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            contactForm?.querySelector('input')?.focus({ preventScroll: true });
            contactJumpRequested.current = false;
        }
    };

    const handleScoreSubmit = useCallback(({ initials }) => {
        const nextScore = highScore + 1;
        const nextScoreLabel = String(nextScore).padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setHighScore(nextScore);
        // Keep only the four highest recent entries in this in-memory session leaderboard.
        setLeaderboard((entries) => [
            { initials: initials.toUpperCase().slice(0, 3), score: nextScoreLabel },
            ...entries,
        ].slice(0, 4));
    }, [highScore]);

    const scoreLabel = String(highScore).padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
        <div className="arcade-shell">
            <header className="site-header">
                <div className="brand-block">
                    <a
                        className="brand-mark-link"
                        href="#home"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate('home');
                        }}
                        aria-label="Emilee's Portfolio"
                    >
                        <span className="brand-mark" aria-hidden="true">E</span>
                    </a>
                    <a
                        className="brand-name"
                        href="#home"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate('home');
                        }}
                    >
                        EMILEE STONE
                    </a>
                    <button
                        className="availability-link"
                        type="button"
                        onPointerEnter={() => soundEnabled && playBeep()}
                        onClick={goToContactForm}
                    >
                        <span className="availability-dot" aria-hidden="true" />
                        <span>AVAILABLE TO WORK</span>
                    </button>
                </div>

                <div className="header-status" aria-label={`Current high score ${scoreLabel}`}>
                    <span className="status-divider" aria-hidden="true">|</span>
                </div>

                <div className="header-controls">
                    <nav className="nav-tabs" aria-label="Main navigation">
                        {screens.map((screen) => (
                            <button
                                className="nav-tab"
                                key={screen}
                                type="button"
                                aria-current={currentScreen === screen ? 'page' : undefined}
                                onPointerEnter={() => soundEnabled && playBeep()}
                                onClick={() => navigate(screen)}
                            >
                                {designerMode && screen === 'projects' ? 'DESIGN WORK' : screen.toUpperCase()}
                            </button>
                        ))}
                    </nav>
                    <div className="utility-controls">
                        <button
                            className="theme-switch"
                            type="button"
                            role="switch"
                            aria-checked={designerMode}
                            aria-label={`Switch to ${designerMode ? 'programmer' : 'designer'} mode`}
                            onPointerEnter={() => soundEnabled && playBeep()}
                            onClick={() => setDesignerMode((enabled) => !enabled)}
                        >
                            <span className="theme-switch-label" data-active={!designerMode}>PROGRAMMER</span>
                            <span className="theme-switch-track" aria-hidden="true">
                                <span className="theme-switch-thumb" />
                            </span>
                            <span className="theme-switch-label" data-active={designerMode}>DESIGNER</span>
                        </button>
                        <button
                            className="button button--magenta button--small header-pass"
                            type="button"
                            onPointerEnter={() => soundEnabled && playBeep()}
                            onClick={() => {
                                if (soundEnabled) playSelect();
                                setRecruiterOpen(true);
                            }}
                        >
                            <span>RECRUITER PASS</span>
                            <span className="header-pass-note">[FAST RESUME]</span>
                            <span aria-hidden="true">↗</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="arcade-main">
                <div key={currentScreen} className="screen">
                    {/* The shell and navigation stay shared while each mode supplies its own home and projects. */}
                    {currentScreen === 'home' && (
                        designerMode ? (
                            <DesignHome
                                onStart={() => navigate('projects')}
                                onRecruiter={() => setRecruiterOpen(true)}
                                soundEnabled={soundEnabled}
                            />
                        ) : (
                            <Home
                                onStart={() => navigate('projects')}
                                onRecruiter={() => setRecruiterOpen(true)}
                                soundEnabled={soundEnabled}
                            />
                        )
                    )}
                    {currentScreen === 'about' && <About designerMode={designerMode} />}
                    {currentScreen === 'projects' && (
                        designerMode
                            ? <DesignProjects soundEnabled={soundEnabled} />
                            : <Projects soundEnabled={soundEnabled} />
                    )}
                    {currentScreen === 'contact' && (
                        <Contact
                            leaderboard={leaderboard}
                            onSubmit={handleScoreSubmit}
                            soundEnabled={soundEnabled}
                        />
                    )}
                </div>
            </main>

            <footer className="footer">
                <span>© EMILEE'S PORTFOLIO</span>
                <span>PRESS START TO CONTINUE <span className="blink" aria-hidden="true">_</span></span>
            </footer>

            {recruiterOpen && (
                <RecruiterDrawer
                    onClose={() => setRecruiterOpen(false)}
                    soundEnabled={soundEnabled}
                />
            )}
        </div>
    );
}