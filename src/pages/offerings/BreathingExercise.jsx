import React, { useState, useEffect } from 'react';

const BreathingExercise = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [pulse, setPulse] = useState('');
    const [breathHoldTime, setBreathHoldTime] = useState(0);
    const [isBreathing, setIsBreathing] = useState(false);
    const [isBreathHolding, setIsBreathHolding] = useState(false);
    const [gamifiedScore, setGamifiedScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (isBreathing && timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0) {
            setIsBreathing(false);
            alert('Time to input your pulse');
        }
    }, [isBreathing, timer]);

    const startBreathingExercise = () => {
        setIsBreathing(true);
        setTimer(30);
    };

    const startBreathHold = () => {
        setIsBreathHolding(true);
        const startTime = new Date().getTime();

        const id = setInterval(() => {
            const currentTime = new Date().getTime();
            setBreathHoldTime(Math.floor((currentTime - startTime) / 1000));
        }, 1000);

        setIntervalId(id);
    };

    const stopBreathHold = () => {
        clearInterval(intervalId);
        setIsBreathHolding(false);
    };

    const calculateScore = () => {
        let score = breathHoldTime * 2;
        if (age && gender) {
            if (gender === 'male') {
                score += 10;
            } else if (gender === 'female') {
                score += 15;
            }
            score -= age / 2;
        }
        setGamifiedScore(score);
    };

    return (
        <div style={styles.container}>
            <h2>Breathing Exercise</h2>
            <p>If you feel uneasy at any time, please stop immediately.</p>

            <div style={styles.inputGroup}>
                <label>Age: </label>
                <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.inputGroup}>
                <label>Gender: </label>
                <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    style={styles.input}
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div style={styles.section}>
                <h3>Check Your Pulse</h3>
                <button onClick={startBreathingExercise} style={styles.button}>
                    Start 30-second Timer
                </button>
                {isBreathing && <p>Time left: {timer} seconds</p>}
                {!isBreathing && timer === 0 && (
                    <input
                        type="number"
                        placeholder="Enter your pulse"
                        value={pulse}
                        onChange={e => setPulse(e.target.value)}
                        style={styles.input}
                    />
                )}
            </div>

            <div style={styles.section}>
                <h3>Hold Your Breath</h3>
                <button onClick={startBreathHold} disabled={isBreathHolding} style={styles.button}>
                    Start Breath-Holding Timer
                </button>
                {isBreathHolding && <p>Hold your breath...</p>}
                {isBreathHolding && (
                    <button onClick={stopBreathHold} style={styles.button}>
                        Stop
                    </button>
                )}
                {!isBreathHolding && breathHoldTime > 0 && (
                    <p>You held your breath for {breathHoldTime} seconds</p>
                )}
            </div>

            <div style={styles.section}>
                <button onClick={calculateScore} style={styles.button}>Calculate Score</button>
                {gamifiedScore > 0 && <p>Your Score: {gamifiedScore}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        marginLeft: '10px',
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    section: {
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
    },
};

export default BreathingExercise;
