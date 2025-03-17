export default function Guess({ isGuessed, guess, word }) {
    return (
        <div className="grid grid-cols-5 gap-2">
            {new Array(5).fill(0).map((_, i) => {
                const bgColor = !isGuessed ? 'bg-black' : guess[i] === word[i] ? 'bg-green-400' : word.includes(guess[i]) ? 'bg-yellow-400' : 'bg-gray-400 text-white';
                return (
                    <div className={`h-15 w-15 border border-gray-400 uppercase flex items-center justify-center mb-2 font-bold ${bgColor}`} key={i}>
                        {guess[i]}
                    </div>
                );
            })}
        </div>
    );
}