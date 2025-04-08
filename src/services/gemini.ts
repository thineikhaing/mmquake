// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

// export const getTarotInterpretation = async (
//   question: string,
//   selectedCards: TarotCard[]
// ): Promise<string> => {
//   const systemPrompt = `You are professional tarot card reader. Read about 3-card spread. Past, Present and Future. Be honest with your answer. Keep the response natural and insightful, as if you are explaining it to me in person. Reply back to the user base on the user language.`;
//   const userPrompt = `
// Question: "${question}"
// Cards drawn:
// ${selectedCards.map((card) => {
//   const orientation = card.reversed ? "Reversed" : "Upright";
//   const meaning = card.reversed ? card.reversed : card.upright;
//   return `- ${card.name} (${orientation}): ${meaning}`;
// }).join("\n")}
// `;


//   const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${GEMINI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       contents: [
//         { role: "system", parts: [{ text: systemPrompt }] },
//         { role: "user", parts: [{ text: userPrompt }] }
//       ]
//     }),
//   });

//   const result = await response.json();
//   const interpretation = result?.candidates?.[0]?.content?.parts?.[0]?.text;
//   return interpretation || "No interpretation available.";
// };