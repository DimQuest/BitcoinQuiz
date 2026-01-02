
import { Question, PersonaInfo } from './types';

export const PERSONAS: PersonaInfo[] = [
  {
    minScore: 0,
    name: { en: "The Hopeful Gambler", id: "Spekulan Optimis" },
    description: { 
      en: "You're mainly here for the hype. Bitcoin is a wild ride, and you might want to fasten your seatbelt (and do more thoughtful research) before clicking 'buy'.", 
      id: "Sepertinya Anda tertarik karena tren semata. Perjalanan di dunia Bitcoin sangat dinamis; ada baiknya Anda melakukan riset yang lebih mendalam sebelum benar-benar memulainya." 
    }
  },
  {
    minScore: 7,
    name: { en: "Curious Explorer", id: "Penjelajah Penasaran" },
    description: { 
      en: "You've got the spark! You understand some basics but still feel a bit shaky when the candles turn red. Keep learning!", 
      id: "Anda sudah punya bekal dasar yang menarik! Meski masih sedikit ragu saat melihat grafik memerah, semangat belajar Anda adalah modal yang sangat berharga." 
    }
  },
  {
    minScore: 14,
    name: { en: "Sovereign Candidate", id: "Kandidat Mandiri" },
    description: { 
      en: "Impressive. You see the value, you have a plan, and you're not easily spooked. You're almost ready to be your own bank.", 
      id: "Luar biasa. Anda sudah memahami nilai Bitcoin dan memiliki rencana yang matang. Anda sudah hampir siap untuk mengelola aset Anda secara berdaulat." 
    }
  },
  {
    minScore: 18,
    name: { en: "Bitcoin Maximalist", id: "Penganut Bitcoin Sejati" },
    description: { 
      en: "Digital gold is in your DNA. You understand the math, the security, and the long-term vision. Absolute legend.", 
      id: "Emas digital sudah mendarah daging dalam diri Anda. Anda memahami logika matematika, keamanan, dan visi jangka panjangnya dengan sangat matang." 
    }
  }
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "Motivation",
    question: { en: "Why are you looking into Bitcoin right now?", id: "Apa alasan utama Anda melirik Bitcoin saat ini?" },
    options: [
      {
        text: { en: "My friend told me I can get rich quick.", id: "Ikut-ikutan teman yang katanya bisa cepat kaya." },
        readinessScore: 0,
        explanation: { en: "Slow down! 🏎️", id: "Pelan-pelan dulu! 🏎️" }
      },
      {
        text: { en: "I'm curious about technology and digital money.", id: "Penasaran dengan teknologi dan masa depan uang digital." },
        readinessScore: 1,
        explanation: { en: "Geek mode: ON 🤓", id: "Suka teknologi ya! 🤓" }
      },
      {
        text: { en: "I want to protect my savings from inflation.", id: "Ingin melindungi nilai tabungan dari ancaman inflasi." },
        readinessScore: 2,
        explanation: { en: "Smart move! 🛡️", id: "Langkah yang cerdas! 🛡️" }
      }
    ]
  },
  {
    id: "q2",
    category: "Financial Reality",
    question: { en: "How do you feel about the cash in your wallet?", id: "Gimana pandangan anda terhadap uang tunai yang anda pegang?" },
    options: [
      {
        text: { en: "It's safe, I love keeping cash.", id: "Merasa aman-aman saja dengan uang tunai" },
        readinessScore: 0,
        explanation: { en: "Classic style 👴", id: "Gaya konvensional 👴" }
      },
      {
        text: { en: "Things are getting expensive (Inflation is annoying).", id: "Mulai terasa nilai uang berkurang, harga barang makin mahal" },
        readinessScore: 1,
        explanation: { en: "It's tough! 📉", id: "Memang terasa ya! 📉" }
      },
      {
        text: { en: "Money that cannot be printed/manipulated is better.", id: "Lebih suka uang yang tidak mudah kehilangan nilai dan tidak bisa dicetak seenaknya" },
        readinessScore: 2,
        explanation: { en: "Sound money! 💎", id: "Paham esensinya! 💎" }
      }
    ]
  },
  {
    id: "q3",
    category: "Experience",
    question: { en: "Be honest, what do you know about Bitcoin?", id: "Jujur nih, sejauh mana pemahaman Anda tentang Bitcoin" },
    options: [
      {
        text: { en: "It's internet magic money, right?", id: "Bitcoin itu uang digital" },
        readinessScore: 0,
        explanation: { en: "Magic! ✨", id: "Ajaib ya! ✨" }
      },
      {
        text: { en: "It's digital gold, limited supply (21 Million).", id: "Sering disebut emas digital dan jumlahnya terbatas (21 juta)" },
        readinessScore: 1,
        explanation: { en: "Scarce asset 🔟", id: "Aset langka nih 🔟" }
      },
      {
        text: { en: "I understand mining, nodes, and halving cycles.", id: "Paham konsep mining, node, dan siklus halving." },
        readinessScore: 2,
        explanation: { en: "Expert level! 💻", id: "Tingkat pakar! 💻" }
      }
    ]
  },
  {
    id: "q4",
    category: "Volatility",
    question: { en: "Bitcoin crashes 30% tomorrow. How do you react?", id: "Kalau harga Bitcoin tiba-tiba anjlok 30% besok, apa reaksi Anda?" },
    options: [
      {
        text: { en: "Panic! Sell everything before it goes to zero.", id: "Panik! Langsung jual semua sebelum harganya nol." },
        readinessScore: 0,
        explanation: { en: "Stay calm... 🧻", id: "Tenang dulu... 🧻" }
      },
      {
        text: { en: "Wait and see, maybe cry a little.", id: "Menunggu dulu sambil melihat situasi." },
        readinessScore: 1,
        explanation: { en: "Tough times 🎢", id: "Uji kesabaran 🎢" }
      },
      {
        text: { en: "Flash sale! I'm buying more.", id: "Diskon besar! Waktunya belanja lagi." },
        readinessScore: 2,
        explanation: { en: "Buy the dip! 📉🔥", id: "Sikat habis! 📉🔥" }
      }
    ]
  },
  {
    id: "q5",
    category: "Time Horizon",
    question: { en: "When do you expect your money back from Bitcoin?", id: "Kapan Anda berencana menggunakan dana dari Bitcoin tersebut?" },
    options: [
      {
        text: { en: "Next month for rent/bills.", id: "Bulan depan untuk bayar kontrakan atau tagihan." },
        readinessScore: 0,
        explanation: { en: "Dangerous! 🚩", id: "Sangat berisiko! 🚩" }
      },
      {
        text: { en: "Maybe in a year or two for a vacation.", id: "Mungkin 1-2 tahun lagi buat liburan." },
        readinessScore: 1,
        explanation: { en: "Short term 🏖️", id: "Target jangka pendek 🏖️" }
      },
      {
        text: { en: "This is for my retirement (4+ years).", id: "Untuk bekal masa tua (di atas 4 tahun)." },
        readinessScore: 2,
        explanation: { en: "Long game 🧘", id: "Main jauh 🧘" }
      }
    ]
  },
  {
    id: "q6",
    category: "Source of Funds",
    question: { en: "Where is the investment money coming from?", id: "Berasal dari mana dana yang akan Anda gunakan?" },
    options: [
      {
        text: { en: "Borrowed money / Emergency fund.", id: "Uang pinjaman atau dana darurat." },
        readinessScore: 0,
        explanation: { en: "Red alert! ⛔", id: "Bahaya besar! ⛔" }
      },
      {
        text: { en: "Monthly salary leftovers.", id: "Sisa gaji bulanan yang tidak terpakai." },
        readinessScore: 1,
        explanation: { en: "Responsible 👔", id: "Cukup bijak 👔" }
      },
      {
        text: { en: "Dedicated 'cold money' I can afford to lose.", id: "Uang dingin yang siap saya relakan jika fluktuatif." },
        readinessScore: 2,
        explanation: { en: "Ice cold! ❄️", id: "Uang dingin asli ❄️" }
      }
    ]
  },
  {
    id: "q7",
    category: "Security",
    question: { en: "How good are you with passwords and tech?", id: "Seberapa peduli Anda dengan keamanan akun digital?" },
    options: [
      {
        text: { en: "I use '123456' everywhere. I forget easily.", id: "Pakai sandi gampang dan sering lupa." },
        readinessScore: 0,
        explanation: { en: "Risky! 😈", id: "Rawan retas! 😈" }
      },
      {
        text: { en: "I use a password manager and 2FA.", id: "Sudah pakai password manager dan 2FA." },
        readinessScore: 1,
        explanation: { en: "Good guard 🛡️", id: "Keamanan oke 🛡️" }
      },
      {
        text: { en: "I know what a Seed Phrase and Hardware Wallet is.", id: "Paham konsep Seed Phrase dan Hardware Wallet." },
        readinessScore: 2,
        explanation: { en: "Fortress 🏰", id: "Sangat aman 🏰" }
      }
    ]
  },
  {
    id: "q8",
    category: "Learning Style",
    question: { en: "How do you get your information?", id: "Dari mana Anda biasanya mencari info seputar Bitcoin?" },
    options: [
      {
        text: { en: "Random TikTok/Instagram influencers.", id: "Dari postingan influencer di TikTok atau IG." },
        readinessScore: 0,
        explanation: { en: "Be careful! 💃", id: "Hati-hati rumor 💃" }
      },
      {
        text: { en: "News sites and YouTube tutorials.", id: "Portal berita dan video edukasi YouTube." },
        readinessScore: 1,
        explanation: { en: "Subscriber 📺", id: "Suka belajar 📺" }
      },
      {
        text: { en: "Reading reports, articles, and always verifying data myself", id: "Membaca report, artikel, dan selalu memverifikasi data sendiri" },
        readinessScore: 2,
        explanation: { en: "Verify! 📖", id: "Paham akarnya 📖" }
      }
    ]
  },
  {
    id: "q9",
    category: "Ownership",
    question: { en: "What does 'Not your keys, not your coins' mean?", id: "Apa arti ungkapan 'Not your keys, not your coins'?" },
    options: [
      {
        text: { en: "I have no idea.", id: "Belum pernah dengar." },
        readinessScore: 0,
        explanation: { en: "Lesson time! 🎓", id: "Waktunya belajar! 🎓" }
      },
      {
        text: { en: "It means I should be careful with exchanges.", id: "Artinya harus hati-hati menyimpan koin di crypto exchange." },
        readinessScore: 1,
        explanation: { en: "Getting it 🧘", id: "Hampir paham 🧘" }
      },
      {
        text: { en: "If I don't hold the private key, I don't own the money.", id: "Tanpa memegang kunci pribadi, aset itu bukan milik saya." },
        readinessScore: 2,
        explanation: { en: "Sovereign 👑", id: "Pemilik asli 👑" }
      }
    ]
  },
  {
    id: "q10",
    category: "Strategy",
    question: { en: "How do you plan to buy?", id: "Apa strategi Anda dalam mengoleksi Bitcoin?" },
    options: [
      {
        text: { en: "Buy everything at once with all my savings.", id: "Langsung beli semua pakai seluruh tabungan." },
        readinessScore: 0,
        explanation: { en: "YOLO mode 🃏", id: "Terlalu nekat 🃏" }
      },
      {
        text: { en: "Buy a little bit when I have extra cash.", id: "Beli sedikit-sedikit saat ada uang sisa." },
        readinessScore: 1,
        explanation: { en: "Casual 🎒", id: "Santai saja 🎒" }
      },
      {
        text: { en: "Buy a fixed amount regularly.", id: "Membeli dengan jumlah tetap secara rutin (DCA)." },
        readinessScore: 2,
        explanation: { en: "Consistency 👑", id: "Konsisten itu oke 👑" }
      }
    ]
  }
];
