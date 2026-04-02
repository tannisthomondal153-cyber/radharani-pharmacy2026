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

// Extra 5-star comments specifically for January 2026 batch
const jan2026FiveStarComments = [
  "Starting 2026 with my trusted pharmacy! Came for my mother's diabetes medicines and everything was ready in minutes. Best pharmacy in New Barrackpore.",
  "New year, same great service. Radharani Pharmacy never disappoints. The staff always greets with a smile. Very happy customer.",
  "Got my whole family's January medicine stock from here. Dr. Basak gave excellent advice on my father's BP management. Highly recommend.",
  "I had a bad cold in January and they gave me the perfect combination of medicines. Felt better within 2 days. Very knowledgeable staff.",
  "Visited after the new year holidays. Shop was fully stocked even after the festive season. Impressed by their management.",
  "The dermatologist Dr. Tanima Garai here is amazing. My skin condition improved dramatically with her advice. So grateful.",
  "January special: they had a full stock of all my regular medicines without any shortage. Perfect pharmacy near Madhyamgram.",
  "Dr. Krishnendu Das gave my wife excellent gynecological advice. Very professional, sensitive and caring doctor.",
  "The psychiatrist Dr. Sandipta Ghosh helped my brother immensely. Compassionate care that made a real difference.",
  "Dr. Rahul Dey treated my ear infection perfectly. Within a week I was fully recovered. Amazing ENT specialist.",
  "Visited for my child's vaccination follow-up medicines. Dr. Kaushik Ray was so gentle and patient with my little one.",
  "Excellent pharmacy for New Barrackpore residents. Every single time I come here I am satisfied. 5 stars always.",
  "My spine problem was causing me severe pain. Dr. Taparia's advice and prescribed medicines gave me relief within days.",
  "Dr. Tuhin Sarkar saw my elderly uncle and the diagnosis was spot on. Academic knowledge combined with real care.",
  "I am so thankful this pharmacy exists near our colony. The staff is like family now. Warmest pharmacy in the area.",
  "Radharani Pharmacy saved my new year. I had an allergic reaction on 1st January and they were open and helpful immediately.",
  "January 2026 and my loyalty continues to this wonderful pharmacy. Never going anywhere else. The trust is unmatched.",
  "Best start to 2026! Got my full prescription filled in one visit. No running around. One stop solution.",
  "The team here worked seamlessly even after the new year rush. Stock was full, service was fast. Really impressive.",
  "Five stars for the excellent consultation by Dr. Basak regarding my father's stroke recovery medicines. Life-changing advice.",
  "Ekhane sob kichu pawa jaye. Every medicine, every consultation available. Never been disappointed. Obossho 5 taara.",
  "A pharmacy that genuinely cares about patients, not just sales. The doctor's advice here is worth more than gold.",
  "My whole colony depends on Radharani Pharmacy. We are so lucky to have such a dedicated team near us.",
  "The service in January 2026 was even better than before. They have really improved. Kudos to the whole team.",
  "Got my orthopaedic medicines from here. Dr. Taparia's recommendations were perfect. Knee pain is finally manageable.",
  "Wonderful pharmacy. The staff explains every medicine interaction carefully. I feel safe taking medicines from here.",
  "Dr. Ghosh helped me overcome my anxiety with the right medicines and guidance. I am forever grateful.",
  "Superb service as always. They even remembered my father's special insulin brand without me mentioning it.",
  "This pharmacy has the best collection of pediatric medicines in the Madhyamgram area. My kids' health is in safe hands.",
  "January 2026 has started on a positive note thanks to this pharmacy's exceptional service and genuine care.",
  "The whole medical team here is outstanding. Each doctor is highly qualified and genuinely concerned about patient welfare.",
  "I drove from Barasat to come here because the service and quality is unmatched. Worth every kilometer.",
  "My father's diabetic neuropathy medicines were difficult to find. They arranged everything within hours. Miracle workers.",
  "Premium quality pharmacy with a human touch. This is what healthcare should look like everywhere.",
  "Best pharmacy experience I have ever had. No exaggeration. The staff, the doctors, the stock - all perfect.",
  "January resolution: only Radharani Pharmacy for all our family's medicine needs. Decision made and will not change.",
  "The pharmacist checked my prescription thoroughly and even spotted a potential overdose issue. Real expertise on display.",
  "So happy to see the new doctor on the panel. The specialists here cover every health need our family has.",
  "Fast, accurate, affordable and caring. All four qualities together. Only Radharani Pharmacy delivers all this.",
  "Excellent consultation and medicines for my mother's cardiac condition. The care and follow-up advice was exceptional.",
];

function generateDate(index: number): number {
  const startMs = new Date("2024-01-01").getTime();
  const endMs = new Date("2026-04-01").getTime();
  const range = endMs - startMs;
  const seed = (index * 2654435761) % 2147483648;
  const fraction = (seed % 10000) / 10000;
  return Math.floor(startMs + fraction * range);
}

function generateJan2026Date(index: number): number {
  // Spread across January 2026 (Jan 1 to Jan 31)
  const startMs = new Date("2026-01-01").getTime();
  const endMs = new Date("2026-01-31T23:59:59").getTime();
  const range = endMs - startMs;
  // Use a simple spread to distribute reviews across the month
  const fraction = (index * 1.618 + 0.1) % 1;
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

function pickJan2026Rating(index: number): number {
  // 98% positive: 70% give 5 stars, 28% give 4 stars, 2% give 3 stars
  const r = index % 100;
  if (r < 70) return 5;
  if (r < 98) return 4;
  return 3;
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

function pickJan2026Comment(rating: number, index: number): string {
  if (rating === 5) {
    // Mix jan2026 comments with general 5 star comments
    const combined = [...jan2026FiveStarComments, ...fiveStarComments];
    return pickFromArray(combined, index);
  }
  if (rating === 4) return pickFromArray(fourStarComments, index);
  return pickFromArray(threeStarComments, index);
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

function generateJan2026Reviews(count: number): SeededReview[] {
  const reviews: SeededReview[] = [];
  for (let i = 0; i < count; i++) {
    const rating = pickJan2026Rating(i);
    const nameSeed = i * 7919 + 13;
    reviews.push({
      id: `seed-jan26-${i + 1}`,
      name: pickFromArray(allNames, nameSeed),
      rating,
      comment: pickJan2026Comment(rating, i),
      createdAt: generateJan2026Date(i),
      isSeeded: true,
      isVerified: true,
    });
  }
  return reviews;
}

export const seededReviews: SeededReview[] = [
  ...generateReviews(500),
  ...generateJan2026Reviews(200),
];
