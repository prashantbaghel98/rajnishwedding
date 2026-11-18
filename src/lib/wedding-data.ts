import heroImage from "@/assets/wedding-hero.jpg";
import haldiImage from "@/assets/wedding-haldi.png";
import vowsImage from "@/assets/wedding-vows.jpg";
import brideImage from '@/assets/wedding-bride.png';
import groomImage from '@/assets/wedding-groom.png';
import sangeetImage from '@/assets/wedding-sangeet.png';
import mehdiImage from '@/assets/wedding-mehdi.png';
import mandapImage from '@/assets/wedding-mandap.png';
import weddingImage from '@/assets/wedding-wedding.png';
import weddingVideo from "@/assets/teaser.mp4";
import videoPoster from "@/assets/wedding-mandap.png";

export type WeddingEvent = {
  id: string;
  name: string;
  shortName: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  dressCode: string;
  accent: string;
  image?: string;
};

export const wedding = {
  couple: {
    bride: {
      name: "Kavita Dhangar",
      firstName: "Kavita",
      intro: "Graceful, warm-hearted, and the pride of the Dhangar family.",
      parents: "Daughter of Mrs Rajwala Dhangar & Mr Santosh Dhangar",
    },
    groom: {
      name: "Rajnish Kumar",
      firstName: "Rajnish",
      intro: "Kind, grounded, and the beloved son of the Baghel family.",
      parents: "Son of Mrs Meena Kumari & Mr Vinod Kumar Baghel",
    },
  },
  initials: "R & K",
  weddingDate: "2026-12-01T11:00:00+05:30",
  displayDate: "1 December 2026",
  shortDate: "01.12.2026",
  rsvpBy: "25 November 2026",
  city: "Ghaziabad, Uttar Pradesh",
  cityShort: "Ghaziabad",
  hashtag: "#RajnishWedsKavita",
  heroImage, brideImage, groomImage,
  venue: { name: "Zestin Banquets", address: "14/2, Sahibabad Rd, Plot Alpha, Sahibabad Industrial Area Site 4, Sahibabad, Ghaziabad, Uttar Pradesh 201010", note: "Located on Sahibabad Road, easily reachable from Delhi, Noida, and Ghaziabad." },
  contact: {
    phone: "+917017225698",
    phones: ["+91 70172 25698", "+91 97191 20215"],
    whatsapp: "917017225698",
    email: "",
  },
  events: [
    { id: "haldi", name: "Haldi Ceremony", shortName: "Haldi", date: "29 November 2026", day: "Sunday", time: "11:00 AM", venue: "D-910, Nilaya Greens", address: "D-910 Nilaya Greens, Raj Nagar Extension Part 2, Ghaziabad, Uttar Pradesh", description: "A joyful morning of turmeric, marigolds, laughter, and blessings at home.", dressCode: "Yellow & Ivory", accent: "gold", image: haldiImage },
    { id: "mehndi", name: "Mehndi Ceremony", shortName: "Mehndi", date: "29 November 2026", day: "Sunday", time: "4:00 PM", venue: "D-910, Nilaya Greens", address: "D-910 Nilaya Greens, Raj Nagar Extension Part 2, Ghaziabad, Uttar Pradesh", description: "Henna, folk songs, dhol, and a colourful evening with family and friends.", dressCode: "Green & Floral", accent: "gold", image: mehdiImage },
    { id: "mandap", name: "Mandap Ceremony", shortName: "Mandap", date: "30 November 2026", day: "Monday", time: "5:00 PM", venue: "D-910, Nilaya Greens", address: "D-910 Nilaya Greens, Raj Nagar Extension Part 2, Ghaziabad, Uttar Pradesh", description: "The sacred mandap is set up with puja and blessings from our elders.", dressCode: "Traditional Festive", accent: "gold", image: mandapImage },
    { id: "wedding", name: "Shubh Vivah", shortName: "Wedding", date: "1 December 2026", day: "Tuesday", time: "11:00 AM", venue: "Zestin Banquets", address: "14/2, Sahibabad Rd, Plot Alpha, Sahibabad Industrial Area Site 4, Sahibabad, Ghaziabad, Uttar Pradesh 201010", description: "Baraat, jaimala, and the sacred pheras as two families become one.", dressCode: "Royal Indian", accent: "gold", image: weddingImage },
    { id: "sangeet", name: "Ladies Sangeet", shortName: "Ladies Sangeet", date: "2 December 2026", day: "Wednesday", time: "3:00 PM", venue: "Club House, Nilaya Greens", address: "Club House, Nilaya Greens, Raj Nagar Extension Part 2, Ghaziabad, Uttar Pradesh", description: "An afternoon of music, dance, and celebration with all the ladies of the family.", dressCode: "Festive Glamour", accent: "gold", image: sangeetImage },
  ] satisfies WeddingEvent[],
  story: [
    { year: "The families", title: "A blessed beginning", text: "With the wisdom and love of our elders, the Baghel and Dhangar families came together." },
    { year: "The meeting", title: "First conversations", text: "Shy smiles and gentle conversations slowly turned into understanding and trust." },
    { year: "The roka", title: "Hearts said yes", text: "With our parents' blessings, two families joyfully agreed to a lifelong bond." },
    { year: "1 Dec 2026", title: "Our forever", text: "Now we begin our journey together—and we would love you beside us." },
  ],
  families: {
    bride: ["Mr Santosh Dhangar & Mrs Rajwala Dhangar · Parents", "The Dhangar Family"],
    groom: ["Mr Vinod Kumar Baghel & Mrs Meena Kumari · Parents", "The Baghel Family"],
  },
  familyNames: { bride: "The Dhangar family", groom: "The Baghel family" },
  gallery: [heroImage, haldiImage, sangeetImage, haldiImage, mehdiImage, mandapImage, weddingImage],
  stay: [
    { title: "Timing", text: "Haldi, Mehndi, Mandap and Sangeet are at Nilaya Greens, Raj Nagar Extension. The wedding is at Zestin Banquets, Sahibabad. Kindly arrive 15 minutes early." },
    { title: "Getting here", text: "Use the Get directions button on each function to open its exact location in Google Maps." },
    { title: "Parking", text: "Parking is available at both venues. Please follow the volunteers' guidance on arrival." },
    { title: "Winter note", text: "Early December mornings are cool, around 12–22°C. A light shawl or jacket is recommended." },
  ],
  wishes: [
    { name: "Baghel Parivar", text: "May your life together be filled with love, respect, and endless happiness." },
    { name: "Dhangar Parivar", text: "Our blessings are always with you. Wishing you a beautiful married life." },
    { name: "Friends", text: "Two beautiful souls, one beautiful journey. Congratulations!" },
  ],
  gift: {
    enabled: false,
    upiId: "",
    note: "Your presence and blessings are the greatest gift for us.",
  },
  video: {
    src: weddingVideo,
    poster: videoPoster,
    title: "Our Engagement Film",
    description: "Two hearts, one promise, a lifetime of togetherness.",
    shortDate:'12.09.2026'
  },
} as const;
