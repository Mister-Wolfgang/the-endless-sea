// Types pour le système de personnages inspiré de The Binding of Isaac

export interface CharacterStats {
  health: number;
  damage: number;
  speed: number;
  luck: number;
  range: number;
}

export interface CharacterData {
  id: string;
  name: string;
  displayName: string;
  description: string;
  bonusText?: string; // Texte style "MORE OPTIONS LESS ROOM"
  stats: CharacterStats;
  startingItem?: string;
  unlocked: boolean;
  avatar: string; // Chemin vers l'image du personnage
  difficulty?: 'NORMAL' | 'HARD';
}

export interface GameMode {
  id: string;
  name: string;
  displayName: string;
  unlocked: boolean;
  description: string;
}

export interface CharacterSelectionState {
  selectedCharacterId: string;
  selectedModeId: string;
  winStreak: number;
  seed?: string;
  characters: CharacterData[];
  modes: GameMode[];
}
