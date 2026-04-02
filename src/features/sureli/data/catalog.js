const imgMusic = require("../../../../assets/images/img1.webp");
const imgGame = require("../../../../assets/images/img2.webp");
const imgGeo = require("../../../../assets/images/img3.webp");
const imgScience = require("../../../../assets/images/img4.webp");
const imgSports = require("../../../../assets/images/location.webp");
const imgProfile = require("../../../../assets/images/profile.png");
const imgLogo = require("../../../../assets/images/logo.webp");
const imgLogoAlt = require("../../../../assets/images/logo2.webp");
const imgGoogle = require("../../../../assets/images/google_icon.png");

export const sureliAssets = {
  imgMusic,
  imgGame,
  imgGeo,
  imgScience,
  imgSports,
  imgProfile,
  imgLogo,
  imgLogoAlt,
  imgGoogle,
};

export const categoryCatalog = [
  {
    id: "pop-culture",
    title: "Pop Culture",
    accent: "#FF0A9D",
    tag: "Entertainment",
    image: imgLogoAlt,
  },
  {
    id: "video-games",
    title: "Video Games",
    accent: "#FF0A9D",
    tag: "Games",
    image: imgGame,
  },
  {
    id: "music-legends",
    title: "Music Legends",
    accent: "#FF0A9D",
    tag: "Entertainment",
    image: imgMusic,
  },
  {
    id: "sports-icons",
    title: "Sports Icons",
    accent: "#FF0A9D",
    tag: "Sports",
    image: imgSports,
  },
  {
    id: "geography",
    title: "Geography",
    accent: "#FF0A9D",
    tag: "TV Shows",
    image: imgGeo,
  },
  {
    id: "science-tech",
    title: "Science & Tech",
    accent: "#FF0A9D",
    tag: "Games",
    image: imgScience,
  },
];

export const boardCategoryPool = [
  { id: "game", title: "GAME", image: imgLogoAlt },
  { id: "movies", title: "MOVIES", image: imgGame },
  { id: "pc-game", title: "GAME", image: imgScience },
  { id: "resturent", title: "RESTURENT", image: imgScience },
  { id: "mobile-game", title: "MOBILE GAME", image: imgProfile },
  { id: "www", title: "WWW", image: imgMusic },
];

export const homeWhyPlay = [
  {
    title: "Teams vs Team",
    body: "Play with two teams and make every answer count.",
  },
  {
    title: "Quick Games",
    body: "A 3 minute round is enough to turn the room competitive.",
  },
  {
    title: "Power Up",
    body: "Use aids at the right moment and change the whole match.",
  },
];

export const homeRules = [
  { title: "Dummy Text", body: "Fast turns, quick decisions, and team-first trivia gameplay.", image: imgProfile },
  { title: "Dummy Text", body: "Choose categories before the match begins.", image: imgGame },
  { title: "Dummy Text", body: "Use the countdown wisely for every answer.", image: imgMusic },
  { title: "Dummy Text", body: "Aids can completely shift the scoreboard.", image: imgGeo },
  { title: "Dummy Text", body: "Each round gets more intense as points rise.", image: imgLogoAlt },
  { title: "Dummy Text", body: "Victory goes to the team with the strongest finish.", image: imgScience },
];

export const homeAbilities = [
  { title: "Dummy Text", body: "Answer assist" },
  { title: "Dummy Text", body: "Call a friend" },
  { title: "Dummy Text", body: "Double score" },
  { title: "Dummy Text", body: "Get a hint" },
];

export const howItWorksSteps = [
  {
    step: "1",
    title: "Create Teams",
    body: "Split into Team A and Team B. Add player names and get ready for battle!",
  },
  {
    step: "2",
    title: "Choose Categories",
    body: "Each team picks 3 categories from our diverse collection. Strategy matters!",
  },
  {
    step: "3",
    title: "Answer & Score",
    body: "Take turns answering questions. Use power-ups wisely to gain an edge!",
  },
  {
    step: "4",
    title: "Crown the Winner",
    body: "The team with the most points wins. Share your results and brag to friends.",
  },
];

export const powerUps = [
  { title: "50/50", body: "Removes two incorrect answers, giving you a better shot at the win." },
  { title: "Call a Friend", body: "Tap into the collective brainpower of your team for 30 extra seconds." },
  { title: "Double Points", body: "Feeling confident? Double your points for the current question." },
  { title: "Get a Hint", body: "Reveal a small clue to nudge you in the right direction." },
];

export const faqItems = [
  {
    question: "How many players can play Sureli?",
    answer: "Sureli supports 2-20 players. Split into two teams and compete head-to-head. The more players, the more fun!",
  },
  { question: "Do I need to download an app?", answer: "No. The experience is designed to work quickly on web and mobile." },
  { question: "How long does a typical game last?", answer: "Most casual matches finish in a few minutes, depending on the number of rounds." },
  { question: "What are power-ups and how do I use them?", answer: "Power-ups are limited team aids like hints, 50/50, and bonus scoring tools." },
  { question: "Can I create my own questions?", answer: "This mock experience focuses on prebuilt categories, but the structure supports custom content later." },
  { question: "Is Sureli free to play?", answer: "The current UI presents Sureli as a free social trivia experience." },
  { question: "How do I join a game someone else created?", answer: "Create teams, pick categories, and launch the round from the host screen." },
  { question: "Can I play on my phone?", answer: "Yes. The layouts are built to work on mobile-sized screens as well." },
];

export const privacySections = [
  {
    title: "Information We Collect",
    body: "We collect information that you provide directly to us when creating an account or participating in challenges. This includes:",
    points: [
      "Account details (username, email address, and profile picture)",
      "Game performance statistics and trivia history",
      "Device information (browser type, operating system, and IP address)",
      "Communications with our support team",
    ],
  },
  {
    title: "Data Security",
    body: "We implement robust security measures to protect your data. This includes end-to-end encryption for sensitive data transfers and regular security audits of our infrastructure. While no method of transmission over the internet is 100% secure, we strive to use commercially acceptable means to protect your personal information.",
    points: [],
  },
];

export const myGamesGrid = [
  "Maserati",
  "Mercedes",
  "Porsche",
  "Jaguar",
  "Ford",
  "Dodge",
  "Lexus",
  "Buick",
];

export const tileLabels = [
  "songs",
  "cars",
  "Proverbs",
  "Resturent",
  "Sports",
  "friend",
];
