"use client";
import { observer } from "mobx-react-lite";

interface GameStore {
    word: string;
    guesses: string[];
    currentGuess: number;
    readonly won: boolean;
    readonly lost: boolean;
    readonly allGuesses: string[];
    readonly exactGuesses: string[];
    readonly inexactGuesses: string[];
    submitGuess(): void;
    handleKeyup(e: KeyboardEvent): void;
}

interface QwertyProps {
    store: GameStore;
}

export default observer(function Qwerty({ store }: QwertyProps) {
    const qwerty = ['qwertyuiop', 'asdfghjkl', 'DeletezxcvbnmEnter'];

    const handleLetterClick = (letter: string) => {
        if (store.won || store.lost) return;
        if (store.guesses[store.currentGuess].length < 5) {
            store.guesses[store.currentGuess] =
                store.guesses[store.currentGuess] + letter.toLowerCase();
        }
    };

    return (
        <div className="w-full sm:w-auto">
            {qwerty.map((row) => (
                <div className="flex grow w-full justify-center gap-x-1 mt-1" key={row}>
                    {row.split('').map((key, index) => {
                        if (key === 'D' && row.startsWith('Delete')) {
                            return (
                                <button
                                    className="cursor-pointer m-px px-1 text-black flex h-8 sm:h-10 w-20 text-xs sm:text-md items-center justify-center rounded-md bg-gray-300 uppercase"
                                    key="delete"
                                    onClick={() =>
                                        store.handleKeyup({ key: 'Backspace' } as KeyboardEvent)
                                    }
                                >
                                    Delete
                                </button>
                            );
                        }
                        if (key === 'E' && row.endsWith('Enter')) {
                            return (
                                <button
                                    className="cursor-pointer m-px px-1 text-black flex text-xs sm:text-md h-8 sm:h-10 w-20 items-center justify-center rounded-md bg-gray-300 uppercase"
                                    key="enter"
                                    onClick={() => {
                                        store.submitGuess();
                                    }}
                                >
                                    Enter
                                </button>
                            );
                        }

                        if (
                            (row.startsWith('Delete') && index < 6) ||
                            (row.endsWith('Enter') && index >= row.length - 5)
                        ) {
                            return null;
                        }

                        const bgColor = store.exactGuesses.includes(key)
                            ? 'bg-green-400'
                            : store.inexactGuesses.includes(key)
                            ? 'bg-yellow-400'
                            : store.allGuesses.includes(key)
                            ? 'bg-gray-400 text-white'
                            : 'bg-gray-200';
                        return (
                            <button
                                className={`cursor-pointer m-px text-black flex h-8 w-full sm:h-10 sm:w-10 items-center text-md justify-center rounded-md uppercase ${bgColor}`}
                                key={key}
                                onClick={() => handleLetterClick(key)}
                            >
                                {key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
});