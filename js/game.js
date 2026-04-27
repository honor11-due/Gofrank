// Game State
const gameState = {
    currentChapter: 1,
    currentScene: 1,
    playerName: 'You',
    romance: {
        dominique: 0,
        aria: 0,
        mei: 0,
        scarlett: 0
    },
    chosenCharacter: null,
    pastChoices: [],
    gameProgress: 0
};

const characters = {
    dominique: {
        name: 'Dominique',
        emoji: '👩‍💼',
        color: '#d4a574',
        personality: 'Dominant',
        description: 'CEO with commanding presence',
        bio: 'A powerful tech CEO who masks vulnerability behind professionalism. She\'s brilliant, assertive, and rarely lets anyone close.'
    },
    aria: {
        name: 'Aria',
        emoji: '🎨',
        color: '#ff6b9d',
        personality: 'Playful',
        description: 'Artist and musician',
        bio: 'A creative spirit who lives for art and adventure. Witty and spontaneous, she uses humor to connect with others.'
    },
    mei: {
        name: 'Mei',
        emoji: '💚',
        color: '#6fc3df',
        personality: 'Nurturing',
        description: 'Therapist and wellness coach',
        bio: 'Compassionate and empathetic, she dedicates her life to helping others heal. Struggles to prioritize herself.'
    },
    scarlett: {
        name: 'Scarlett',
        emoji: '📚',
        color: '#c9a2d6',
        personality: 'Arrogant',
        description: 'Academic from old money',
        bio: 'Brilliant and proud, she guards her true self behind sharp wit and intellectual superiority. Her rare smiles are priceless.'
    }
};

// Story Data
const storyData = {
    chapter1: {
        scenes: [
            {
                character: 'narration',
                text: 'You\'ve just started working at a prestigious firm in downtown. On your first day, you meet four remarkable women who will change your life forever.',
                choices: [
                    { text: 'Ready to see who they are?', next: 'chapter1_scene2' }
                ]
            },
            {
                character: 'dominique',
                text: 'Welcome to the team. I\'m Dominique, the CEO. I expect excellence from everyone who works here. You\'ll find we have high standards.',
                choices: [
                    { 
                        text: 'I\'m impressed by your company\'s achievements.', 
                        next: 'chapter1_scene3a',
                        romanceAdjust: { dominique: 5 }
                    },
                    { 
                        text: 'That\'s... intimidating.', 
                        next: 'chapter1_scene3b',
                        romanceAdjust: { dominique: -2 }
                    }
                ]
            },
            {
                character: 'dominique',
                text: 'You did your research. I appreciate that. Let me show you around the office. You\'ll be working closely with my team.',
                choices: [
                    { text: 'Continue', next: 'chapter1_scene4' }
                ]
            },
            {
                character: 'dominique',
                text: 'Intimidation is part of the leadership style, but don\'t worry. Work hard and you\'ll earn my respect.',
                choices: [
                    { text: 'I will.', next: 'chapter1_scene4' }
                ]
            },
            {
                character: 'aria',
                text: 'Hey there! I\'m Aria! *laughs* Don\'t let Dominique scare you—she\'s actually a softie underneath all that CEO armor.',
                choices: [
                    { 
                        text: 'I\'m glad to meet someone more relaxed!', 
                        next: 'chapter1_scene5a',
                        romanceAdjust: { aria: 5 }
                    },
                    { 
                        text: 'Does she know you\'re talking about her like that?', 
                        next: 'chapter1_scene5b',
                        romanceAdjust: { aria: 3 }
                    }
                ]
            },
            {
                character: 'aria',
                text: 'Trust me, we go way back. Want to grab coffee after work? I can give you the real inside scoop on everyone here.',
                choices: [
                    { text: 'I\'d love that!', next: 'chapter1_scene6', romanceAdjust: { aria: 5 } },
                    { text: 'Maybe another time.', next: 'chapter1_scene6', romanceAdjust: { aria: 0 } }
                ]
            }
        ]
    },
    chapter2: {
        scenes: [
            {
                character: 'mei',
                text: 'Hi, I\'m Mei, the wellness coordinator. I help employees maintain work-life balance. How are you adjusting so far?',
                choices: [
                    { 
                        text: 'It\'s been overwhelming but exciting.', 
                        next: 'chapter2_scene2a',
                        romanceAdjust: { mei: 5 }
                    },
                    { 
                        text: 'Everyone seems very intense here.', 
                        next: 'chapter2_scene2b',
                        romanceAdjust: { mei: 3 }
                    }
                ]
            },
            {
                character: 'mei',
                text: 'That\'s normal. You know, sometimes it helps to talk about it. I do counseling sessions if you ever need someone to listen.',
                choices: [
                    { text: 'I appreciate that. Thank you.', next: 'chapter2_scene3', romanceAdjust: { mei: 5 } },
                    { text: 'I\'ll keep that in mind.', next: 'chapter2_scene3', romanceAdjust: { mei: 2 } }
                ]
            },
            {
                character: 'mei',
                text: 'Intensity is just passion. Once you understand their motivations, you\'ll realize how much they care about what they do.',
                choices: [
                    { text: 'Continue', next: 'chapter2_scene4' }
                ]
            },
            {
                character: 'scarlett',
                text: 'So you\'re the new hire. I heard Dominique thinks you\'re competent. That\'s more than most people get from her.',
                choices: [
                    { 
                        text: 'I\'m trying to make a good impression.', 
                        next: 'chapter2_scene5a',
                        romanceAdjust: { scarlett: 2 }
                    },
                    { 
                        text: 'I wasn\'t aware she had an opinion yet.', 
                        next: 'chapter2_scene5b',
                        romanceAdjust: { scarlett: 5 }
                    }
                ]
            },
            {
                character: 'scarlett',
                text: 'How refreshingly earnest. Most people try too hard. You seem... genuine.',
                choices: [
                    { text: 'Is that a compliment?', next: 'midgame', romanceAdjust: { scarlett: 3 } }
                ]
            },
            {
                character: 'scarlett',
                text: 'Interesting. You don\'t back down easily. I appreciate that. Perhaps we\'ll get along better than I expected.',
                choices: [
                    { text: 'I\'d like that.', next: 'midgame', romanceAdjust: { scarlett: 5 } }
                ]
            }
        ]
    }
};

