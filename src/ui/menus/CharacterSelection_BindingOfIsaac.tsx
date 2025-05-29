import { useState, useCallback, useEffect } from 'react';
import { Modal } from '../components/Modal';
import { CharacterData, GameMode, CharacterSelectionState } from '../../shared/types/character';

export interface CharacterSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (character: CharacterData, mode: GameMode, seed?: string) => void;
}

// Données de test des personnages (style Binding of Isaac pour The Endless Sea)
const CHARACTERS: CharacterData[] = [
  {
    id: 'isaac',
    name: 'isaac',
    displayName: 'ISAAC',
    description: 'A young sailor seeking adventure',
    bonusText: 'BALANCED START DECENT LUCK',
    stats: { health: 3, damage: 3, speed: 1, luck: 0, range: 6 },
    startingItem: 'Compass',
    unlocked: true,
    avatar: '👶',
  },
  {
    id: 'magdalene',
    name: 'magdalene', 
    displayName: 'MAGDALENE',
    description: 'A blessed healer of the seas',
    bonusText: 'MORE HEALTH SLOWER START',
    stats: { health: 4, damage: 2, speed: 0, luck: 1, range: 6 },
    startingItem: 'Healing Potion',
    unlocked: true,
    avatar: '👩‍⚕️',
  },
  {
    id: 'cain',
    name: 'cain',
    displayName: 'CAIN', 
    description: 'A one-eyed pirate captain',
    bonusText: 'HIGH DAMAGE LOW HEALTH',
    stats: { health: 2, damage: 4, speed: 1, luck: 2, range: 7 },
    startingItem: 'Lucky Coin',
    unlocked: true,
    avatar: '🏴‍☠️',
  },
  {
    id: 'judas',
    name: 'judas',
    displayName: 'JUDAS',
    description: 'A cursed merchant of the depths',
    bonusText: 'GLASS CANNON BUILD',
    stats: { health: 1, damage: 5, speed: 1, luck: -1, range: 6 },
    startingItem: 'Devil\'s Contract',
    unlocked: false, // Personnage verrouillé
    avatar: '😈',
  },
  {
    id: 'eve',
    name: 'eve',
    displayName: 'EVE',
    description: 'A mysterious sea witch',
    bonusText: 'CURSED BUT POWERFUL',
    stats: { health: 2, damage: 3, speed: 1, luck: -2, range: 5 },
    startingItem: 'Curse of the Deep',
    unlocked: false, // Personnage verrouillé
    avatar: '🧙‍♀️',
  },
];

const GAME_MODES: GameMode[] = [
  {
    id: 'normal',
    name: 'normal',
    displayName: 'NORMAL',
    unlocked: true,
    description: 'Standard difficulty for new sailors',
  },
  {
    id: 'hard',
    name: 'hard', 
    displayName: 'HARD',
    unlocked: true,
    description: 'Treacherous waters for experienced captains',
  },
  {
    id: 'greed',
    name: 'greed',
    displayName: 'GREED',
    unlocked: false,
    description: 'Endless treasure hunt mode',
  },
  {
    id: 'greedier',
    name: 'greedier',
    displayName: 'GREEDIER',
    unlocked: false,
    description: 'Ultra challenging treasure mode',
  },
];

