const writeDate = document.querySelector('.date');
const writeTime = document.querySelector('.time');
const switchSound = new Audio('../source/switchSound.mp3');

// 시계
function updateClock() {
    let today = new Date();

    let dateString = `${today.getFullYear()}/${(today.getMonth(2)+1).toString().padStart(2,'0')}/${(today.getDate()).toString().padStart(2,'0')}`;
    let timeString = `${(today.getHours()).toString().padStart(2, '0')}:${(today.getMinutes()).toString().padStart(2, '0')}`;

    writeDate.textContent = dateString;
    writeTime.textContent = timeString;
}
setInterval(updateClock, 100);

// 키보드
let activeKey = null; // Track the currently active key
let typingTask = null; // Track the current typing task
let cancelTyping = false; // Flag to cancel typing
let soundSelect = false;

export function getSoundSelect(sound) {
    soundSelect = sound;
}

// Function to handle keydown event
function handleKeydown(event) {
    if (activeKey === event.code) return;

    const keyElement = document.querySelector(`.key[data-key="${event.code}"]`);
    if (keyElement) {
        keyElement.classList.add('active');
        activeKey = event.code;

        if (soundSelect) {
            const switchSound = new Audio('./switchSound.mp3');
            switchSound.play();
        }
        

        // Automatically release the key after 0.5 seconds
        setTimeout(() => {
            keyElement.classList.remove('active');
            if (activeKey === event.code) {
                activeKey = null;
            }
        }, 500);
    }
}

document.addEventListener('keydown', handleKeydown);

document.addEventListener('keyup', (event) => {
    const keyElement = document.querySelector(`.key[data-key="${event.code}"]`);
    if (keyElement) {
        keyElement.classList.remove('active');
        if (activeKey === event.code) {
            activeKey = null; // Reset active key only if it matches the released key
        }
    }
});

// Function to simulate a keydown event with a string input
function simulateKeyEvent(keyCode) {
    const event = new KeyboardEvent('keydown', { code: keyCode });
    handleKeydown(event);
}

// Function to simulate typing a string one character at a time
export async function simulateTyping(text, interval) {
    // Cancel any ongoing typing task
    cancelTyping = true;
    if (typingTask) {
        await typingTask; // Wait for the current task to finish
    }
    cancelTyping = false;

    typingTask = (async () => {
        const specialCharMap = {
            '!': 'Digit1',
            '@': 'Digit2',
            '#': 'Digit3',
            '$': 'Digit4',
            '%': 'Digit5',
            '^': 'Digit6',
            '&': 'Digit7',
            '*': 'Digit8',
            '(': 'Digit9',
            ')': 'Digit0',
            '[': 'BracketLeft',
            ']': 'BracketRight',
            '\\': 'Backslash',
            '`': 'Backquote',
            ';': 'Semicolon',
            "'": 'Quote',
            ',': 'Comma',
            '.': 'Period',
            '/': 'Slash',
            '<': 'Comma',
            '>': 'Period',
            '?': 'Slash',
            '~': 'Backquote',
            ':': 'Semicolon',
            '"': 'Quote',
            '{': 'BracketLeft',
            '}': 'BracketRight',
            '|': 'Backslash',
            '_': 'Minus',
            '+': 'Equal',
            '-': 'Minus',
            '=': 'Equal'
        };

        const shiftRequiredMap = {
            '!': true,
            '@': true,
            '#': true,
            '$': true,
            '%': true,
            '^': true,
            '&': true,
            '*': true,
            '(': true,
            ')': true,
            '{': true,
            '}': true,
            ':': true,
            '"': true,
            '<': true,
            '>': true,
            '?': true,
            '|': true,
            '~': true,
            '_': true,
            '+': true
        };

        const typingTextElement = document.querySelector('.typing-text');
        if (!typingTextElement) return;

        typingTextElement.textContent = ''; // Clear the typing text element

        for (const char of text) {
            if (cancelTyping) return; // Exit if cancel flag is set

            const isUpperCase = char === char.toUpperCase() && /[A-Z]/.test(char);
            const isSpecialChar = specialCharMap.hasOwnProperty(char);
            const isShiftRequired = shiftRequiredMap.hasOwnProperty(char);
            const isDigit = /[0-9]/.test(char); // Check if the character is a digit

            if (isUpperCase || isShiftRequired) {
                simulateKeyEvent('ShiftLeft'); // Simulate pressing the left Shift key
                await new Promise(resolve => setTimeout(resolve, interval / 2));
            }

            if (isSpecialChar) {
                simulateKeyEvent(specialCharMap[char]); // Simulate pressing the corresponding key
            } else if (isDigit) {
                simulateKeyEvent(`Digit${char}`); // Simulate pressing the digit key
            } else if (char === ' ') {
                simulateKeyEvent('Space'); // Simulate pressing the Spacebar
            } else {
                const keyCode = `Key${char.toUpperCase()}`; // Map character to keyCode
                simulateKeyEvent(keyCode);
            }

            typingTextElement.textContent += char; // Append the character to the typing text element

            await new Promise(resolve => setTimeout(resolve, interval));

            if (isUpperCase || isShiftRequired) {
                const shiftKeyElement = document.querySelector(`.key[data-key="ShiftLeft"]`);
                if (shiftKeyElement) {
                    shiftKeyElement.classList.remove('active');
                    activeKey = null;
                }
            }
        }

        // Wait for 1 second before simulating the Enter key
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (cancelTyping) return; // Exit if cancel flag is set

        // Simulate pressing the Enter key at the end
        simulateKeyEvent('Enter');

        // Wait for 0.2 seconds before repeating the typing
        await new Promise(resolve => setTimeout(resolve, 200));

        if (cancelTyping) return; // Exit if cancel flag is set

        // Immediately clear the text and repeat the typing
        typingTextElement.textContent = ''; // Clear the text
        simulateTyping(text, interval);
    })();
}