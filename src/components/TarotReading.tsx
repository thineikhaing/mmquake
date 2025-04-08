// import React, {useEffect, useState } from "react";
// import { getTarotInterpretation } from "../services/gemini"; // Gemini API helper
// import StackCardsGrid from "./StackCardsGrid";
// export interface TarotCard {
//     id: string;
//     name: string;
//     image: string;
//     upright: string;
//     reversed: string;
// }

// const TarotReading: React.FC = () => {
//   const [question, setQuestion] = useState("");
//   const [deck, setDeck] = useState<TarotCard[]>([]);
//   const [allowReversed, setAllowReversed] = useState(true);
//   const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
//   const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
//   const [interpretation, setInterpretation] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("/data/tarotDeck_full_78.json")
//       .then((res) => res.json())
//       .then(setDeck);
//   }, []);

//   const shuffleDeck = () => {
//     const withReversals = deck.map((card) => ({
//       ...card,
//       reversed: allowReversed ? Math.random() < 0.5 : false,
//     }));
//     const shuffled = [...withReversals].sort(() => Math.random() - 0.5);
//     setShuffledCards(shuffled.slice(0, 6));
//     setSelectedCards([]);
//     setInterpretation(null);
//   };

//   const selectCard = (card: TarotCard) => {
//     if (selectedCards.includes(card) || selectedCards.length >= 3) return;
//     setSelectedCards([...selectedCards, card]);
//   };

//   const handleInterpret = async () => {
//     if (selectedCards.length !== 3 || !question) return;
//     setLoading(true);
//     const result = await getTarotInterpretation(question, selectedCards);
//     setInterpretation(result);
//     setLoading(false);
//   };

//   const handleSelectCard = (card: TarotCard) => {
//     if (selectedCards.length >= 3 || selectedCards.includes(card)) return;
//     setSelectedCards([...selectedCards, card]);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       <h2 className="text-2xl font-bold text-purple-700">🔮 Tarot Reading</h2>

//       <textarea
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         placeholder="What question seeks answers in the cards?"
//         className="w-full border border-gray-300 rounded p-3 text-sm"
//         rows={3}
//       />

//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           checked={allowReversed}
//           onChange={() => setAllowReversed(!allowReversed)}
//         />
//         Allow Reversed Cards (ကဒ်ပြောင်းပြန် ခွင့်ပြုသည်)
//       </label>

//       <button
//         onClick={shuffleDeck}
//         className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
//       >
//         🔁 Shuffle & Draw Cards
//       </button>

//       <StackCardsGrid cards={deck} onSelect={handleSelectCard} />

//       {shuffledCards.length > 0 && (
//         <div>
//           <p className="text-sm mt-4 font-medium">
//             Please select three cards (ကဒ် ၃ ကဒ် ရွေးပါ)
//           </p>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
//             {shuffledCards.map((card) => (
//               <button
//                 key={card.id}
//                 onClick={() => selectCard(card)}
//                 className={`rounded overflow-hidden border-2 ${
//                   selectedCards.includes(card)
//                     ? "border-yellow-500"
//                     : "border-gray-200"
//                 }`}
//               >
//                 <img
//                   src={card.image}
//                   alt={card.name}
//                   className="w-full h-40 object-contain"
//                   style={{ transform: card.reversed ? "rotate(180deg)" : "none" }}
//                 />
//                 <p className="text-center text-sm mt-1">{card.name}</p>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {selectedCards.length === 3 && (
//         <button
//           onClick={handleInterpret}
//           className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
//         >
//           🧘 Get Tarot Interpretation
//         </button>
//       )}

//       {loading && (
//         <p className="text-sm text-gray-500 mt-3">Interpreting... 🔮</p>
//       )}

//       {interpretation && (
//         <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded text-sm text-gray-800 whitespace-pre-line">
//           {interpretation}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TarotReading;
