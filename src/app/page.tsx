"use client";
import Guess from "@/components/Guess";
import Qwerty from "@/components/Qwerty";
import PuzzleStore from "@/stores/PuzzleStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";

export default observer(function Home() {
    const store = useLocalObservable(() => PuzzleStore);

    useEffect(() => {
        store.init();
        const handleKeyup = (e: KeyboardEvent) => store.handleKeyup(e);
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    }, []);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            {store.won && <h1 className="mb-3 text-2xl">You Won!</h1>}
            {store.lost && <h1 className="mb-3 text-2xl">You Lost!</h1>}

            {store.guesses.map((_, i) => (
                <Guess
                    key={i}
                    word={store.word}
                    guess={store.guesses[i]}
                    isGuessed={i < store.currentGuess}
                />
            ))}
            {(store.won || store.lost) && (
                <button
                    onClick={() => store.init()}
                    className="cursor-pointer bg-green-600 rounded-sm flex justify-center items-center my-6 py-2 px-6"
                >
                    Play Again
                </button>
            )}

            { store.word}
            <Qwerty store={store} />
        </div>
    );
});