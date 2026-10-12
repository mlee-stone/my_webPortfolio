import { useEffect, useRef, useState } from 'react';
import { playBeep, playSelect } from '../utils/audio.js';

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
];

function ProjectWalkthrough({ project, initialStep, soundEnabled, onClose }) {
    const [activeStep, setActiveStep] = useState(initialStep);
    const closeButtonRef = useRef(null);
    const activeStepRef = useRef(activeStep);
    const step = project.walkthrough[activeStep];
    const isLastStep = activeStep === project.walkthrough.length - 1;

    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

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

    const goToStep = (nextStep) => {
        if (soundEnabled) playSelect();
        setActiveStep(nextStep);
    };

    return (
        <div
            className="demo-backdrop"
            role="presentation"
            onMouseDown={(event) => {
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

export default function Projects({ soundEnabled }) {
    const [activeProject, setActiveProject] = useState(null);

    const openProject = (project, initialStep = 0) => {
        if (soundEnabled) playSelect();
        setActiveProject({ project, initialStep });
    };

    return (
        <section aria-labelledby="projects-title">
            <p className="eyebrow">SELECT YOUR GAME // {projects.length} {projects.length === 1 ? 'CABINET' : 'CABINETS AVAILABLE'}</p>
            <h1 className="section-heading" id="projects-title">ARCADE CABINETS</h1>
            <p className="section-lede">Pick a cabinet to preview a build, the ideas behind it, and the tech powering the game.</p>

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