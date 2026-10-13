import { useEffect, useRef, useState } from 'react';
import { playBeep, playSelect } from '../utils/audio.js';

// Static dataset containing arcade-themed project details and multi-step walkthroughs
const projects = [
    {
        title: 'BUG TRACKER PROJECT',
        description: 'The bug tracker stores tickets and related notes. The backend exposes REST APIs for ticket retrieval, status updates, and note handling. The web frontend displays the ticket dashboard, ticket details, and notes. The mobile app is an Expo-based client that also connects to the backend and Firebase.',
        tags: ['React Native', 'Java', 'SpringBoot', 'Vite', 'Firebase'],
        art: 'CSS',
        icon: 'B',
        caption: 'FINAL STAGE',
        walkthrough: [
            {
                label: 'OVERVIEW',
                title: 'A single source of truth for issue flow',
                body: 'The bug tracker is built around the core need to capture, triage, and resolve work without losing context. The project connects front-end reporting, a web dashboard, and a mobile client to a shared backend and data layer.',
                points: ['Ticket storage with notes and status history', 'Shared backend APIs for create, read, and update actions', 'Responsive interfaces for desk and mobile workflows'],
            },
            {
                label: 'STACK',
                title: 'Modern app architecture with practical tooling',
                body: 'The project brings together a lightweight web frontend, an Expo mobile app, and a Java/Spring Boot backend. Firebase supports the app ecosystem while the web and mobile clients stay focused on a clean user experience.',
                points: ['React + Vite web experience', 'React Native mobile client for field updates', 'Java + Spring Boot for service orchestration'],
            },
            {
                label: 'PROCESS',
                title: 'Designing around clarity and speed',
                body: 'The application structure emphasizes quick visibility into active issues and a reliable path from ticket creation through resolution. The key challenge was balancing simple dashboards with enough detail for notes, owners, and status changes.',
                points: ['Clear ticket lifecycle and status visibility', 'Context-rich notes for development conversations', 'Fast navigation across the dashboard and details'],
            },
            {
                label: 'CHALLENGES',
                title: 'Keeping product surfaces consistent',
                body: 'The biggest challenge was making the web dashboard and mobile client feel like the same product even though they support different user behaviors. Shared data contracts and deliberate UI patterns keep the experiences aligned.',
                points: ['Consistent API contracts across clients', 'Cross-device clarity for issue handling', 'A focused interface without unnecessary clutter'],
            },
            {
                label: 'OUTCOME',
                title: 'A product-ready issue workflow',
                body: 'The result is a workable full-stack project that demonstrates how a bug-tracking app can unify a backend, dashboard, and mobile access in a single customer-facing workflow.',
                points: ['Issue tracking with note support', 'Independent client experiences backed by one system', 'A realistic architecture for product delivery'],
            },
        ],
    },

    {
        title: 'FLOWN THE COOP!',
        description: 'Flown the Coop! is a fast-paced, 2D runner/platformer designed for mobile devices. The player controls a furious mother hen chasing down foxes that have raided her chicken coop.',
        tags: ['C#', 'Unity', 'Blender', 'Microsoft Playfab'],
        art: 'Blender, Adobe Illustrator, Photoshop',
        icon: 'F',
        caption: 'JUST STARTED',
        walkthrough: [
            {
                label: 'OVERVIEW',
                title: 'A mobile hero-collector runner with arcade combat',
                body: 'Flown the Coop! combines the high-velocity twitch reflexes of a 2D auto-runner with the long-term roster collection and progression of a gacha meta-game. Players control furious mother hens chasing down the Fox Cartel across procedural biomes to reclaim their stolen eggs.',
                points: [
                    'Two-touch runner controls paired with cinematic "Angry Chicken" combat phases',
                    'Vintage Toy Dispenser gacha mechanic powered by a player-friendly dual-currency economy',
                    'Global Flock Mastery upgrade tree driven by character collection milestones',
                ],
            },
            {
                label: 'STACK',
                title: 'Scalable mobile architecture built for performance',
                body: 'Built on Unity (C#) for cross-platform mobile delivery, supported by Microsoft PlayFab as a Backend-as-a-Service (BaaS). PlayFab handles secure server-side RNG for gacha drops, cloud save inventories, and global leaderboard brackets without needing custom server infrastructure.',
                points: [
                    'Unity (C#) component-based 2D engine targeting iOS and Google Play Store',
                    'Microsoft PlayFab BaaS for cloud save data, leaderboards, and secure RNG',
                    'Modular prefab chunk system for procedural biome map generation and Object Pooling',
                ],
            },
            {
                label: 'PROCESS',
                title: 'Designing around game feel, pacing, and retention',
                body: 'The core loop balances casual 90-second biome sections into a structured 4.5-minute full run. Rather than breaking obstacle reaction times with raw physics velocity, speed upgrades scale Catch-Up Efficiency—allowing players to trigger Fox encounters more frequently while maintaining tight gameplay feel.',
                points: [
                    'Time-budgeted level design split across Coop, Barnyard, and Farmhouse biomes',
                    'Juiced visual speed cues including orthographic camera scaling and parallax overdrive',
                    'Optimized hot-dog-bun pricing curves ($0.99 for 5 coins; 2 coins per gacha spin)',
                ],
            },
            {
                label: 'CHALLENGES',
                title: 'Solving character progression traps and currency bloat',
                body: 'A key challenge was preventing "upgrade regret"—where pulling a new legendary chicken feels useless because the player spent all their coins on their starter bird. Pivoting to a global class-based upgrade tree made newly pulled birds instantly viable while keeping collection central to progression.',
                points: [
                    'Eliminated character-stat locks via the global Flock Mastery tree',
                    'Decoupled visual speed feel from raw physics velocity to keep obstacles reactable',
                    'Consolidated virtual economy down to two clean currencies (Copper and Gold Coins)',
                ],
            },
            {
                label: 'OUTCOME',
                title: 'A product-ready mobile GDD and system design',
                body: 'The result will be a production-ready Game Design Document and architecture blueprint, demonstrating a full-stack game development loop that merges mobile monetization best practices with modular C# game systems.',
                points: [
                    'Fully defined hero-collector runner core loop and live-ops content plan',
                    'Fair F2P monetization with reliable reward paths for non-paying players',
                    'Production-ready client/server architecture bridging Unity 2D and PlayFab',
                ],
            },
        ],
    },
];

