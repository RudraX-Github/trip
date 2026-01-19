import React, { useState } from 'react';
import { 
  Heart, 
  Umbrella, 
  Martini, 
  Leaf, 
  Mountain, 
  Crown, 
  Car, 
  Camera, 
  Utensils, 
  Home, 
  Music, 
  Fuel, 
  Bed, 
  Sun, 
  Landmark, 
  Coffee, 
  Waves, 
  Cloud
} from 'lucide-react';

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