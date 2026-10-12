import { CategoryItem, Post } from '../types/blog';

// Generated editorial image assets
import imgLeadWorkspace from '../assets/images/blog_lead_workspace_1791776971897.jpg';
import imgCulturePottery from '../assets/images/blog_culture_pottery_1791776985233.jpg';
import imgTeaHillsMist from '../assets/images/blog_tea_hills_mist_1791776995829.jpg';
import imgNightStarlight from '../assets/images/blog_night_starlight_1791777006503.jpg';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'all',
    nameBn: 'সকল প্রবন্ধ',
    nameEn: 'All Stories',
    descriptionBn: 'কথাকাব্যের সমস্ত প্রকাশিত চিন্তা ও রচনা',
    descriptionEn: 'All essays and chronicles across the publication',
  },
  {
    id: 'technology',
    nameBn: 'প্রযুক্তি ও ভবিষ্যৎ',
    nameEn: 'Technology & Future',
    descriptionBn: 'কৃত্রিম বুদ্ধিমত্তা, প্রোগ্রামিং ও ডিজিটাল সমাজ',
    descriptionEn: 'Artificial intelligence, software craft, and digital society',
  },
  {
    id: 'culture',
    nameBn: 'ঐতিহ্য ও সংস্কৃতি',
    nameEn: 'Culture & Heritage',
    descriptionBn: 'বাংলার শিল্প, মৃৎশিল্প, লোককথা ও শিকড়ের সন্ধান',
    descriptionEn: 'Artisanal crafts, regional heritage, and enduring folklore',
  },
  {
    id: 'travel',
    nameBn: 'প্রকৃতি ও ভ্রমণ',
    nameEn: 'Nature & Journeys',
    descriptionBn: 'পাহাড়, চা-বাগান, মেঘ ও নদীর নির্জন পদচিহ্ন',
    descriptionEn: 'Misty hills, tea valleys, and solitary explorations',
  },
  {
    id: 'science',
    nameBn: 'বিজ্ঞান ও মহাকাশ',
    nameEn: 'Science & Cosmos',
    descriptionBn: 'নক্ষত্রের আলো, মহাবিশ্ব ও বৈজ্ঞানিক জিজ্ঞাসা',
    descriptionEn: 'Starlight, celestial mysteries, and scientific inquiry',
  },
  {
    id: 'literature',
    nameBn: 'সাহিত্য ও জীবনবোধ',
    nameEn: 'Literature & Philosophy',
    descriptionBn: 'বইয়ের ঘ্রাণ, নিঃসঙ্গতা ও মননশীল দার্শনিক আলাপ',
    descriptionEn: 'The scent of paper, quiet solitude, and reflective essays',
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'tech-memory-digital-age',
    slug: 'tech-memory-digital-age',
    title: 'প্রযুক্তি ও মানুষের স্মৃতি: কীবোর্ডের যুগে ভাবনার গভীরতা',
    titleEn: 'Technology & Human Memory: The Depth of Thought in the Keyboard Era',
    excerpt: 'দ্রুত টাইপিং এবং স্ক্রিনের কৃত্রিম আলোর মাঝে আমাদের গভীর ভাবনার অভ্যাস কি হারিয়ে যাচ্ছে? একটি দীর্ঘমেয়াদী মনস্তাত্ত্বিক অনুসন্ধান।',
    excerptEn: 'Between swift mechanical keystrokes and screen glow, is our capacity for deep contemplative solitude slipping away? A longitudinal inquiry.',
    coverImage: imgLeadWorkspace,
    category: 'প্রযুক্তি ও ভবিষ্যৎ',
    categoryEn: 'Technology & Future',
    author: {
      name: 'আহসান হাবিব',
      role: 'প্রযুক্তি লেখক ও গবেষক',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    date: '১২ অক্টোবর ২০২৬',
    readTime: '৬ মিনিট পাঠ',
    readTimeEn: '6 min read',
    featured: true,
    tags: ['প্রযুক্তি', 'মনস্তত্ত্ব', 'ডিজিটাল লাইফ', 'উৎপাদনশীলতা'],
    likes: 142,
    views: 1280,
    content: `আজকের দ্রুতগতির ডিজিটাল জীবনে আমরা প্রতিনিয়ত হাজার হাজার তথ্যের মুখোমুখি হচ্ছি। সকালে ঘুম থেকে ওঠার মুহূর্ত থেকে রাতে চোখের পাতা এক হওয়া পর্যন্ত আমাদের মস্তিষ্ক স্ক্রিনের তরঙ্গে নিমজ্জিত। কিন্তু এই অতিরিক্ত তথ্য প্রবাহের মাঝে আমরা কি সত্যিই কিছু মনে রাখছি? নাকি তথ্য আমাদের আঙুলের ডগায় সহজলভ্য হওয়ায় স্মৃতির অভ্যন্তরীণ আধার দুর্বল হয়ে পড়ছে?

প্রাচীনকালে যখন কাগজ ও কলম ছিল মানুষের ভাব প্রকাশের প্রধান মাধ্যম, তখন চিন্তার গতি আর লেখার গতি প্রায় একই ছন্দে চলত। ফাউন্টেন পেনের নিব যখন মসৃণ পৃষ্ঠায় কালির রেখা আঁকত, তখন প্রতিটি শব্দের পেছনে থাকত এক ধরণের মননশীল স্থৈর্য। মানুষ লেখার আগে ভাবত, কারণ কাগজের উপর কালির দাগ একবার বসলে তা মুছে ফেলা সহজ ছিল না।

> "যন্ত্র যখন মানুষের স্মৃতির বোঝা বহন করতে শুরু করে, তখন মানুষ নিজের ভাবনার গভীরতা মাপার মানদণ্ড হারিয়ে ফেলে।"

বর্তমান কীবোর্ড ও টাচস্ক্রিনের সংস্কৃতিতে যেকোনো ভাবনা মুছে ফেলা সেকেন্ডের ব্যাপার। 'ব্যাকস্পেস' আমাদের নির্ভুল করার সুযোগ দিয়েছে সত্য, কিন্তু তা কি আমাদের খসড়া চিন্তার রূপান্তর ক্ষমতাকে সংকুচিত করেনি? গবেষকরা দেখেছেন যে হাতে লেখার সময় মস্তিষ্কের যে স্নায়বিক সংযোগগুলো সক্রিয় হয়, কীবোর্ডে টাইপ করার সময় তার একটি বড় অংশ নিস্ক্রিয় থাকে।

### তথ্যের মহাসমুদ্র বনাম প্রজ্ঞার অভাব
ইন্টারনেট আমাদের সবকিছু জানার সুযোগ করে দিয়েছে, কিন্তু গভীরভাবে বোঝার সময় কেড়ে নিয়েছে। আমরা আর্টিকেলের শিরোনাম পড়ি, সোশ্যাল ফিড স্ক্রল করি, কিন্তু একটি দীর্ঘ প্রবন্ধ একটানা আধা ঘণ্টা পড়ার ধৈর্য ধীরে ধীরে কমে যাচ্ছে। একে বলা হয় 'কনটেক্সট সুইচিং'-এর ক্লান্তি।

তাহলে কি আমরা প্রযুক্তি পরিত্যাগ করব? না, সমাধান আদিমতায় ফিরে যাওয়া নয়; বরং সচেতন ভারসাম্য গড়ে তোলা। দিনের নির্দিষ্ট সময়ে ডিজিটাল ডিভাইস থেকে দূরে গিয়ে কাগজে কলমে চিন্তা লিপিবদ্ধ করা, প্রতিদিন অন্তত ২০ মিনিট একাকী মননশীল পাঠে মগ্ন থাকা—এই সামান্য অভ্যাসগুলোই প্রযুক্তির সাথে আমাদের মানবীয় সম্পর্কের সুস্থ ভারসাম্য রক্ষা করতে পারে।`,
    contentEn: `In today’s hyper-connected landscape, our senses are continuously barraged with thousands of transient data fragments. From dawn till the final dimming of the bedside lamp, the human mind remains bathed in cool pixel radiation. Yet amidst this ceaseless tide of data, are we truly synthesizing enduring knowledge? Or has effortless retrieval at our fingertips gently eroded the architecture of contemplative retention?

In eras when ink and vellum anchored human dialogue, the cadence of contemplation matched the physical rhythm of the hand. When a fountain pen etched cursive ribbons across crisp parchment, each clause demanded intentionality. One deliberated before committing ink, because paper preserved thought with irreversible weight.

> "When mechanical apparatuses shoulder the burden of memory, humankind forfeits the silent caliper that measures the depth of reflection."

Our modern typographic landscape of instant keystrokes allows effortless deletion. While backspace confers immaculate syntax, has it inadvertently sanitized the raw creative struggle of early drafts? Cognitive neuroscientists observe that handwriting stimulates rich multi-sensory neural pathways that standard typing leaves largely dormant.

### The Deluge of Bytes Versus the Solitude of Wisdom
The web has democratized access to information while systematically eroding sustained focus. We skim volatile headlines, digest fragmented feeds, but falter when challenged with an unbroken half-hour essay.

The path forward is not reactionary luddism, but disciplined intentionality: reclaiming dedicated offline hours for handwritten notebooks, and cultivating deep, uninterrupted reading rituals.`,
    comments: [
      {
        id: 'c1',
        authorName: 'তানভীর আহমেদ',
        date: '১২ অক্টোবর ২০২৬, সকাল ১০:১৫',
        content: 'চমৎকার বিশ্লেষণ! বিশেষ করে খসড়া চিন্তার রূপান্তর নিয়ে আপনার বক্তব্যটি আমাকে অনেক ভাবাল।',
        likes: 12,
      },
      {
        id: 'c2',
        authorName: 'নুসরাত জাহান',
        date: '১২ অক্টোবর ২০২৬, দুপুর ১২:৩০',
        content: 'আমি গত এক মাস ধরে ডিজিটাল নোটবুকের বদলে সাধারণ ডায়েরি ব্যবহার শুরু করেছি, সত্যিই ভাবনার স্বচ্ছতা বেড়েছে।',
        likes: 8,
      },
    ],
  },
  {
    id: 'culture-pottery-living-heritage',
    slug: 'culture-pottery-living-heritage',
    title: 'মাটির ঘ্রাণ ও মৃৎশিল্পের অনন্ত শিল্পকথা',
    titleEn: 'The Aroma of Clay: Timeless Chronicles of Traditional Pottery',
    excerpt: 'ধামরাই ও সাভারের মৃৎশিল্পীদের চাকা এখনও ঘুরে চলেছে শতাব্দী প্রাচীন ইতিহাস বুকে ধারণ করে। মাটি ও আগুনের মেলবন্ধনের এক অনন্য উপাখ্যান।',
    excerptEn: 'Along the quiet riverbanks of Dhamrai, artisanal pottery wheels still turn with rhythmic grace, transforming raw mud and fire into enduring artifacts.',
    coverImage: imgCulturePottery,
    category: 'ঐতিহ্য ও সংস্কৃতি',
    categoryEn: 'Culture & Heritage',
    author: {
      name: 'ফারহানা ইসলাম',
      role: 'সংস্কৃতি ও লোকশিল্প গবেষক',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    date: '১০ অক্টোবর ২০২৬',
    readTime: '৫ মিনিট পাঠ',
    readTimeEn: '5 min read',
    tags: ['শিল্প', 'ঐতিহ্য', 'মৃৎশিল্প', 'সংস্কৃতি'],
    likes: 89,
    views: 890,
    content: `নরম ভিজে মাটির এক টুকরো তাল যখন কুমোরের চাকার ঠিক মাঝখানে বসানো হয়, তখন দৃশ্যটি যেন পৃথিবীর সৃষ্টির মতোই রহস্যময় হয়ে ওঠে। দুই হাতের স্পর্শে, আঙুলের কোমল চাপে আর চাকার অনবরত ঘূর্ণনে সেই মাটির খণ্ড রূপ নেয় একটি নিখুঁত কলসি, সুদৃশ্য সানকি কিংবা সুরভিত প্রদীপে।

বাংলার মৃৎশিল্প কেবল জীবিকা নয়, এটি হাজার বছরের পলল ভূমির সাথে মানুষের অবিচ্ছেদ্য সম্পর্কের সাক্ষী। ধামরাইয়ের কাকরান গ্রামে এখনও ভোর হতে না হতেই কাঠের চাকায় গতি ওঠে। কুমোর পাড়ার বাতাসে ছড়িয়ে পড়ে পোড়া মাটির বিশেষ মিষ্টি গন্ধ।

> "মাটি মানুষকে অহংকার ভুলিয়ে বিনয়ী হতে শেখায়; যে মাটি দিয়ে জীবনের শুরু, সেই মাটিতেই শিল্পীর অন্তরাত্মার স্ফুরণ ঘটে।"

আধুনিক প্লাস্টিক ও অ্যালুমিনিয়ামের সস্তা প্লাবনে মাটির তৈরি জিনিসপত্রের চাহিদা কমেছে ঠিকই, কিন্তু এর নান্দনিক মূল্য ম্লান হয়নি এক বিন্দুও। সাম্প্রতিক সময়ে শহরের শৌখিন অন্দরসজ্জা ও পরিবেশবান্ধব রান্নাঘরের আগ্রহে মৃৎশিল্প নতুন জীবন পেতে শুরু করেছে। টেরাকোটার সেই লালচে আভা আজও আমাদের শিকড়ের কথা স্মরণ করিয়ে দেয়।`,
    contentEn: `When a lump of moist alluvial clay is centered upon the rotating stone wheel, the process mirrors primordial creation. Through measured pressure of weathered palms and thumb pads, the formless sediment blossoms into a graceful pitcher, a shallow bowl, or a ceremonial oil lamp.

Bengal’s pottery heritage is not merely subsistence craftsmanship; it is an intimate conversation with deltaic silt honed across millennia. In the artisan villages along the Dhaleshwari basin, wheels begin spinning at first sparrow call, infusing the damp dawn air with the unmistakable fragrance of warm kiln smoke.

> "Clay humbles the soul; the very earth that bears our steps becomes the medium through which timeless geometry is coaxed into existence."

While industrial plastics long overshadowed earthen utilities, genuine terracotta retains an acoustic warmth and tactile honesty that mass manufacturing can never replicate.`,
    comments: [
      {
        id: 'c3',
        authorName: 'রাশেদ খান',
        date: '১১ অক্টোবর ২০২৬, বিকাল ৪:০০',
        content: 'ছবিটি অসাধারণ জীবন্ত! বাংলার কারিগরদের এই নিখাদ শিল্পের গল্প আরও বেশি মানুষের জানা উচিত।',
        likes: 6,
      },
    ],
  },
  {
    id: 'travel-sreemangal-misty-hills',
    slug: 'travel-sreemangal-misty-hills',
    title: 'কুয়াশাঘেরা চায়ের দেশে এক ভোর: শ্রীমঙ্গলের শান্ত উপত্যকা',
    titleEn: 'Dawn in the Misty Tea Country: The Quiet Valleys of Sreemangal',
    excerpt: 'ভোরের প্রথম আলো যখন সবুজ পাহাড়ের খাঁজে খাঁজে বিছানো কুয়াশার চাদর ভেদ করে নামে, তখন শ্রীমঙ্গল যেন এক নিস্তব্ধ রূপকথার রাজ্যে পরিণত হয়।',
    excerptEn: 'As the initial amber rays penetrate layers of morning vapour hugging the emerald slopes, the tranquil hills of Sreemangal awaken in sublime poetry.',
    coverImage: imgTeaHillsMist,
    category: 'প্রকৃতি ও ভ্রমণ',
    categoryEn: 'Nature & Journeys',
    author: {
      name: 'সাইফুল করিম',
      role: 'ভ্রমণকারী ও আলোকচিত্রী',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    date: '০৮ অক্টোবর ২০২৬',
    readTime: '৪ মিনিট পাঠ',
    readTimeEn: '4 min read',
    tags: ['ভ্রমণ', 'শ্রীমঙ্গল', 'প্রকৃতি', 'ফটোগ্রাফি'],
    likes: 114,
    views: 1105,
    content: `ঘুম ভেঙেছিল শ্রীমঙ্গলের চা-বাগানের এক কাঠের কটেজে। তখনও সূর্যের দেখা মেলেনি, চারপাশ ঢেকে আছে ঘন সাদা ধোঁয়াশার মতো কুয়াশায়। বাইরে পা রাখতেই শিরশিরে ভেজা ঠান্ডা বাতাস গায়ে এসে লাগল। দূরে রাবার বনের ভেতর থেকে ডেকে উঠল নাম না জানা কোনো পাখির দল।

চা-গাছগুলোর উপর জমা শিশিরবিন্দুগুলো যেন মুক্তোদানা। পাহাড়ের ঢাল বেয়ে এঁকেবেঁকে চলে যাওয়া সরু লাল মাটির পথ ধরে হাঁটতে হাঁটতে হঠাৎ দেখা গেল চা-শ্রমিকদের দল। পিঠে বাঁশের তৈরি খাঁচা বেঁধে তারা পাতা তোলার কাজে নেমে পড়েছেন। তাদের আঙুলের দ্রুত ছন্দ যেন সঙ্গীতের মতো মসৃণ—দুটি পাতা একটি কুঁড়ি।

> "প্রকৃতির নির্জনতা কোনো শূন্যতা নয়; এটি এমন এক গভীর উপস্থিতি যা আপনার সকল ভেতরের কোলাহলকে শান্ত করে দেয়।"

শহরের ক্লান্তি আর যানজটের শব্দদূষণ থেকে মুক্তি পেতে এই সবুজ উপত্যকার চেয়ে স্নিগ্ধ স্থান আর হতে পারে না। সন্ধ্যার চা-পাতা পোড়ানোর মিষ্টি গন্ধ আর পাখির কলকাকলি মনে করিয়ে দেয় জীবনের সরল সৌন্দর্য এখনও হারিয়ে যায়নি।`,
    contentEn: `Awakening in a timber veranda enveloped by high-canopy rubber trees, the morning air was saturated with cool mountain moisture. Long before the sun crested the eastern ridge, ribbons of milky vapour drifted through terraced slopes.

Dewdrops glistened upon fresh shoots like suspended crystals. Walking the narrow red-soil trails winding along undulating mounds, one encounters tea pickers moving with rhythmic dexterity—harvesting the prized two leaves and a single tender bud.

> "The silence of the wild is never an emptiness; it is an overwhelming presence that silences all peripheral internal commotion."

For anyone weary of relentless metropolitan speed, these rolling green slopes offer an enduring sanctuary where time dilates and simple sensory beauty returns to prominence.`,
    comments: [
      {
        id: 'c4',
        authorName: 'সামিয়া রহমান',
        date: '০৯ অক্টোবর ২০২৬, রাত ৯:১৫',
        content: 'শ্রীমঙ্গলের সকালের বর্ণনাটি পড়ে যেন সেখানেই চলে গিয়েছিলাম। অসাধারণ লেখনী!',
        likes: 9,
      },
    ],
  },
  {
    id: 'science-cosmic-silence-stars',
    slug: 'science-cosmic-silence-stars',
    title: 'মহাজাগতিক নিঃশব্দতা: নক্ষত্ররাজির আয়নায় মানব অস্তিত্ব',
    titleEn: 'Cosmic Silence: Human Existence Reflected in the Mirror of Stars',
    excerpt: 'রাতের অন্ধকার আকাশে যখন কোটি কোটি আলোকবর্ষ দূরের নক্ষত্রের দিকে তাকাই, তখন আমাদের সমস্ত অহংকার এক মুহূর্তেই চূর্ণ হয়ে যায়।',
    excerptEn: 'When we gaze into the nocturnal celestial vault at photons emitted eons ago, the fragile insignificance of human hubris is gently laid bare.',
    coverImage: imgNightStarlight,
    category: 'বিজ্ঞান ও মহাকাশ',
    categoryEn: 'Science & Cosmos',
    author: {
      name: 'ড. জামিলুর রেজা',
      role: 'পদার্থবিজ্ঞানী ও লেখক',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    date: '০৫ অক্টোবর ২০২৬',
    readTime: '৭ মিনিট পাঠ',
    readTimeEn: '7 min read',
    tags: ['বিজ্ঞান', 'মহাকাশ', 'নক্ষত্র', 'দর্শন'],
    likes: 168,
    views: 1540,
    content: `শহরের সোডিয়াম আলোর কোলাহল পেরিয়ে যখন পাহাড়ি নির্জন লেকের তীরে দাঁড়ানো যায়, মাথার ওপর উন্মোচিত হয় এক অবিশ্বাস্য অনন্ত ছাদ। মিল্কিওয়ে বা ছায়াপথের সেই ধোঁয়াটে রুপালি নদীর দিকে তাকালে বোঝা যায়, আমরা এই মহাবিশ্বে কত ক্ষুদ্র, অথচ কত আশ্চর্য এক দর্শক।

যে নক্ষত্রের আলো আজ রাতে আমাদের চোখের রেটিনায় এসে পৌঁছাল, তা হয়তো রওনা হয়েছিল ডাইনোসরদের বিলুপ্তির যুগে। আলো প্রতি সেকেন্ডে তিন লক্ষ কিলোমিটার বেগে ছুটে এসেও আমাদের কাছে পৌঁছাতে কোটি কোটি বছর পার করেছে। সুতরাং রাতের আকাশ দেখা মানে সরাসরি অতীতে উঁকি দেওয়া—এক ধরণের মহাজাগতিক টাইম ট্রাভেল।

> "আমরা সবাই নক্ষত্রের ধূলিকণা দিয়ে তৈরি। আমাদের রক্তের প্রতিটি আয়রন পরমাণু একদিন কোনো সুবিশাল সুপারনোভার গর্ভে বিস্ফোরিত হয়েছিল।" — কার্ল সাগান

বিজ্ঞান আমাদের ভয় দেখানোর জন্য নয়, বরং আমাদের বিস্ময়বোধকে জাগ্রত করার জন্য। যখন আমরা বুঝতে পারি যে আমরা মহাবিশ্বের বাইরে কেউ নই, বরং এই মহাবিশ্ব নিজেই আমাদের চোখের মাধ্যমে নিজেকে দেখছে, তখন পৃথিবীর ক্ষুদ্র স্বার্থ ও কলহগুলো অর্থহীন মনে হতে থাকে।`,
    contentEn: `Leaving behind urban light pollution to stand on the edge of a still alpine lake reveals an astonishing canopy. The spiraling silver arm of the Milky Way stretches overhead—a quiet testament to the fragility and singular wonder of the conscious observer.

The starlight touching our eyes tonight often embarked during forgotten geological epochs. Traveling across cosmic voids at three hundred thousand kilometers per second, photons have crossed deep time to finish their voyage upon our retina. To peer into the cosmos is to look backward into the foundational dawn of matter.

> "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself." — Carl Sagan

Modern astrophysics does not diminish our humanity; rather, it elevates our curiosity into reverent humility. Knowing our common cosmic genesis turns terrestrial disputes into fleeting whispers against the galactic silence.`,
    comments: [
      {
        id: 'c5',
        authorName: 'মেহরাব হোসেন',
        date: '০৬ অক্টোবর ২০২৬, সকাল ৮:২০',
        content: 'কার্ল সাগানের উদ্ধৃতিটি সবসময় হৃদয় স্পর্শ করে। চমৎকার প্রবন্ধ!',
        likes: 14,
      },
    ],
  },
  {
    id: 'literature-books-paper-solitude',
    slug: 'literature-books-paper-solitude',
    title: 'বইয়ের পাতার ঘ্রাণ এবং ডিজিটাল যুগের নিঃসঙ্গতা',
    titleEn: 'The Fragrance of Paper Pages & Solitude in the Digital Age',
    excerpt: 'একটি পুরোনো বইয়ের পাতা ওল্টানোর শব্দ এবং তার নিজস্ব ঘ্রাণ কোনো ডিজিটাল রিডার কখনও প্রতিস্থাপন করতে পারবে না।',
    excerptEn: 'The tactile whisper of turning paper leaves and the comforting lignin perfume of aged volumes resist all digital substitution.',
    coverImage: imgLeadWorkspace,
    category: 'সাহিত্য ও জীবনবোধ',
    categoryEn: 'Literature & Philosophy',
    author: {
      name: 'আনিসা চৌধুরী',
      role: 'সাহিত্য সমালোচক',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    date: '০২ অক্টোবর ২০২৬',
    readTime: '৫ মিনিট পাঠ',
    readTimeEn: '5 min read',
    tags: ['সাহিত্য', 'বই', 'পাঠাভ্যাস', 'জীবনবোধ'],
    likes: 95,
    views: 780,
    content: `পুরোনো বইয়ের দোকানে ঢুকলেই নাকে আসে এক বিশেষ মিষ্টি ও প্রাচীন ঘ্রাণ। রসায়নবিদরা বলবেন কাগজের ভেতরের লিগনিন ও সেলুলোজের ধীর ক্ষয় থেকে ভ্যানিলা ও বাদামের সুবাস ছড়ায়। কিন্তু একজন বইপ্রেমীর কাছে এই ঘ্রাণ সময়কে থামিয়ে দেওয়ার যাদুকরী সংকেত।

ডিজিটাল স্ক্রিনে বই পড়ার নানা সুবিধা আছে—হাজারটা বই পকেটে নিয়ে ঘোরা যায়, ফন্ট বড় করা যায়, অন্ধকারেও পড়া যায়। কিন্তু সেখানে যা অনুপস্থিত, তা হলো একটি বইয়ের শারীরিক অস্তিত্ব। কতটুকু পড়া হলো তা আঙুলের স্পর্শে টের পাওয়ার আনন্দ, প্রিয় কোনো লাইনের নিচে পেন্সিল দিয়ে সূক্ষ্ম দাগ কেটে রাখা, কিংবা দুই পাতার মাঝে একটি শুকনো বকুল ফুল রেখে দেওয়া।

> "বই পড়া মানে অন্য কারও মনের ভেতর দিয়ে নিজের দিকে ফিরে তাকানো।"

আমাদের এই কোলাহলপূর্ণ সময়ে দিনে অন্তত একটি ঘণ্টা মোবাইল বন্ধ রেখে একটি হার্ডকভার বই নিয়ে বসা এক ধরণের আধ্যাত্মিক মেডিটেশন। এটি আমাদের মস্তিষ্ককে শান্ত করে, গভীর মনোযোগ ফিরিয়ে দেয় এবং জীবনের অপ্রয়োজনীয় তাড়াহুড়ো থেকে মুক্তি দেয়।`,
    contentEn: `Crossing the threshold of a quiet antiquarian bookstore immediately summons that intoxicating perfume of aged cellulose. Biochemists attribute this to volatile organic compounds degrading into faint traces of vanilla and almond. To the devoted reader, however, it is the unmistakable fragrance of suspended time.

E-readers offer undeniable pragmatic utility—carrying libraries within lightweight slates, resizing glyphs at will. Yet what remains irreducibly absent is somatic permanence: sensing through thumb and palm how many pages have been traversed, marking a resonant sentence in graphite, or preserving a dried jasmine petal between chapters.

Carving out an uninterrupted hour with physical binding represents a profound ritual of inner quietude amidst an era of fragmented alerts.`,
    comments: [],
  },
];