/**
 * Modal component that displays a multi-step project walkthrough.
 * Handles keyboard navigation (Arrow keys, Escape) and accessibility traps.
 */
function ProjectWalkthrough({ project, initialStep, soundEnabled, onClose }) {
    const [activeStep, setActiveStep] = useState(initialStep);
    const closeButtonRef = useRef(null);
    const activeStepRef = useRef(activeStep);

    const step = project.walkthrough[activeStep];
    const isLastStep = activeStep === project.walkthrough.length - 1;

    // Keep ref synchronized with state for use inside event listeners
    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

    // Handle body scroll lock, focus management, and global keydown events
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
            const currentStep = activeStepRef.current;
            let nextStep;

            if (event.key === 'ArrowRight' && currentStep < project.walkthrough.length - 1) {
                nextStep = currentStep + 1;
            } else if (event.key === 'ArrowLeft' && currentStep > 0) {
                nextStep = currentStep - 1;
            }

            if (nextStep !== undefined) {
                if (soundEnabled) playSelect();
                setActiveStep(nextStep);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, project.walkthrough.length, soundEnabled]);

    // Helper function to change steps and trigger audio feedback
    const goToStep = (nextStep) => {
        if (soundEnabled) playSelect();
        setActiveStep(nextStep);
    };

    return (
        <div
            className="demo-backdrop"
            role="presentation"
            onMouseDown={(event) => {
                // Close modal if clicking outside the panel
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className="demo-panel dev-walkthrough-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="walkthrough-title"
                aria-describedby="walkthrough-copy"
            >
                {/* Topbar with title, close button, and step progress buttons */}
                <div className="dev-walkthrough-topbar">
                    <div className="dev-walkthrough-heading">
                        <div>
                            <p className="eyebrow">ARCADE CABINET // {project.tags.join(' • ')}</p>
                            <h2 className="section-heading" id="walkthrough-title">{project.title}</h2>
                        </div>
                        <button
                            ref={closeButtonRef}
                            className="button button--plain button--small"
                            type="button"
                            onClick={onClose}
                            aria-label="Close project walkthrough"
                        >
                            CLOSE
                        </button>
                    </div>

                    <div className="dev-walkthrough-progress" aria-label="Project sections">
                        {project.walkthrough.map((item, index) => (
                            <button
                                className="dev-walkthrough-step"
                                key={item.label}
                                type="button"
                                aria-current={activeStep === index ? 'step' : undefined}
                                aria-label={`Go to section ${index + 1}: ${item.label}`}
                                onClick={() => goToStep(index)}
                            >
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main walkthrough content area */}
                <div className="dev-walkthrough-content" key={step.label} aria-live="polite">
                    <div className={`project-art project-art--${project.art} dev-walkthrough-art`} aria-hidden="true">
                        <div className="art-badge"><span>{project.icon}</span></div>
                        <span className="art-caption">{project.caption}</span>
                    </div>

                    <p className="dev-walkthrough-kicker">
                        STAGE {String(activeStep + 1).padStart(2, '0')} / {String(project.walkthrough.length).padStart(2, '0')}
                    </p>
                    <h3>{step.title}</h3>
                    <p className="demo-copy" id="walkthrough-copy">{step.body}</p>
                    <ul className="dev-walkthrough-points">
                        {step.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                </div>

                {/* Modal footer navigation buttons */}
                <div className="demo-footer dev-walkthrough-footer">
                    <button
                        className="button button--plain button--small"
                        type="button"
                        disabled={activeStep === 0}
                        onClick={() => goToStep(activeStep - 1)}
                    >
                        PREVIOUS
                    </button>
                    {isLastStep ? (
                        <button className="button button--small" type="button" onClick={onClose}>
                            FINISH WALKTHROUGH
                        </button>
                    ) : (
                        <button
                            className="button button--small"
                            type="button"
                            onClick={() => goToStep(activeStep + 1)}
                        >
                            NEXT: {project.walkthrough[activeStep + 1].label}
                        </button>
                    )}
                </div>
                <p className="dev-walkthrough-hint">TIP: USE ← AND → TO MOVE BETWEEN SECTIONS</p>
            </section>
        </div>
    );
}

/**
 * Main Projects component rendering the grid of available arcade cabinets (projects)
 * and managing the active state for the project walkthrough modal.
 */
export default function Projects({ soundEnabled }) {
    const [activeProject, setActiveProject] = useState(null);

    // Opens a project modal, optionally specifying a starting step
    const openProject = (project, initialStep = 0) => {
        if (soundEnabled) playSelect();
        setActiveProject({ project, initialStep });
    };

    return (
        <section aria-labelledby="projects-title">
            <p className="eyebrow">PROJECT TERMINAL // {projects.length} {projects.length === 1 ? 'CABINET' : 'CABINETS AVAILABLE'}</p>
            <h1 className="section-heading" id="projects-title">ARCADE CABINETS</h1>
            <p className="section-lede">Select a project to explore the system architecture, design rationale, and technical engineering behind it.</p>

            {/* Grid of project cards */}
            <div className="projects-grid">
                {projects.map((project) => (
                    <article className="project-card" key={project.title}>
                        <div className={`project-art project-art--${project.art}`} aria-hidden="true">
                            <div className="art-badge"><span>{project.icon}</span></div>
                            <span className="art-caption">{project.caption}</span>
                        </div>
                        <div className="project-content">
                            <h2 className="project-title">{project.title}</h2>
                            <p className="project-description">{project.description}</p>
                            <div className="tag-list" aria-label="Technology stack">
                                {project.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}
                            </div>
                            <div className="project-actions">
                                <button
                                    className="button button--small"
                                    type="button"
                                    onPointerEnter={() => soundEnabled && playBeep()}
                                    onClick={() => openProject(project)}
                                >
                                    VIEW PROJECT
                                </button>
                                <button
                                    className="button button--plain button--small"
                                    type="button"
                                    onPointerEnter={() => soundEnabled && playBeep()}
                                    onClick={() => openProject(project, project.walkthrough.length - 1)}
                                >
                                    LEARN MORE
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Conditionally render the walkthrough modal if a project is selected */}
            {activeProject && (
                <ProjectWalkthrough
                    project={activeProject.project}
                    initialStep={activeProject.initialStep}
                    soundEnabled={soundEnabled}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </section>
    );
}