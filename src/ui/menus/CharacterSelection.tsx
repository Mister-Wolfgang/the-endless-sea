import { useState } from 'react';

export interface Character {
  id: string;
  name: string;
  description: string;
  class: string;
  stats: {
    navigation: number;
    combat: number;
    diplomacy: number;
    commerce: number;
  };
  avatar?: string;
}

export interface CharacterSelectionProps {
  onSelect: (character: Character) => void;
  onCancel: () => void;
}

// Personnages disponibles
const AVAILABLE_CHARACTERS: Character[] = [
  {
    id: 'navigator',
    name: 'Capitaine Morgan',
    description: 'Un navigateur expérimenté qui connaît les secrets des océans.',
    class: 'Navigateur',
    stats: {
      navigation: 9,
      combat: 6,
      diplomacy: 7,
      commerce: 5,
    },
  },
  {
    id: 'warrior',
    name: 'Corsaire Blackheart',
    description: 'Un guerrier redoutable qui règne par la force.',
    class: 'Corsaire',
    stats: {
      navigation: 6,
      combat: 9,
      diplomacy: 5,
      commerce: 7,
    },
  },
  {
    id: 'diplomat',
    name: 'Ambassadeur Solis',
    description: 'Un diplomate habile qui préfère la négociation au combat.',
    class: 'Diplomate',
    stats: {
      navigation: 5,
      combat: 4,
      diplomacy: 9,
      commerce: 8,
    },
  },
  {
    id: 'merchant',
    name: 'Marchand Goldwind',
    description: 'Un commerçant rusé qui transforme tout en profit.',
    class: 'Marchand',
    stats: {
      navigation: 7,
      combat: 5,
      diplomacy: 8,
      commerce: 9,
    },
  },
];

export function CharacterSelection({ onSelect, onCancel }: CharacterSelectionProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const renderStatBar = (value: number) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${(value / 10) * 100}%`,
            height: '100%',
            backgroundColor: value >= 8 ? '#4caf50' : value >= 6 ? '#ff9800' : '#f44336',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <span style={{ fontSize: '0.9rem', minWidth: '20px' }}>{value}/10</span>
    </div>
  );

  const handleConfirm = () => {
    if (selectedCharacter) {
      onSelect(selectedCharacter);
    }
  };

  return (
    <div style={{ minWidth: '800px', maxWidth: '1000px' }}>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.8rem',
          background: 'linear-gradient(45deg, #4fc3f7, #81c784)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Choisissez votre Capitaine
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {AVAILABLE_CHARACTERS.map((character) => (
          <div
            key={character.id}
            onClick={() => setSelectedCharacter(character)}
            style={{
              background: selectedCharacter?.id === character.id
                ? 'rgba(79, 195, 247, 0.3)'
                : 'rgba(255, 255, 255, 0.1)',
              border: selectedCharacter?.id === character.id
                ? '2px solid #4fc3f7'
                : '2px solid transparent',
              borderRadius: '8px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: selectedCharacter?.id === character.id ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (selectedCharacter?.id !== character.id) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCharacter?.id !== character.id) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4fc3f7, #81c784)',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {character.name.charAt(0)}
            </div>

            <h3
              style={{
                textAlign: 'center',
                margin: '0 0 0.5rem',
                fontSize: '1.3rem',
                fontWeight: 'bold',
              }}
            >
              {character.name}
            </h3>

            <p
              style={{
                textAlign: 'center',
                color: '#4fc3f7',
                margin: '0 0 1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {character.class}
            </p>

            <p
              style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0 0 1.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.4',
              }}
            >
              {character.description}
            </p>

            {/* Statistiques */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', minWidth: '80px' }}>Navigation:</span>
                {renderStatBar(character.stats.navigation)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', minWidth: '80px' }}>Combat:</span>
                {renderStatBar(character.stats.combat)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', minWidth: '80px' }}>Diplomatie:</span>
                {renderStatBar(character.stats.diplomacy)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', minWidth: '80px' }}>Commerce:</span>
                {renderStatBar(character.stats.commerce)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Boutons d'action */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <button
          onClick={onCancel}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          Annuler
        </button>

        <button
          onClick={handleConfirm}
          disabled={!selectedCharacter}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            background: selectedCharacter
              ? 'linear-gradient(135deg, #4fc3f7, #81c784)'
              : 'rgba(255, 255, 255, 0.1)',
            border: '2px solid transparent',
            borderRadius: '8px',
            color: 'white',
            cursor: selectedCharacter ? 'pointer' : 'not-allowed',
            opacity: selectedCharacter ? 1 : 0.5,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (selectedCharacter) {
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCharacter) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          Commencer l'Aventure
        </button>
      </div>
    </div>
  );
}
