// src/stores/PuzzleStore.tsx
import { makeAutoObservable } from "mobx";
import words from '../../words.json';

class PuzzleStore {
    word: string = '';
    guesses: string[] = new Array(6).fill(''); // Start with 6 empty strings
    currentGuess: number = 0;

    constructor() {
        makeAutoObservable(this); // Make the store reactive
        this.init(); // Initialize on creation
    }

    get won() {
        return this.guesses[this.currentGuess - 1] === this.word;
    }

    get lost() {
        return this.currentGuess === 6;
    }

    get allGuesses() {
        return this.guesses.slice(0, this.currentGuess).join('').split('');
    }

    get exactGuesses() {
        return this.word
            .split('')
            .filter((letter, i) =>
                this.guesses
                    .slice(0, this.currentGuess)
                    .map((word) => word[i])
                    .includes(letter)
            );
    }

    get inexactGuesses() {
        return this.word
            .split('')
            .filter((letter) => this.allGuesses.includes(letter));
    }

    init() {
        this.word = words[Math.round(Math.random() * words.length)];
        this.guesses = new Array(6).fill(''); // Direct assignment, not .replace()
        this.currentGuess = 0;
    }

    submitGuess() {
        const currentGuess = this.guesses[this.currentGuess];
        if (currentGuess.length === 5 && words.includes(currentGuess)) {
            this.currentGuess += 1;
        }
    }

    handleKeyup(e: KeyboardEvent) {
        if (this.won || this.lost) return;

        if (!Array.isArray(this.guesses)) {
            console.error('Guesses not an array, fixing...');
            this.guesses = new Array(6).fill('');
        }

        if (e.key === 'Enter') {
            this.submitGuess();
            return;
        }
        if (e.key === 'Backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length - 1
            );
            return;
        }
        if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] =
                this.guesses[this.currentGuess] + e.key.toLowerCase();
        }
    }
}

export default new PuzzleStore();