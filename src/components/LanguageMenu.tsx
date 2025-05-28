import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'country-flag-icons/react/3x2';

import * as Flags from './Flags';

// Mapping des codes de langue vers les drapeaux et labels
const LANG_CONFIG: Record<string, { label: string; Flag: any }> = {
  en: { label: 'English', Flag: Flags.GB },
  zh: { label: '中文', Flag: Flags.CN },
  hi: { label: 'हिन्दी', Flag: Flags.IN },
  es: { label: 'Español', Flag: Flags.ES },
  fr: { label: 'Français', Flag: Flags.FR },
  ar: { label: 'العربية', Flag: Flags.SA },
  bn: { label: 'বাংলা', Flag: Flags.BD },
  ru: { label: 'Русский', Flag: Flags.RU },
  pt: { label: 'Português', Flag: Flags.PT },
  ur: { label: 'اردو', Flag: Flags.PK },
  de: { label: 'Deutsch', Flag: Flags.DE },
  ja: { label: '日本語', Flag: Flags.JP },
  sw: { label: 'Kiswahili', Flag: Flags.KE },
  mr: { label: 'मराठी', Flag: Flags.IN },
  te: { label: 'తెలుగు', Flag: Flags.IN },
  vi: { label: 'Tiếng Việt', Flag: Flags.VN },
  ta: { label: 'தமிழ்', Flag: Flags.IN },
  tr: { label: 'Türkçe', Flag: Flags.TR },
  it: { label: 'Italiano', Flag: Flags.IT },
  ko: { label: '한국어', Flag: Flags.KR },
  pl: { label: 'Polski', Flag: Flags.PL },
  jv: { label: 'Basa Jawa', Flag: Flags.ID },
  fa: { label: 'فارسی', Flag: Flags.IR },
  nl: { label: 'Nederlands', Flag: Flags.NL },
  ms: { label: 'Bahasa Melayu', Flag: Flags.MY },
  ro: { label: 'Română', Flag: Flags.RO },
  ha: { label: 'Hausa', Flag: Flags.NG },
  th: { label: 'ไทย', Flag: Flags.TH },
  gu: { label: 'ગુજરાતી', Flag: Flags.IN },
  uk: { label: 'Українська', Flag: Flags.UA },
  pa: { label: 'ਪੰਜਾਬੀ', Flag: Flags.IN },
  ml: { label: 'മലയാളം', Flag: Flags.IN },
  am: { label: 'አማርኛ', Flag: Flags.ET },
  ig: { label: 'Igbo', Flag: Flags.NG },
  yo: { label: 'Yorùbá', Flag: Flags.NG },
  my: { label: 'မြန်မာစာ', Flag: Flags.MM },
  uz: { label: 'O‘zbek', Flag: Flags.UZ },
  ceb: { label: 'Cebuano', Flag: Flags.PH },
  or: { label: 'ଓଡ଼ିଆ', Flag: Flags.IN },
  bho: { label: 'भोजपुरी', Flag: Flags.IN },
  sd: { label: 'سنڌي', Flag: Flags.PK },
  so: { label: 'Soomaali', Flag: Flags.SO },
  rw: { label: 'Kinyarwanda', Flag: Flags.RW },
  el: { label: 'Ελληνικά', Flag: Flags.GR },
  he: { label: 'עברית', Flag: Flags.IL },
  cs: { label: 'Čeština', Flag: Flags.CZ },
  sv: { label: 'Svenska', Flag: Flags.SE },
  hu: { label: 'Magyar', Flag: Flags.HU },
  tlh: { label: 'tlhIngan Hol (Klingon)', Flag: Flags.KLINGON },
  x_pirate: { label: 'Pirate 🏴‍☠️', Flag: Flags.PIRATE },
  sdn: { label: 'Sindarin', Flag: Flags.ELF },
  qya: { label: 'Quenya', Flag: Flags.ELF },
  dth: { label: 'Dothraki', Flag: Flags.GOT },
  val: { label: 'Valyrian', Flag: Flags.GOT },
  xminion: { label: 'Minionese', Flag: Flags.MINION },
  xvulcan: { label: 'Vulcan 🖖', Flag: Flags.VULCAN },
  xhutt: { label: 'Huttese', Flag: Flags.STARWARS },
  xmandoa: { label: 'Mando’a', Flag: Flags.STARWARS },
  xbinary: { label: 'Binary (droid)', Flag: Flags.ROBOT },
  xemoji: { label: 'Emoji 😊🔤', Flag: Flags.EMOJI },
  xleet: { label: '1337 (Leet Speak)', Flag: Flags.HACKER },
  xsith: { label: 'Sith', Flag: Flags.STARWARS },
  xancient: { label: 'Langue Ancienne', Flag: Flags.MYSTIC },
  xgallifreyan: { label: 'Gallifreyan', Flag: Flags.WHO },
  // Fallback générique pour les langues non répertoriées
};

