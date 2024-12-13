class Card {
    constructor(name, attack, defense) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
    }

    render() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <h3>${this.name}</h3>
            <p>Attack: ${this.attack}</p>
            <p>Defense: ${this.defense}</p>
        `;
        return cardElement;
    }
}

class Game {
    constructor() {
        this.playerDeck = [];
        this.enemyDeck = [];
        this.playerHealth = 100;
        this.enemyHealth = 100;

        this.playerDeckElement = document.getElementById('playerDeck');
        this.enemyDeckElement = document.getElementById('enemyDeck');
        this.playerCardElement = document.getElementById('playerCard');
        this.enemyCardElement = document.getElementById('enemyCard');
        this.battleButton = document.getElementById('battleButton');
        this.battleResultElement = document.getElementById('battleResult');
        this.playerHealthElement = document.getElementById('playerHealth');
        this.enemyHealthElement = document.getElementById('enemyHealth');

        this.initializeDecks();
        this.renderDecks();
        this.setupEventListeners();
    }

    initializeDecks() {
        const cardTypes = [
            { name: 'Warrior', attack: 8, defense: 5 },
            { name: 'Archer', attack: 6, defense: 3 },
            { name: 'Mage', attack: 10, defense: 2 },
            { name: 'Knight', attack: 7, defense: 6 },
            { name: 'Rogue', attack: 9, defense: 4 }
        ];

        // Create 5 cards for player and enemy
        for (let i = 0; i < 5; i++) {
            this.playerDeck.push(new Card(
                cardTypes[i].name, 
                cardTypes[i].attack, 
                cardTypes[i].defense
            ));
            this.enemyDeck.push(new Card(
                cardTypes[i].name, 
                cardTypes[i].attack, 
                cardTypes[i].defense
            ));
        }
    }

    renderDecks() {
        this.playerDeckElement.innerHTML = '';
        this.enemyDeckElement.innerHTML = '';

        this.playerDeck.forEach(card => {
            const cardElement = card.render();
            cardElement.addEventListener('click', () => this.selectPlayerCard(card));
            this.playerDeckElement.appendChild(cardElement);
        });

        this.enemyDeck.forEach(card => {
            const cardElement = card.render();
            this.enemyDeckElement.appendChild(cardElement);
        });
    }

    setupEventListeners() {
        this.battleButton.addEventListener('click', () => this.battle());
    }

    selectPlayerCard(card) {
        this.playerCardElement.innerHTML = '';
        this.playerCardElement.appendChild(card.render());
    }

    battle() {
        // Ensure a player card is selected
        if (this.playerCardElement.children.length === 0) {
            alert('Please select a card to battle!');
            return;
        }

        // Randomly select enemy card
        const enemyCard = this.enemyDeck[Math.floor(Math.random() * this.enemyDeck.length)];
        this.enemyCardElement.innerHTML = '';
        this.enemyCardElement.appendChild(enemyCard.render());

        // Battle logic
        const playerCard = this.playerDeck.find(card => 
            card.name === this.playerCardElement.querySelector('h3').textContent
        );

        const damage = Math.max(playerCard.attack - enemyCard.defense, 0);
        const enemyDamage = Math.max(enemyCard.attack - playerCard.defense, 0);

        this.enemyHealth = Math.max(this.enemyHealth - damage, 0);
        this.playerHealth = Math.max(this.playerHealth - enemyDamage, 0);

        // Update health displays
        this.playerHealthElement.textContent = `Health: ${this.playerHealth}`;
        this.enemyHealthElement.textContent = `Health: ${this.enemyHealth}`;

        // Display battle result
        this.battleResultElement.textContent = `${playerCard.name} deals ${damage} damage. 
            Enemy ${enemyCard.name} deals ${enemyDamage} damage.`;

        // Check for game over
        if (this.playerHealth <= 0 || this.enemyHealth <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.battleButton.disabled = true;
        if (this.playerHealth <= 0) {
            this.battleResultElement.textContent = 'Game Over! Enemy Wins!';
        } else {
            this.battleResultElement.textContent = 'Congratulations! You Win!';
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