// UI Functions
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startNewGame() {
    gameState.currentChapter = 1;
    gameState.currentScene = 1;
    gameState.romance = {
        dominique: 0,
        aria: 0,
        mei: 0,
        scarlett: 0
    };
    gameState.chosenCharacter = null;
    gameState.pastChoices = [];
    switchScreen('game-screen');
    playScene('chapter1', 0);
}

function goToMenu() {
    if (confirm('Return to main menu? Any unsaved progress will be lost.')) {
        switchScreen('menu-screen');
    }
}

function showCredits() {
    switchScreen('credits-screen');
}

function saveGame() {
    localStorage.setItem('gofrank_save', JSON.stringify(gameState));
    alert('Game saved successfully!');
}

function loadGame() {
    const save = localStorage.getItem('gofrank_save');
    if (save) {
        Object.assign(gameState, JSON.parse(save));
        switchScreen('game-screen');
        updateRomanceDisplay();
        alert('Game loaded!');
    } else {
        alert('No save file found.');
    }
}

function playScene(chapter, sceneIndex) {
    const scenes = storyData[chapter].scenes;
    if (sceneIndex >= scenes.length) return;
    
    const scene = scenes[sceneIndex];
    
    // Update character display
    const characterId = Object.keys(characters).find(key => characters[key].name === (scene.character === 'narration' ? 'Narrator' : scene.character.charAt(0).toUpperCase() + scene.character.slice(1)));
    
    if (scene.character === 'narration') {
        document.getElementById('character-portrait').textContent = '📖';
        document.getElementById('character-name').textContent = 'Narrator';
    } else {
        const charKey = Object.keys(characters).find(key => characters[key].name === scene.character.charAt(0).toUpperCase() + scene.character.slice(1));
        if (charKey) {
            document.getElementById('character-portrait').textContent = characters[charKey].emoji;
            document.getElementById('character-name').textContent = characters[charKey].name;
        }
    }
    
    document.getElementById('dialogue-text').textContent = scene.text;
    
    // Update choices
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => makeChoice(chapter, choice, sceneIndex);
        choicesContainer.appendChild(btn);
    });
    
    updateRomanceDisplay();
}

function makeChoice(chapter, choice, currentScene) {
    // Adjust romance based on choice
    if (choice.romanceAdjust) {
        Object.keys(choice.romanceAdjust).forEach(char => {
            gameState.romance[char] += choice.romanceAdjust[char];
            gameState.romance[char] = Math.max(0, Math.min(100, gameState.romance[char]));
        });
    }
    
    gameState.pastChoices.push(choice.text);
    
    // Handle midgame choice
    if (choice.next === 'midgame') {
        showMidgameChoice();
    } else {
        // Find next scene
        const scenes = storyData[chapter].scenes;
        const nextSceneIndex = currentScene + 1;
        if (nextSceneIndex < scenes.length) {
            playScene(chapter, nextSceneIndex);
        } else {
            playScene('chapter2', 0);
        }
    }
}

