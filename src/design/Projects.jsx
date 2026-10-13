import { useEffect, useRef, useState } from 'react';
import { playBeep, playSelect } from '../utils/audio.js';

// Content for the design portfolio section. Each item defines the project narrative,
// supporting imagery, and the ordered case-study steps shown in the walkthrough.
const projects = [
]

// A guided case-study modal that exposes project thinking in a readable, step-by-step flow.
// The active-step ref keeps keyboard navigation in sync without re-registering its listener per keypress.
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
        // Freeze the page behind the modal so the walkthrough feels like a focused review experience.
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        // Arrow keys move through the case-study story, while Escape closes the interaction.
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

    // Move between walkthrough sections while keeping the UI state and sound feedback in sync.
    const goToStep = (nextStep) => {
        if (soundEnabled) playSelect();
        setActiveStep(nextStep);
    };

    return (
        <div
            className="demo-backdrop design-walkthrough"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className="demo-panel design-walkthrough-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="walkthrough-title"
                aria-describedby="walkthrough-copy"
            >
                <div className="design-walkthrough-topbar">
                    <div className="design-walkthrough-heading">
                        <div>
                            <p className="eyebrow">DESIGN CASE STUDY // {project.category}</p>
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

                    <div className="design-walkthrough-progress" aria-label="Case study sections">
                        {project.walkthrough.map((item, index) => (
                            <button
                                className="design-walkthrough-step"
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

                <div className="design-walkthrough-content" key={step.label} aria-live="polite">
                    {activeStep === 0 && (
                        <img
                            className="design-walkthrough-image"
                            src={project.image}
                            alt={project.imageAlt}
                        />
                    )}
                    <p className="design-walkthrough-kicker">
                        STAGE {String(activeStep + 1).padStart(2, '0')} / {String(project.walkthrough.length).padStart(2, '0')}
                    </p>
                    <h3>{step.title}</h3>
                    <p className="demo-copy" id="walkthrough-copy">{step.body}</p>
                    <ul className="design-walkthrough-points">
                        {step.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                </div>

                <div className="demo-footer design-walkthrough-footer">
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
                <p className="design-walkthrough-hint">TIP: USE ← AND → TO MOVE BETWEEN SECTIONS</p>
            </section>
        </div>
    );
}

export default function DesignProjects({ soundEnabled }) {
    const [activeProject, setActiveProject] = useState(null);

    // Select which case study to open; the second button can jump directly to the final reflection.
    const openProject = (project, initialStep = 0) => {
        if (soundEnabled) playSelect();
        // Learn More skips directly to the closing reflection; View Project begins at the overview.
        setActiveProject({ project, initialStep });
    };

    // Render the project library and open a detailed walkthrough when a card is selected.
    return (
        <section aria-labelledby="design-projects-title">
            <p className="eyebrow">SELECT A PROJECT // {projects.length} {projects.length === 1 ? 'CASE STUDY' : 'CASE STUDIES'}</p>
            <h1 className="section-heading" id="design-projects-title">GRAPHIC DESIGN PROJECTS</h1>
            <p className="section-lede">Explore the medium, process, tools, and thinking behind each design direction.</p>

            <div className="design-projects-grid">
                {projects.map((project) => (
                    <article className="project-card design-project-card" key={project.title}>
                        <div className="design-project-image-wrap">
                            <img
                                className="design-project-image"
                                src={project.image}
                                alt={project.imageAlt}
                                loading="lazy"
                            />
                            <div className="design-project-badge" aria-hidden="true">
                                <span>{project.icon}</span>
                            </div>
                            <span className="design-project-caption">{project.caption}</span>
                        </div>
                        <div className="project-content">
                            <p className="design-project-category">{project.category}</p>
                            <h2 className="project-title">{project.title}</h2>
                            <p className="project-description">{project.description}</p>
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
