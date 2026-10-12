function createTone({ frequency = 440, duration = 0.12, volume = 0.04, type = 'square' } = {}) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const audioContext = new AudioCtx();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.stop(audioContext.currentTime + duration);

    oscillator.onended = () => {
        audioContext.close();
    };
}

export function playBeep() {
    createTone({ frequency: 660, duration: 0.08, volume: 0.03, type: 'square' });
}

export function playSelect() {
    createTone({ frequency: 520, duration: 0.1, volume: 0.04, type: 'triangle' });
}

export function playCoin() {
    createTone({ frequency: 880, duration: 0.16, volume: 0.05, type: 'sawtooth' });
}
