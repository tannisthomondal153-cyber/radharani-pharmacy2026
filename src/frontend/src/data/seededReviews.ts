export interface SeededReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
  isSeeded: true;
  isVerified: true;
}

const hinduNames = [
  "Subhash Biswas",
  "Arnab Chatterjee",
  "Priya Ghosh",
  "Tanmoy Dey",
  "Riya Sen",
  "Sudip Pal",
  "Mita Roy",
  "Goutam Das",
  "Bappi Mondal",
  "Sujata Sarkar",
  "Tapan Majumdar",
  "Kakoli Bose",
  "Dipankar Nandi",
  "Mousumi Chakraborty",
  "Somen Kundu",
  "Paromita Saha",
  "Biswajit Mitra",
  "Ananya Mukherjee",
  "Debjit Ganguly",
  "Rupali Bhattacharya",
  "Santanu Halder",
  "Sumitra Koley",
  "Arindam Basak",
  "Mamata Patra",
  "Prosenjit Banerjee",
  "Basabi Dutta",
  "Uttam Goswami",
  "Rekha Lahiri",
  "Alok Poddar",
  "Nilufar Rani",
  "Sudipta Das",
  "Kartik Ghosh",
  "Poulami Sen",
  "Rahul Dey",
  "Swapna Roy",
  "Bijoy Mondal",
  "Sunita Sarkar",
  "Asim Chakraborty",
  "Nandini Bose",
  "Pradip Mukherjee",
  "Shibani Pal",
  "Suresh Halder",
  "Kabita Mitra",
  "Debashis Das",
  "Jayanti Ghosh",
  "Pintu Mondal",
  "Mitali Roy",
  "Soumen Bera",
  "Chandrima Majumdar",
  "Bablu Kundu",
  "Ranjita Nandi",
];

const muslimNames = [
  "Salim Shaikh",
  "Nasrin Begum",
  "Rahim Ali",
  "Farida Khatun",
  "Karim Molla",
  "Suraiya Sultana",
  "Mofizul Islam",
  "Rashida Parveen",
  "Sajjad Hossain",
  "Rehana Bibi",
  "Wahid Ahmed",
  "Bilkis Khanam",
  "Rafiqul Mondal",
  "Roksana Banu",
  "Jahangir Sheikh",
  "Nurjahan Khatun",
  "Taslima Parvin",
  "Mominul Haque",
  "Sultana Begum",
  "Anisur Rahman",
  "Rubina Khatun",
  "Masum Shaikh",
  "Hamida Banu",
  "Jakir Hossain",
  "Sabina Yeasmin",
  "Alauddin Mondal",
  "Morjina Khatun",
  "Sirajul Islam",
  "Hasina Begum",
  "Badiur Rahman",
];

const allNames = [...hinduNames, ...muslimNames];

const fiveStarComments = [
  "Khub bhalo pharmacy! Everything was available and the staff was super helpful. I got my BP medicines without any delay. Highly recommend!",
  "One of the best pharmacies near New Barrackpore. The owner knows every medicine by name. Very knowledgeable person.",
  "I needed some urgent medicines late at night and they were open. God bless them! Real service to the community.",
  "The doctor sitting here is excellent. Gave very good advice about my mother's diabetes medicines. We now come here regularly.",
  "Prices are very reasonable compared to other pharmacies nearby. And they never give you the wrong medicine.",
  "My whole family depends on Radharani Pharmacy. Even for small things like fever medicines they give proper guidance.",
  "Got all my prescription medicines in one place. No need to run around. Staff is polite and patient.",
  "Very clean shop, nice atmosphere. The medicines are always fresh, not expired stock. I checked the dates.",
  "Home delivery is also available here! I ordered during rainy season and they delivered on time. Very helpful.",
  "The doctor here diagnosed my father's issue just by asking a few questions. Referred us properly. Very professional.",
  "Excellent service! Got my mother's heart medicines which were not available anywhere else in Madhyamgram. Thank you!",
  "Staff remembers our family's regular medicines. Very personal service. It feels like a neighborhood pharmacy should.",
  "Trusted pharmacy in this area. We've been coming since they opened. Never had any issue with medicines or billing.",
  "The best part is they explain how to take the medicines properly. Not just hand over and done.",
  "I always shop here only. Quality medicines, good staff, and the doctor gives free basic consultation. Besh bhalo.",
  "They helped me with my prescription when the doctor's handwriting was unclear. Cross-checked and gave correct medicine.",
  "Available medicines for everything from cold to chronic conditions. Very well stocked pharmacy.",
  "Very good service. My uncle's cancer support medicines were arranged on order within a day. Highly appreciable.",
  "The staff here treated my elderly mother with so much respect. Made her feel comfortable. Wonderful people.",
  "Late night service is a blessing for this locality. No other pharmacy in the area stays open this late.",
  "Amar bari-r sabar jonno ami ekhane-i aashi. They know us by name now. That personal touch means a lot.",
  "Good stock of ayurvedic and allopathic both. Very nice. The owner explained the difference patiently.",
  "My child's pediatric medicines were available here when other shops ran out. Really saved us that night.",
  "Dr. sahab at this pharmacy gave better advice than the clinic we went to first. Such depth of knowledge.",
  "The UPI payment works perfectly here. Modern yet trustworthy pharmacy. Love visiting this place.",
  "They told me honestly which brand was better for my cough instead of selling the expensive one. Honest shop.",
  "I've recommended this pharmacy to at least 20 people in my building. Everyone is happy with their service.",
  "All generic and branded medicines available. Price list is transparent. No hidden charges. Very trustworthy.",
  "The pharmacist here noticed that two of my medicines could interact badly and warned me. Potentially life-saving!",
  "Perfect pharmacy for Madhyamgram locality. They understand local needs and always have stock ready.",
  "Wonderful experience every single time. The staff recognizes us and keeps our regular prescriptions noted.",
  "I was very nervous about my new medicine regimen. They explained everything patiently. Felt so much better after.",
  "Ekhane daktarbabu-r parashe ekhuni asha jaye. The consultation is really helpful before buying medicines.",
  "They source rare medicines on demand. My aunt's rare thyroid medicine was not available but they got it in 2 days.",
  "Best in New Barrackpore area without any doubt. Professional, well-stocked, and genuinely caring staff.",
  "Never had a bad experience here in over a year of visiting. Consistent quality service every single time.",
  "The staff gave me correct information about the medicine dosage that my doctor forgot to mention. Very responsible.",
  "They have a senior citizen discount which they told us about voluntarily. Did not even ask. Such good people.",
  "Very prompt service. I walk in, tell them my condition, they suggest the right OTC medicine quickly. No waiting.",
  "Amazing pharmacy! They even keep track of when my mother's regular medicines are running low and remind me to refill.",
];

