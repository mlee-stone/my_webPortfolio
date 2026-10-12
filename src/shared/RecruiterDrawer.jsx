import { useEffect, useRef } from 'react';
import { playBeep, playCoin } from '../utils/audio.js';

export default function RecruiterDrawer({ onClose, soundEnabled }) {
    const closeButtonRef = useRef(null);

    useEffect(() => {
        closeButtonRef.current?.focus();
    }, []);

    function printResume() {
        if (soundEnabled) playCoin();
        // Let the browser's print dialog handle saving the resume as a PDF.
        window.print();
    }

    return (
        <div
            className="drawer-backdrop"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <aside
                className="recruiter-drawer"
                role="dialog"
                aria-modal="true"
                aria-labelledby="recruiter-title"
            >
                <div className="drawer-top">
                    <div>
                        <p className="eyebrow">FAST PASS // 30-SECOND READ</p>
                        <h2 className="drawer-title" id="recruiter-title">PLAYER ONE<br />QUICK STATS</h2>
                        <p className="drawer-subtitle">Full-Stack Engineer · Level 99</p>
                    </div>
                    <button
                        className="drawer-close"
                        type="button"
                        ref={closeButtonRef}
                        aria-label="Close recruiter pass"
                        onPointerEnter={() => soundEnabled && playBeep()}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <p className="drawer-summary">
                    Product-minded engineer focused on React, JavaScript, and polished interactive experiences. I build responsive interfaces, connect them to dependable backends, and sweat the details that make software feel great.
                </p>

                <section className="drawer-section">
                    <h3>POWER-UPS</h3>
                    <ul>
                        <li>React UI architecture and component systems</li>
                        <li>JavaScript, CSS, Canvas, and Web Audio</li>
                        <li>Node.js foundations and API integration</li>
                        <li>Responsive, accessible, interaction-rich frontend</li>
                    </ul>
                </section>

                <section className="drawer-section">
                    <h3>PLAYER STATS</h3>
                    <p>Class: Full-Stack Engineer<br />Specialty: React &amp; Game Dev<br />Availability: Ready for the next level</p>
                </section>

                <button
                    className="button button--gold button--wide"
                    type="button"
                    onPointerEnter={() => soundEnabled && playBeep()}
                    onClick={printResume}
                >
                    DOWNLOAD PDF RESUME
                </button>
                <p className="resume-note">
                    Opens your browser’s print dialog. Choose “Save as PDF” to download a copy.
                </p>
            </aside>
        </div>
    );
}