export function LanguageMenu() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  // Récupérer dynamiquement les langues disponibles depuis i18next
  const availableLanguages = useMemo(() => {
    // Utiliser les ressources chargées au lieu de i18n.languages qui peut changer
    const loadedResources = i18n.store?.data || {};
    const languages = Object.keys(loadedResources);

    // Fallback si aucune ressource n'est trouvée
    const finalLanguages = languages.length > 0 ? languages : ['en', 'fr'];

    console.log('🌍 Langues détectées dans LanguageMenu:', finalLanguages);

    return finalLanguages
      .filter((lang) => lang !== 'cimode') // Exclure le mode de développement i18next
      .map((code) => ({
        code,
        label: LANG_CONFIG[code]?.label || code.toUpperCase(),
        Flag: LANG_CONFIG[code]?.Flag || Flags.GB, // Drapeau UK par défaut
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Trier par nom
  }, [i18n.store?.data]); // Dépendre des ressources plutôt que de i18n.languages

  const current =
    availableLanguages.find((l) => l.code === i18n.language) ||
    availableLanguages[0];

  // Debug pour tracer les changements
  useEffect(() => {
    console.log('🔄 LanguageMenu re-render:', {
      currentLanguage: i18n.language,
      availableLanguages: availableLanguages.map((l) => l.code),
      storeData: Object.keys(i18n.store?.data || {}),
    });
  }, [i18n.language, availableLanguages]);

  return (
    <div style={{ position: 'absolute', top: 16, right: 24, zIndex: 100 }}>
      <button
        aria-label="Choisir la langue"
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'rgba(20,30,40,0.85)',
          border: 'none',
          borderRadius: '50%',
          width: 40,
          height: 40,
          color: 'white',
          fontSize: 22,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0008',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {current && (
          <current.Flag
            style={{
              width: 24,
              height: 16,
              borderRadius: 2,
              boxShadow: '0 1px 2px #0004',
            }}
          />
        )}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 0,
            background: 'rgba(20,30,40,0.97)',
            borderRadius: 8,
            boxShadow: '0 2px 8px #000a',
            padding: 8,
            minWidth: 120,
          }}
        >
          {availableLanguages.map((lang) => {
            const FlagIcon = lang.Flag;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  background:
                    lang.code === i18n.language
                      ? 'rgba(79, 195, 247, 0.2)'
                      : 'none',
                  border:
                    lang.code === i18n.language
                      ? '1px solid #4fc3f7'
                      : '1px solid transparent',
                  color: lang.code === i18n.language ? '#4fc3f7' : 'white',
                  fontWeight: lang.code === i18n.language ? 'bold' : 'normal',
                  fontSize: 16,
                  padding: '6px 8px',
                  cursor: lang.code === i18n.language ? 'default' : 'pointer',
                  borderRadius: 4,
                  marginBottom: 2,
                  opacity: lang.code === i18n.language ? 0.8 : 1,
                }}
                disabled={lang.code === i18n.language}
              >
                <FlagIcon
                  style={{
                    width: 24,
                    height: 16,
                    marginRight: 8,
                    borderRadius: 2,
                    boxShadow: '0 1px 2px #0004',
                  }}
                />
                {lang.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