const fourStarComments = [
  "Good pharmacy overall. Most medicines were available. Waiting time was a bit long but staff was polite.",
  "Medicines are genuine here. The doctor gave useful advice. Parking outside is a slight issue but manageable.",
  "Nice pharmacy. Prices are fair. I wish they had a slightly bigger selection of vitamins and supplements.",
  "The service is good. I get my monthly medicines here. Only once or twice they had to order something for me.",
  "Pretty good experience. The staff is knowledgeable. Shop can get a bit crowded during evenings.",
  "Good reliable pharmacy. I've been coming here for 6 months. Once got wrong dosage which they corrected quickly.",
  "Helpful staff, good stock. I would give 5 stars but sometimes the wait is a bit long in the morning rush.",
  "Nice place. The doctor is good and listens carefully. I feel the queue management could be better.",
  "Good pharmacy. Honest billing. Available most medicines. Little bit far from my house but worth the trip.",
  "Decent service. They were very helpful when I had a question about my elderly father's medicine interaction.",
  "Overall good pharmacy. I've got all my prescription medicines here. The shop layout could be a bit more organized.",
  "Reliable and honest pharmacy. They do have minor delays sometimes but the quality and care makes up for it.",
  "Nice pharmacy in Madhyamgram area. Home delivery takes a bit of time but it does arrive. Good service.",
  "Bhalo pharmacy. Staff is patient and helpful. A bit more staff during peak hours would help.",
  "Good experience here. Doctor consultation is helpful. I do wish they were open an hour earlier in the morning.",
  "Mostly satisfied with this pharmacy. They have almost everything I need. The waiting area needs improvement.",
  "Good pharmacy. Prices are transparent and medicine quality is reliable. Recommend for regular prescription needs.",
];

const threeStarComments = [
  "Average experience. Some medicines were not in stock and they said come back tomorrow. A bit inconvenient.",
  "Okay pharmacy. Staff was polite but the specific medicine I needed had to be ordered. Got it next day.",
  "Decent place. Service was fine but it was very crowded and took a long time to get my turn.",
  "Not bad but not great. My medicine was not available and they did not proactively suggest an alternative.",
  "Mixed experience. Sometimes the service is excellent, other times you wait a long time for basic things.",
  "Moderate experience. They have common medicines but for specialized ones I had to go elsewhere sometimes.",
  "The staff is polite but they seem understaffed during rush hours. Long waiting time on some days.",
  "Three stars because my experience has been inconsistent. Some days great, some days not so much.",
  "The pharmacy is okay for basic needs. For specialized cardiac medicines I still have to go to a bigger store.",
];

const twoStarComments = [
  "The medicine I needed was not available and the staff did not offer to order it. Had to go elsewhere.",
  "Service was slow and I waited for 20 minutes for a basic medicine. Staff seemed distracted.",
  "Not impressed with my last visit. The price they quoted was higher than the MRP printed on the box.",
];

const oneStarComments = [
  "Very disappointing. The medicine was out of stock and nobody told me until I had waited for 15 minutes.",
  "Wrong medicine was given to me once. Luckily I checked at home before taking it. Please be more careful.",
];

function generateDate(index: number): number {
  const startMs = new Date("2024-01-01").getTime();
  const endMs = new Date("2026-04-01").getTime();
  const range = endMs - startMs;
  const seed = (index * 2654435761) % 2147483648;
  const fraction = (seed % 10000) / 10000;
  return Math.floor(startMs + fraction * range);
}

function pickRating(seed: number): number {
  // 85% positive (rating >= 4): 50% give 5, 35% give 4
  const r = seed % 100;
  if (r < 50) return 5;
  if (r < 85) return 4;
  if (r < 94) return 3;
  if (r < 98) return 2;
  return 1;
}

function pickFromArray<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function pickComment(rating: number, seed: number): string {
  if (rating === 5) return pickFromArray(fiveStarComments, seed);
  if (rating === 4) return pickFromArray(fourStarComments, seed);
  if (rating === 3) return pickFromArray(threeStarComments, seed);
  if (rating === 2) return pickFromArray(twoStarComments, seed);
  return pickFromArray(oneStarComments, seed);
}

function generateReviews(count: number): SeededReview[] {
  const reviews: SeededReview[] = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 31337 + 42;
    const rating = pickRating(seed);
    reviews.push({
      id: `seed-${i + 1}`,
      name: pickFromArray(allNames, seed + 1),
      rating,
      comment: pickComment(rating, seed + 2),
      createdAt: generateDate(i),
      isSeeded: true,
      isVerified: true,
    });
  }
  return reviews;
}

export const seededReviews: SeededReview[] = generateReviews(500);
