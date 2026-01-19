import React, { useState } from 'react';

// --- Inline Icon Components (Replaces lucide-react dependency) ---
const IconBase = ({ children, color, size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    style={{ color: color }}
  >
    {children}
  </svg>
);

const Heart = (props) => <IconBase {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconBase>;
const Umbrella = (props) => <IconBase {...props}><path d="M22 12a10.06 10.06 0 0 0-10-10A10.06 10.06 0 0 0 2 12"/><path d="M12 12v8a2 2 0 0 0 4 0"/><path d="M12 2v1"/></IconBase>;
const Martini = (props) => <IconBase {...props}><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></IconBase>;
const Leaf = (props) => <IconBase {...props}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></IconBase>;
const Mountain = (props) => <IconBase {...props}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></IconBase>;
const Crown = (props) => <IconBase {...props}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></IconBase>;
const Car = (props) => <IconBase {...props}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></IconBase>;
const Camera = (props) => <IconBase {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconBase>;
const Utensils = (props) => <IconBase {...props}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></IconBase>;
const Home = (props) => <IconBase {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></IconBase>;
const Music = (props) => <IconBase {...props}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></IconBase>;
const Fuel = (props) => <IconBase {...props}><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></IconBase>;
const Bed = (props) => <IconBase {...props}><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></IconBase>;
const Sun = (props) => <IconBase {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></IconBase>;
const Landmark = (props) => <IconBase {...props}><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></IconBase>;
const Coffee = (props) => <IconBase {...props}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/></IconBase>;
const Waves = (props) => <IconBase {...props}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></IconBase>;
const Cloud = (props) => <IconBase {...props}><path d="M17.5 19c0-1.7-1.3-3-3-3h-1.1c-.5-2.3-2.5-4-4.9-4-2.9 0-5.3 2.1-5.8 5H2.5C1.1 17 0 18.1 0 19.5S1.1 22 2.5 22h15c1.7 0 3-1.3 3-3z"/></IconBase>;

const App = () => {
  const [activeTab, setActiveTab] = useState('diu-classic');

  // Tab Configuration
  const tabs = [
    { id: 'diu-classic', label: 'દીવ ક્લાસિક', icon: Umbrella, color: 'pink' },
    { id: 'diu-romantic', label: 'દીવ લક્ઝરી', icon: Martini, color: 'pink' },
    { id: 'dhari', label: 'ધારી અને ગીર', icon: Leaf, color: 'emerald' },
    { id: 'junagadh', label: 'જૂનાગઢ દર્શન', icon: Mountain, color: 'indigo' },
    { id: 'gondal', label: 'ગોંડલ રજવાડી', icon: Crown, color: 'amber' },
  ];

  // Data for each itinerary
  const content = {
    'diu-classic': {
      title: 'દરિયાઈ લહેરનો માર્ગ',
      description: 'ફરવા, દરિયાકિનારા અને ભક્તિનો સુંદર સંગમ.',
      colorTheme: 'blue',
      stats: [
        { icon: Fuel, text: 'ડ્રાઇવિંગ' },
        { icon: Camera, text: 'સાઈટસીઈંગ' }
      ],
      items: [
        { 
          time: 'સવારે ૦૮:૩૦', 
          title: 'જસવંતગઢથી પ્રસ્થાન', 
          desc: 'ધારી-ઉના રોડ દ્વારા મુસાફરી શરૂ કરો. ગીરના જંગલોની પ્રાકૃતિક સુંદરતાનો આનંદ લો.',
          icon: Car,
          tag: { text: 'ટીપ: રોમેન્ટિક ગીતો વગાડો.', icon: Music, color: 'pink' }
        },
        { 
          time: '૧૧:૦૦ - ૧૨:૦૦', 
          title: 'નાયડા ગુફાઓ', 
          desc: 'એક અદભૂત, ભુલભુલામણી જેવી ખડકોની રચના. ફોટોગ્રાફી માટે આ જગ્યા શ્રેષ્ઠ છે.',
          icon: Camera,
          tag: { text: 'શ્રેષ્ઠ ફોટો સ્પોટ', color: 'purple' }
        },
        { 
          time: '૧૨:૦૦ - ૦૧:૩૦', 
          title: 'લક્ઝરી લંચ', 
          desc: 'રાધિકા બીચ રિસોર્ટ અથવા કોસ્ટામર બીચ રિસોર્ટ પર જાઓ. શાંતિપૂર્ણ ભોજનનો આનંદ લો.',
          icon: Utensils
        },
        { 
          time: '૦૧:૩૦ - ૦૩:૦૦', 
          title: 'નાગવા અથવા ઘોઘલા બીચ', 
          desc: 'નાગવા (વધુ ભીડ) અથવા ઘોઘલા (શાંત) બીચની મુલાકાત લો. દરિયાકિનારે આરામ કરો.',
          icon: Umbrella,
          tag: { text: 'ટીપ: શાંતિ માટે ઘોઘલા બીચ શ્રેષ્ઠ છે.', icon: Heart, color: 'pink' }
        },
        { 
          time: '૦૩:૦૦ - ૦૩:૩૦', 
          title: 'ગંગેશ્વર મહાદેવ', 
          desc: 'દરિયા કિનારે આવેલું શિવ મંદિર જ્યાં દરિયાના મોજા ૫ શિવલિંગનો અભિષેક કરે છે.',
          icon: Landmark
        },
        { 
          time: '૦૩:૩૦ - ૦૬:૦૦', 
          title: 'પરત મુસાફરી', 
          desc: 'સાંજે ૬:૦૦ સુધીમાં જસવંતગઢ પહોંચવા માટે ૩:૩૦ વાગ્યે દીવ છોડો.',
          icon: Home,
          tag: { text: 'જરૂર જણાય તો ધારીમાં ચા માટે રોકાઈ શકો છો.', icon: Coffee, color: 'gray' }
        }
      ]
    },
    'diu-romantic': {
      title: '"ડે-કેશન" રૂટ',
      description: 'ફરવાને બદલે એકબીજા સાથે સમય વિતાવવા માટે શ્રેષ્ઠ.',
      colorTheme: 'pink',
      stats: [
        { icon: Bed, text: 'રિસોર્ટ આરામ' }
      ],
      items: [
        { 
          time: 'સવારે ૦૮:૩૦', 
          title: 'રોમેન્ટિક ડ્રાઈવ', 
          desc: 'જસવંતગઢથી પ્રસ્થાન. દ્રોણેશ્વર ડેમ (ઉના પાસે) ખાતે ફોટા માટે ટૂંકું રોકાણ કરી શકો છો.',
          icon: Car
        },
        { 
          time: '૧૦:૪૫', 
          title: 'શાંત બીચ વોક (ઘોઘલા)', 
          desc: 'ઘોઘલા બીચના છેવાડે જાઓ. અહીં ભીડ ઓછી હોય છે. દરિયાકિનારે શાંતિથી ચાલો.',
          icon: Waves
        },
        { 
          time: '૧૨:૦૦ - ૦૩:૦૦', 
          title: 'રિસોર્ટ "ડે-કેશન"', 
          desc: 'રાધિકા, કોસ્ટામર અથવા ફર્ન ટેન્ટ રિસોર્ટમાં "ડે-યુઝ" રૂમ બુક કરો. ૩-૪ કલાક માટે આરામ કરો અને લંચ લો.',
          sublist: ['પ્રાઇવેટ લંચનો આનંદ લો.', 'ગરમીથી બચવા AC માં આરામ કરો.'],
          icon: Bed
        },
        { 
          time: '૦૩:૦૦', 
          title: 'નાયડા ગુફાઓ', 
          desc: 'બપોરના સૂર્યપ્રકાશમાં ગુફાઓ અદભૂત લાગે છે. ફોટા માટે શ્રેષ્ઠ સમય.',
          icon: Sun
        },
        { 
          time: '૦૪:૦૦ - ૦૬:૦૦', 
          title: 'ઘર તરફ પ્રયાણ', 
          desc: 'સાંજના સુંદર વાતાવરણમાં ડ્રાઇવ કરી ૬:૦૦ વાગ્યે ઘરે પહોંચો.',
          icon: Home
        }
      ]
    },
    'dhari': {
      title: 'કુદરત અને ભક્તિ',
      description: 'ગીરના જંગલો, ડેમ અને શાંત મંદિરોની મુસાફરી.',
      colorTheme: 'emerald',
      stats: [
        { icon: Leaf, text: 'હરિયાળી' },
        { icon: Utensils, text: 'પ્રીમિયમ લંચ' }
      ],
      items: [
        { 
          time: '૦૯:૪૫ - ૧૦:૪૫', 
          title: 'ખોડિયાર ડેમ અને ગળધરા', 
          desc: 'ખોડિયાર માતાજીના મંદિરના દર્શન. મંદિરની પાછળ શેત્રુંજી નદીના સુંદર દ્રશ્યો છે.',
          icon: Waves
        },
        { 
          time: '૧૨:૧૫ - ૦૧:૧૫', 
          title: 'તુલસીશ્યામ (ગીર)', 
          desc: 'ગીર જંગલની વચ્ચે પ્રાચીન વિષ્ણુ મંદિર અને ગરમ પાણીના ઝરાના દર્શન કરો.',
          icon: Leaf
        },
        { 
          time: '૦૨:૩૦ - ૦૪:૦૦', 
          title: 'ધ ફર્ન વિસ્ટેરિયામાં લંચ', 
          desc: 'ધારી પરત ફરીને "ધ ફર્ન વિસ્ટેરિયા" રિસોર્ટમાં શાંતિથી જમો. અહીંનું વાતાવરણ ખૂબ સુંદર છે.',
          icon: Utensils
        },
        { 
          time: '૦૪:૦૦ - ૦૬:૦૦', 
          title: 'ભોજલધામ અને પરત', 
          desc: 'અમરેલી પરત ફરતી વખતે ફતેપુર (ભોજલધામ) દર્શન કરી શકાય. ૬:૦૦ વાગ્યે જસવંતગઢ પહોંચો.',
          icon: Home
        }
      ]
    },
    'junagadh': {
      title: 'જૂનાગઢની ઊંચાઈઓ',
      description: 'રોપવે સફર, ઐતિહાસિક સ્થાપત્ય અને લક્ઝરી લંચ.',
      colorTheme: 'indigo',
      stats: [
        { icon: Mountain, text: 'રોપવે વ્યૂ' },
        { icon: Camera, text: 'ફોટોગ્રાફી' }
      ],
      items: [
        { 
          time: '૧૦:૪૫', 
          title: 'ગિરનાર રોપવે (ઉડન ખટોલા)', 
          desc: 'રોપવે દ્વારા ગિરનાર ઉપર જાઓ. વાદળોની ઉપર સફર કરવાનો લહાવો લો. અંબાજી મંદિર સુધી જાઓ.',
          icon: Cloud,
          tag: { text: 'ટીપ: શક્ય હોય તો પ્રાઇવેટ કેબિન લો.', color: 'indigo' }
        },
        { 
          time: '૧૨:૪૫', 
          title: 'મહોબત મકબરા', 
          desc: 'ગોથિક અને ઇસ્લામિક સ્થાપત્યનો અદભૂત નમૂનો. અહીં ફોટા ખૂબ સુંદર આવે છે.',
          icon: Landmark
        },
        { 
          time: '૦૧:૩૦', 
          title: 'ધ ફર્ન લિયોમાં લંચ', 
          desc: 'પેટલ્સ રેસ્ટોરન્ટમાં લંચ લો. અહીંનું વાતાવરણ કપલ માટે ખૂબ જ શાંત અને સારું છે.',
          icon: Utensils
        },
        { 
          time: '૦૩:૦૦ - ૦૬:૦૦', 
          title: 'વિલિંગ્ડન ડેમ અને પરત', 
          desc: 'પર્વતોથી ઘેરાયેલું શાંત તળાવ. અહીં થોડો સમય વિતાવી ૪:૦૦ વાગ્યે પરત નીકળો.',
          icon: Waves
        }
      ]
    },
    'gondal': {
      title: 'રજવાડી સફર',
      description: 'વિન્ટેજ કાર, મહેલો અને ભવ્ય ખોડલધામ મંદિર.',
      colorTheme: 'amber',
      stats: [
        { icon: Crown, text: 'હેરિટેજ' },
        { icon: Car, text: '૧૫૦ કિમી રાઉન્ડ ટ્રીપ' }
      ],
      items: [
        { 
          time: '૧૦:૦૦ - ૧૧:૩૦', 
          title: 'ગોંડલ: પેલેસ અને વિન્ટેજ કાર', 
          desc: 'નૌલખા પેલેસ અને રોયલ વિન્ટેજ કાર મ્યુઝિયમ જુઓ. આ જગ્યા ખૂબ જ ક્લાસી છે.',
          icon: Landmark
        },
        { 
          time: '૧૧:૪૫ - ૦૧:૧૫', 
          title: 'રજવાડી લંચ: ઓર્ચાર્ડ પેલેસ', 
          desc: 'મોર અને બગીચાઓ વચ્ચે હેરિટેજ પ્રોપર્ટીમાં જમવાનો આનંદ લો. જતાં પહેલાં ફોન કરીને કન્ફર્મ કરવું.',
          icon: Utensils
        },
        { 
          time: '૦૨:૧૫ - ૦૩:૪૫', 
          title: 'ખોડલધામ મંદિર', 
          desc: 'વિશાળ અને સુંદર બગીચાઓ. બપોરના સમયે અહીં શાંતિથી ચાલવાની મજા આવશે.',
          icon: Landmark
        },
        { 
          time: '૦૪:૦૦ - ૦૬:૦૦', 
          title: 'પરત અને નાસ્તો', 
          desc: 'વીરપુર પાસે હાઈવે પર ચા-નાસ્તો કરી સાંજે ૬:૦૦ વાગ્યે જસવંતગઢ પહોંચો.',
          icon: Home
        }
      ]
    }
  };

  const activeContent = content[activeTab];

  return (
    <div className="min-h-screen bg-pink-50 text-gray-700 font-sans pb-10" style={{ fontFamily: '"Noto Sans Gujarati", sans-serif' }}>
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
      `}</style>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-pink-800 to-rose-600 text-white py-10 px-4 md:py-12 md:px-6 shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block p-3 rounded-full bg-white/20 mb-3 animate-pulse">
            <Heart size={32} fill="white" />
          </div>
          <h1 className="text-2xl md:text-5xl font-bold mb-3 leading-tight">રોમેન્ટિક પ્રવાસ આયોજક</h1>
          <p className="text-base md:text-xl font-light opacity-90">જસવંતગઢથી પ્રસ્થાન • સવારે ૦૮:૩૦ થી સાંજે ૦૬:૦૦</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-2 md:px-4">
          <div className="flex overflow-x-auto space-x-3 py-4 px-2 no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              
              // Color mapping for active state
              const colorClasses = {
                pink: 'bg-pink-700 border-pink-900',
                emerald: 'bg-emerald-700 border-emerald-900',
                indigo: 'bg-indigo-700 border-indigo-900',
                amber: 'bg-amber-700 border-amber-900'
              };

              // Base classes for inactive state with colored text
              const inactiveColorText = {
                pink: 'text-pink-700 bg-pink-50 hover:bg-pink-100 border-pink-200',
                emerald: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
                indigo: 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
                amber: 'text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200'
              };

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-4 py-2 md:px-6 rounded-full font-semibold whitespace-nowrap text-sm md:text-base border shadow-sm flex-shrink-0 transition-all duration-300
                    ${isActive 
                      ? `${colorClasses[tab.color]} text-white border-b-4 transform -translate-y-[2px]` 
                      : `${inactiveColorText[tab.color]} border`
                    }
                  `}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 md:px-4 py-6 md:py-8 min-h-screen">
        
        {/* Info Card */}
        <div className={`
          bg-white rounded-2xl shadow-lg p-5 mb-8 border-l-8 animate-fade-in
          ${activeContent.colorTheme === 'blue' ? 'border-blue-400' : ''}
          ${activeContent.colorTheme === 'pink' ? 'border-pink-400' : ''}
          ${activeContent.colorTheme === 'emerald' ? 'border-emerald-400' : ''}
          ${activeContent.colorTheme === 'indigo' ? 'border-indigo-400' : ''}
          ${activeContent.colorTheme === 'amber' ? 'border-amber-400' : ''}
        `}>
          <h2 className={`text-xl md:text-3xl font-bold mb-2
            ${activeContent.colorTheme === 'blue' ? 'text-blue-800' : ''}
            ${activeContent.colorTheme === 'pink' ? 'text-pink-800' : ''}
            ${activeContent.colorTheme === 'emerald' ? 'text-emerald-800' : ''}
            ${activeContent.colorTheme === 'indigo' ? 'text-indigo-800' : ''}
            ${activeContent.colorTheme === 'amber' ? 'text-amber-800' : ''}
          `}>
            {activeContent.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">{activeContent.description}</p>
          <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-500 font-semibold">
            {activeContent.stats.map((stat, idx) => (
              <span key={idx} className={`px-2 py-1 rounded flex items-center
                ${activeContent.colorTheme === 'blue' ? 'bg-blue-50' : ''}
                ${activeContent.colorTheme === 'pink' ? 'bg-pink-50' : ''}
                ${activeContent.colorTheme === 'emerald' ? 'bg-emerald-50' : ''}
                ${activeContent.colorTheme === 'indigo' ? 'bg-indigo-50' : ''}
                ${activeContent.colorTheme === 'amber' ? 'bg-amber-50' : ''}
              `}>
                <stat.icon size={14} className="mr-1" /> {stat.text}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-1 md:pl-2 animate-fade-in">
          {activeContent.items.map((item, index) => {
            const isLast = index === activeContent.items.length - 1;
            const ItemIcon = item.icon;

            // Determine colors for this specific item's icon circle
            // (Using the theme color for simplicity, or specific if needed)
            const themeColors = {
              blue: { bg: 'bg-blue-100', text: 'text-blue-600', tagBg: 'bg-blue-600' },
              pink: { bg: 'bg-pink-100', text: 'text-pink-600', tagBg: 'bg-pink-600' },
              emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', tagBg: 'bg-emerald-600' },
              indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', tagBg: 'bg-indigo-600' },
              amber: { bg: 'bg-amber-100', text: 'text-amber-600', tagBg: 'bg-amber-600' }
            };
            
            // Special case for "Return Home" usually green
            const isHome = item.title.includes('પરત') || item.title.includes('ઘર');
            const iconBg = isHome ? 'bg-green-100' : themeColors[activeContent.colorTheme].bg;
            const iconColor = isHome ? 'text-green-600' : themeColors[activeContent.colorTheme].text;
            const timeBadgeBg = themeColors[activeContent.colorTheme].tagBg;

            return (
              <div key={index} className={`relative pl-14 md:pl-16 ${isLast ? '' : 'pb-12'}`}>
                {/* Vertical Line */}
                {!isLast && (
                  <div className="absolute left-[24px] top-[48px] bottom-[-48px] w-[2px] bg-gray-200 z-0"></div>
                )}

                {/* Icon Bubble */}
                <div className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 ${iconBg}`}>
                  <ItemIcon size={20} className={iconColor} />
                </div>

                {/* Card */}
                <div className="bg-white/95 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-100 shadow-md">
                  <span className={`inline-block text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded mb-2 ${isHome ? 'bg-gray-800' : timeBadgeBg}`}>
                    {item.time}
                  </span>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                  
                  {/* Sublist (if any) */}
                  {item.sublist && (
                    <ul className="list-disc ml-5 mt-2 text-xs md:text-sm text-gray-600 space-y-1">
                      {item.sublist.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                  )}

                  {/* Tag/Tip (if any) */}
                  {item.tag && (
                    <div className={`mt-3 text-xs md:text-sm font-semibold inline-flex items-center px-2 py-1 rounded
                      ${item.tag.color === 'pink' ? 'bg-pink-50 text-pink-600' : ''}
                      ${item.tag.color === 'purple' ? 'bg-purple-100 text-purple-800' : ''}
                      ${item.tag.color === 'gray' ? 'bg-gray-50 text-gray-500' : ''}
                      ${item.tag.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : ''}
                    `}>
                      {item.tag.icon && <item.tag.icon size={12} className="mr-1" />}
                      {item.tag.text}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 px-4 text-center">
        <p className="font-serif italic text-lg md:text-xl mb-3 text-pink-200">"તમારી સાથે કરેલી દરેક સફર, મારી જિંદગીની સૌથી સુંદર યાદ છે."</p>
        <p className="text-xs md:text-sm opacity-60">સાવચેતીથી ડ્રાઇવ કરો અને તમારા સમયનો આનંદ માણો.</p>
      </footer>
    </div>
  );
};

export default App;