function showMidgameChoice() {
    const container = document.getElementById('choices-container');
    container.innerHTML = '<h3 style="color: #ff69b4; margin-bottom: 15px;">Choose Your Path: Who will you pursue?</h3>';
    
    Object.keys(characters).forEach(charKey => {
        const char = characters[charKey];
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `<strong>${char.name}</strong> - ${char.personality} (Romance: ${gameState.romance[charKey]}/100)`;
        btn.onclick = () => choosePath(charKey);
        container.appendChild(btn);
    });
}

function choosePath(characterKey) {
    gameState.chosenCharacter = characterKey;
    alert(`You have chosen to pursue ${characters[characterKey].name}!\n\nThe story will now focus on deepening your relationship with them.`);
    // Continue with Act 3
    startAct3(characterKey);
}

function startAct3(characterKey) {
    const char = characters[characterKey];
    const dialogueBox = document.getElementById('dialogue-text');
    dialogueBox.textContent = `As you spend more time with ${char.name}, your feelings grow stronger. The intensity of your longing becomes almost unbearable. Every moment together feels like it could be the moment everything changes...`;
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const btn1 = document.createElement('button');
    btn1.className = 'choice-btn';
    btn1.textContent = 'Confess your feelings';
    btn1.onclick = () => confessLove(characterKey);
    choicesContainer.appendChild(btn1);
    
    const btn2 = document.createElement('button');
    btn2.className = 'choice-btn';
    btn2.textContent = 'Wait for the right moment';
    btn2.onclick = () => waitForMoment(characterKey);
    choicesContainer.appendChild(btn2);
}

function confessLove(characterKey) {
    const char = characters[characterKey];
    document.getElementById('dialogue-text').textContent = `You take a deep breath and tell ${char.name} exactly how you feel. Your heart is pounding as you wait for her response...`;
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = 'See what happens next...';
    btn.onclick = () => intimateScene(characterKey);
    choicesContainer.appendChild(btn);
}

function waitForMoment(characterKey) {
    const char = characters[characterKey];
    document.getElementById('dialogue-text').textContent = `You hold back, waiting for the perfect moment. One evening, ${char.name} takes your hand and looks into your eyes. "I think I know what you\'ve been feeling," she says softly. "I feel it too."\n\nShe leans closer...`;
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = 'Kiss her...';
    btn.onclick = () => intimateScene(characterKey);
    choicesContainer.appendChild(btn);
}

function intimateScene(characterKey) {
    const char = characters[characterKey];
    document.getElementById('character-portrait').textContent = '💕';
    document.getElementById('dialogue-text').innerHTML = `<em>A passionate moment unfolds between you and ${char.name}. The air is electric with desire and emotion. You hold each other close, lost in the connection you've been building all this time...</em><br><br><em>[Fade to black...]</em><br><br><em>Later, as you lie together, everything feels perfect. ${char.name} whispers, "I love you. I want to spend my life with you."</em>`;
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = 'Ask her to marry you...';
    btn.onclick = () => weddingEnding(characterKey);
    choicesContainer.appendChild(btn);
}

function weddingEnding(characterKey) {
    const char = characters[characterKey];
    document.getElementById('character-portrait').textContent = '💍';
    document.getElementById('dialogue-text').innerHTML = `<strong>THE WEDDING</strong><br><br>Six months later, you stand at the altar, watching ${char.name} walk toward you in a beautiful dress. Your eyes meet, and you both smile—a smile that says everything you've been through together, all the longing, all the connection, has led to this moment.<br><br>As you exchange vows, you promise to love her, to cherish her, to spend forever understanding her in ways no one else ever could.<br><br>"I do," she whispers, and as you kiss, your journey comes full circle. Two souls, brought together by chance, now joined by choice and love.<br><br><strong>THE END</strong>`;
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    const btn1 = document.createElement('button');
    btn1.className = 'choice-btn';
    btn1.textContent = 'Return to Menu';
    btn1.onclick = () => goToMenu();
    choicesContainer.appendChild(btn1);
    
    const btn2 = document.createElement('button');
    btn2.className = 'choice-btn';
    btn2.textContent = 'Start New Game (Different Path)';
    btn2.onclick = () => startNewGame();
    choicesContainer.appendChild(btn2);
}

function updateRomanceDisplay() {
    const display = document.getElementById('romance-display');
    display.innerHTML = '';
    
    Object.keys(gameState.romance).forEach(charKey => {
        const char = characters[charKey];
        const level = gameState.romance[charKey];
        
        const bar = document.createElement('div');
        bar.className = 'romance-bar';
        bar.innerHTML = `
            <div class="romance-name">${char.name}</div>
            <div class="romance-level">
                <div class="romance-fill" style="width: ${level}%"></div>
            </div>
            <div class="romance-number">${level}</div>
        `;
        display.appendChild(bar);
    });
}

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    updateRomanceDisplay();
});