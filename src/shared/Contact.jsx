import { useState } from 'react';
import { playBeep, playCoin } from '../utils/audio.js';

export default function Contact({ leaderboard, onSubmit, soundEnabled }) {
    const [submittedInitials, setSubmittedInitials] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const initials = String(formData.get('initials') || '').trim();
        // Submission updates the local arcade leaderboard only; this demo has no server endpoint.
        onSubmit({ initials });
        setSubmittedInitials(initials.toUpperCase().slice(0, 3));
        if (soundEnabled) playCoin();
        event.currentTarget.reset();
    }

    return (
        <section aria-labelledby="contact-title">
            <p className="eyebrow">PLAYER 2 // READY TO CONNECT?</p>
            <h1 className="section-heading" id="contact-title">ENTER HIGH SCORE</h1>
            <p className="section-lede">Send a message to start a conversation. The next great collaboration could be one coin away.</p>

            <div className="contact-layout">
                <form className="panel contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label className="form-label" htmlFor="initials">INITIALS / NAME</label>
                        <input
                            className="form-input"
                            id="initials"
                            name="initials"
                            placeholder="PLAYER ONE"
                            autoComplete="name"
                            maxLength="32"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="email">PLAYER EMAIL</label>
                        <input
                            className="form-input"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="PLAYER@ARCADE.COM"
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="message">MESSAGE</label>
                        <textarea
                            className="form-input"
                            id="message"
                            name="message"
                            placeholder="INSERT YOUR MESSAGE..."
                            minLength="8"
                            maxLength="1500"
                            required
                        />
                    </div>
                    <button
                        className="button button--gold button--wide"
                        type="submit"
                        onPointerEnter={() => soundEnabled && playBeep()}
                    >
                        SUBMIT SCORE <span aria-hidden="true">✦</span>
                    </button>
                    <p className="form-footnote">This demo records your score in this session only; no message is sent to a server.</p>
                    {submittedInitials && (
                        <div className="success-banner" role="status">
                            INSERTED HIGH SCORE! — {submittedInitials}
                        </div>
                    )}
                </form>

                <aside className="panel leaderboard-panel" aria-labelledby="leaderboard-title">
                    <h2 className="panel-label" id="leaderboard-title"><span>TOP PLAYERS</span><span>ALL-TIME</span></h2>
                    {leaderboard.map(({ initials, score }, index) => (
                        <div className="leaderboard-row" key={`${initials}-${index}`}>
                            <span className="leaderboard-rank">0{index + 1}</span>
                            <span className="leaderboard-name">{initials}</span>
                            <span className="leaderboard-score">{score}</span>
                        </div>
                    ))}
                    <p className="leaderboard-empty">YOUR NAME COULD BE UP HERE. Leave a message to claim your spot.</p>
                </aside>
            </div>
        </section>
    );
}