export function CharacterSelection({ isOpen, onClose, onStartGame }: CharacterSelectionProps) {
  const [state, setState] = useState<CharacterSelectionState>({
    selectedCharacterId: 'isaac',
    selectedModeId: 'normal',
    winStreak: -1, // Style Binding of Isaac (-1 = défaite récente)
    seed: '',
    characters: CHARACTERS,
    modes: GAME_MODES,
  });

  const selectedCharacter = state.characters.find(c => c.id === state.selectedCharacterId)!;
  const selectedMode = state.modes.find(m => m.id === state.selectedModeId)!;

  // Navigation des personnages
  const selectPreviousCharacter = useCallback(() => {
    const unlockedChars = state.characters.filter(c => c.unlocked);
    const currentIndex = unlockedChars.findIndex(c => c.id === state.selectedCharacterId);
    const prevIndex = (currentIndex - 1 + unlockedChars.length) % unlockedChars.length;
    setState(prev => ({ ...prev, selectedCharacterId: unlockedChars[prevIndex].id }));
  }, [state.characters, state.selectedCharacterId]);

  const selectNextCharacter = useCallback(() => {
    const unlockedChars = state.characters.filter(c => c.unlocked);
    const currentIndex = unlockedChars.findIndex(c => c.id === state.selectedCharacterId);
    const nextIndex = (currentIndex + 1) % unlockedChars.length;
    setState(prev => ({ ...prev, selectedCharacterId: unlockedChars[nextIndex].id }));
  }, [state.characters, state.selectedCharacterId]);

  // Navigation des modes
  const selectPreviousMode = useCallback(() => {
    const unlockedModes = state.modes.filter(m => m.unlocked);
    const currentIndex = unlockedModes.findIndex(m => m.id === state.selectedModeId);
    const prevIndex = (currentIndex - 1 + unlockedModes.length) % unlockedModes.length;
    setState(prev => ({ ...prev, selectedModeId: unlockedModes[prevIndex].id }));
  }, [state.modes, state.selectedModeId]);

  const selectNextMode = useCallback(() => {
    const unlockedModes = state.modes.filter(m => m.unlocked);
    const currentIndex = unlockedModes.findIndex(m => m.id === state.selectedModeId);
    const nextIndex = (currentIndex + 1) % unlockedModes.length;
    setState(prev => ({ ...prev, selectedModeId: unlockedModes[nextIndex].id }));
  }, [state.modes, state.selectedModeId]);

  // Gestion clavier
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        selectPreviousCharacter();
        break;
      case 'ArrowRight':
        event.preventDefault();
        selectNextCharacter();
        break;
      case 'ArrowUp':
        event.preventDefault();
        selectPreviousMode();
        break;
      case 'ArrowDown':
        event.preventDefault();
        selectNextMode();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onStartGame(selectedCharacter, selectedMode, state.seed || undefined);
        break;
    }
  }, [selectedCharacter, selectedMode, state.seed, onStartGame, selectPreviousCharacter, selectNextCharacter, selectPreviousMode, selectNextMode]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Styles inspirés de Binding of Isaac
  const bindingOfIsaacStyles = {
    container: {
      fontFamily: '"Courier New", monospace',
      background: `
        radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, #2c1810 0%, #1a0f08 100%)
      `,
      color: '#d4c5b0',
      height: '100%',
      maxHeight: '90vh',
      padding: '2rem',
      border: '3px solid #8b4513',
      borderRadius: '0',
      position: 'relative' as const,
      backgroundImage: `
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(139, 69, 19, 0.1) 10px,
          rgba(139, 69, 19, 0.1) 20px
        )
      `,
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      marginBottom: '2rem',
      color: '#b22222',
      textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000',
      transform: 'rotate(-1deg)',
      letterSpacing: '3px',
    },
    characterRow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      margin: '2rem 0',
    },
    characterPortrait: {
      width: '80px',
      height: '80px',
      border: '3px solid #654321',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: '#3c2414',
    },
    selectedPortrait: {
      border: '3px solid #ff4444',
      backgroundColor: '#4a1f1f',
      transform: 'scale(1.2)',
      boxShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
    },
    lockedPortrait: {
      opacity: 0.3,
      cursor: 'not-allowed',
      filter: 'grayscale(100%)',
    },
    characterName: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      color: '#b22222',
      margin: '1rem 0',
      textShadow: '2px 2px 0px #000000',
      letterSpacing: '2px',
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      margin: '1rem 0',
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.2rem',
    },
    bonusText: {
      textAlign: 'center' as const,
      fontSize: '1rem',
      color: '#ff6666',
      fontStyle: 'italic',
      margin: '1rem 0',
      textShadow: '1px 1px 0px #000000',
    },
    sidePanel: {
      position: 'absolute' as const,
      top: '2rem',
      fontSize: '1rem',
      color: '#d4c5b0',
    },
    leftPanel: {
      left: '2rem',
    },
    rightPanel: {
      right: '2rem',
      textAlign: 'right' as const,
    },
    modeList: {
      marginTop: '1rem',
    },
    modeItem: {
      padding: '0.3rem 0',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
    },
    selectedMode: {
      color: '#ff4444',
      fontWeight: 'bold',
    },
    lockedMode: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    startButton: {
      display: 'block',
      margin: '2rem auto 0',
      padding: '1rem 3rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      backgroundColor: '#b22222',
      color: 'white',
      border: '3px solid #654321',
      borderRadius: '0',
      cursor: 'pointer',
      textShadow: '2px 2px 0px #000000',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
    },
    seedInput: {
      marginTop: '1rem',
      padding: '0.5rem',
      border: '2px solid #654321',
      backgroundColor: '#3c2414',
      color: '#d4c5b0',
      fontFamily: 'inherit',
      fontSize: '0.9rem',
      width: '120px',
    },
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      showCloseButton={false}
      closeOnBackdropClick={false}
      width="80dvw"
      height="80dvh"
    >
      <div style={bindingOfIsaacStyles.container}>
        {/* Titre principal */}
        <h1 style={bindingOfIsaacStyles.title}>WHO AM I?</h1>

        {/* Panel gauche - Win Streak */}
        <div style={{...bindingOfIsaacStyles.sidePanel, ...bindingOfIsaacStyles.leftPanel}}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6666' }}>
            WIN STREAK
          </div>
          <div style={{ fontSize: '2rem', textAlign: 'center', marginTop: '0.5rem' }}>
            {state.winStreak}
          </div>
        </div>

        {/* Panel droit - Modes de jeu */}
        <div style={{...bindingOfIsaacStyles.sidePanel, ...bindingOfIsaacStyles.rightPanel}}>
          <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
            PRESS TAB TO INPUT SEED
          </div>
          <input
            type="text"
            placeholder="SEED"
            value={state.seed}
            onChange={(e) => setState(prev => ({ ...prev, seed: e.target.value.toUpperCase() }))}
            style={bindingOfIsaacStyles.seedInput}
            maxLength={8}
          />
          
          <div style={bindingOfIsaacStyles.modeList}>
            <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
              USE UP/DOWN TO SELECT
            </div>
            {state.modes.map((mode) => (
              <div
                key={mode.id}
                style={{
                  ...bindingOfIsaacStyles.modeItem,
                  ...(mode.id === state.selectedModeId ? bindingOfIsaacStyles.selectedMode : {}),
                  ...(mode.unlocked ? {} : bindingOfIsaacStyles.lockedMode),
                }}
                onClick={() => mode.unlocked && setState(prev => ({ ...prev, selectedModeId: mode.id }))}
              >
                {mode.displayName}
              </div>
            ))}
          </div>
        </div>

        {/* Sélection de personnages */}
        <div style={bindingOfIsaacStyles.characterRow}>
          {state.characters.map((character) => (
            <div
              key={character.id}
              style={{
                ...bindingOfIsaacStyles.characterPortrait,
                ...(character.id === state.selectedCharacterId ? bindingOfIsaacStyles.selectedPortrait : {}),
                ...(character.unlocked ? {} : bindingOfIsaacStyles.lockedPortrait),
              }}
              onClick={() => character.unlocked && setState(prev => ({ ...prev, selectedCharacterId: character.id }))}
            >
              {character.avatar}
            </div>
          ))}
        </div>

        {/* Nom du personnage sélectionné */}
        <div style={bindingOfIsaacStyles.characterName}>
          {selectedCharacter.displayName}
        </div>

        {/* Statistiques */}
        <div style={bindingOfIsaacStyles.statsContainer}>
          <div style={bindingOfIsaacStyles.statItem}>
            <span>❤️</span>
            <span>{selectedCharacter.stats.health}</span>
          </div>
          <div style={bindingOfIsaacStyles.statItem}>
            <span>📖</span>
            <span>{selectedCharacter.startingItem}</span>
          </div>
          <div style={bindingOfIsaacStyles.statItem}>
            <span>🗡️</span>
            <span>{selectedCharacter.stats.damage}</span>
          </div>
        </div>

        {/* Texte bonus */}
        {selectedCharacter.bonusText && (
          <div style={bindingOfIsaacStyles.bonusText}>
            {selectedCharacter.bonusText}
          </div>
        )}

        {/* Bouton de démarrage */}
        <button
          style={bindingOfIsaacStyles.startButton}
          onClick={() => onStartGame(selectedCharacter, selectedMode, state.seed || undefined)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#cc3333';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#b22222';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          START ADVENTURE
        </button>

        {/* Instructions */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '1rem', 
          fontSize: '0.8rem', 
          color: 'rgba(212, 197, 176, 0.7)' 
        }}>
          ← → Select Character | ↑ ↓ Select Mode | ENTER Start | ESC Cancel
        </div>
      </div>
    </Modal>
  );
}
