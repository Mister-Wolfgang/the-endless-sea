import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppStore } from '../../shared/stores/AppStore';
import { InputManager } from '../../shared/services/InputManager';
import { InputAction, InputType } from '../../shared/types/input';

export interface MainMenuProps {
  onNewGame?: () => void;
  onContinue?: () => void;
  onOpenOptions?: () => void;
  onQuit?: () => void;
  hasSave?: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  action: () => void;
  disabled?: boolean;
}

export function MainMenu({
  onNewGame,
  onContinue,
  onOpenOptions,
  onQuit,
  hasSave = false,
}: MainMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { startGame, setScene } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputManagerRef = useRef<InputManager | null>(null);
  const lastNavigationTime = useRef<number>(0);
  const [debugInfo, setDebugInfo] = useState<{
    gamepadConnected: boolean;
    gamepadId: string;
    leftStickY: number;
  }>({ gamepadConnected: false, gamepadId: '', leftStickY: 0 });

  // Définir les options du menu
  const menuItems: MenuItem[] = [
    {
      id: 'new-game',
      label: 'Nouvelle Partie',
      action: () => {
        if (onNewGame) {
          onNewGame();
        } else {
          // Action par défaut - démarrer le jeu directement
          startGame();
          setScene('game');
        }
      },
    },
    {
      id: 'continue',
      label: 'Continuer',
      action: () => {
        if (onContinue && hasSave) {
          onContinue();
        }
      },
      disabled: !hasSave,
    },
    {
      id: 'options',
      label: 'Options',
      action: () => {
        if (onOpenOptions) {
          onOpenOptions();
        }
      },
    },
    {
      id: 'quit',
      label: 'Quitter',
      action: () => {
        if (onQuit) {
          onQuit();
        } else {
          // Action par défaut pour quitter
          window.close();
        }
      },
    },
  ];

  // Navigation au clavier
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % menuItems.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        const selectedItem = menuItems[selectedIndex];
        if (selectedItem && !selectedItem.disabled) {
          selectedItem.action();
        }
        break;
    }
  }, [selectedIndex, menuItems]);

  // Navigation avec InputManager (manette + clavier avancé)
  const handleNavigation = useCallback((direction: 'up' | 'down') => {
    console.log(`[MainMenu] handleNavigation appelé: ${direction}`);
    const now = Date.now();
    // Débounce réduit à 50ms car InputManager gère déjà le debounce des sticks (200ms)
    if (now - lastNavigationTime.current < 50) {
      console.log(`[MainMenu] Navigation ignorée (débounce): ${now - lastNavigationTime.current}ms depuis la dernière`);
      return;
    }
    lastNavigationTime.current = now;

    setSelectedIndex((prev) => {
      const newIndex = direction === 'down' 
        ? (prev + 1) % menuItems.length 
        : (prev - 1 + menuItems.length) % menuItems.length;
      console.log(`[MainMenu] Index changé: ${prev} → ${newIndex}`);
      return newIndex;
    });
  }, []); // Enlever menuItems.length pour éviter les recréations constantes

  const handleSelect = useCallback(() => {
    console.log(`[MainMenu] handleSelect appelé pour index: ${selectedIndex}`);
    setSelectedIndex((currentIndex) => {
      const selectedItem = menuItems[currentIndex];
      if (selectedItem && !selectedItem.disabled) {
        console.log(`[MainMenu] Exécution de l'action: ${selectedItem.label}`);
        selectedItem.action();
      } else {
        console.log(`[MainMenu] Item désactivé ou inexistant:`, selectedItem);
      }
      return currentIndex; // Retourner la même valeur pour ne pas déclencher un re-render
    });
  }, []); // Enlever les dépendances pour stabiliser le callback

  // Ajouter/supprimer les event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Initialiser InputManager pour le support manette
  useEffect(() => {
    if (!containerRef.current) return;

    const inputManager = new InputManager(containerRef.current);
    inputManagerRef.current = inputManager;

    console.log(`[MainMenu] InputManager initialisé`);

    // Mapper les touches pour la navigation menu
    // Support multi-layout : WASD (QWERTY) + ZQSD (AZERTY)
    inputManager.mapInput(InputAction.MENU_UP, InputType.KEYBOARD, 'w');
    inputManager.mapInput(InputAction.MENU_UP, InputType.KEYBOARD, 'z');
    inputManager.mapInput(InputAction.MENU_DOWN, InputType.KEYBOARD, 's');
    
    // Sélection clavier avancée
    inputManager.mapInput(InputAction.MENU_SELECT, InputType.KEYBOARD, ' ');
    
    // Manette - D-pad (support double: noms ET boutons spécifiques)
    inputManager.mapInput(InputAction.MENU_UP, InputType.GAMEPAD, 'dpad_up');
    inputManager.mapInput(InputAction.MENU_DOWN, InputType.GAMEPAD, 'dpad_down');
    
    // D-pad Xbox 360 - Boutons spécifiques (12=Haut, 13=Bas, 14=Gauche, 15=Droite)
    inputManager.mapInput(InputAction.MENU_UP, InputType.GAMEPAD, undefined, 12);
    inputManager.mapInput(InputAction.MENU_DOWN, InputType.GAMEPAD, undefined, 13);
    
    // Manette - Stick gauche
    inputManager.mapInput(InputAction.MENU_UP, InputType.GAMEPAD, 'stick_up');
    inputManager.mapInput(InputAction.MENU_DOWN, InputType.GAMEPAD, 'stick_down');
    
    // Manette - Boutons (A = bouton 0 sur Xbox, utiliser la propriété button)
    inputManager.mapInput(InputAction.MENU_SELECT, InputType.GAMEPAD, undefined, 0);
    
    // Configurer les handlers - ne réagir qu'aux pressions (value > 0), pas aux relâchements
    inputManager.onAction(InputAction.MENU_UP, (event) => {
      console.log(`[MainMenu] InputAction.MENU_UP reçu:`, event);
      if (event.value > 0) handleNavigation('up');
    });
    inputManager.onAction(InputAction.MENU_DOWN, (event) => {
      console.log(`[MainMenu] InputAction.MENU_DOWN reçu:`, event);
      if (event.value > 0) handleNavigation('down');
    });
    inputManager.onAction(InputAction.MENU_SELECT, (event) => {
      console.log(`[MainMenu] InputAction.MENU_SELECT reçu:`, event);
      if (event.value > 0) handleSelect();
    });

    // Boucle de mise à jour pour les manettes
    const updateLoop = () => {
      if (inputManagerRef.current) {
        inputManagerRef.current.update();
      }
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      console.log(`[MainMenu] Nettoyage InputManager`);
      inputManager.destroy();
      inputManagerRef.current = null;
    };
  }, []); // Pas de dépendances - l'InputManager ne se recrée qu'au montage

  // Surveiller l'état de la manette pour le debug
  useEffect(() => {
    const handleGamepadConnect = (event: GamepadEvent) => {
      const gamepad = event.gamepad;
      setDebugInfo({
        gamepadConnected: true,
        gamepadId: gamepad.id,
        leftStickY: debugInfo.leftStickY,
      });
    };

    const handleGamepadDisconnect = () => {
      setDebugInfo({
        gamepadConnected: false,
        gamepadId: '',
        leftStickY: 0,
      });
    };

    window.addEventListener('gamepadconnected', handleGamepadConnect);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnect);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnect);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnect);
    };
  }, []);

  // Mettre à jour les informations de debug en temps réel
  useEffect(() => {
    const updateDebugInfo = () => {
      const gamepad = navigator.getGamepads()[0];
      if (gamepad) {
        setDebugInfo((prev) => ({
          ...prev,
          leftStickY: gamepad.axes[1] || 0,
        }));
      }
    };

    const interval = setInterval(updateDebugInfo, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        outline: 'none', // Enlever le focus outline
      }}
      tabIndex={0} // Permettre le focus pour les événements clavier
    >
      {/* Titre du jeu */}
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '4rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          background: 'linear-gradient(45deg, #4fc3f7, #81c784)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        The Endless Sea
      </h1>

      {/* Menu principal */}
      <nav
        role="menu"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: '300px',
        }}
      >
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            role="menuitem"
            aria-selected={index === selectedIndex}
            className={`
              ${index === selectedIndex ? 'selected' : ''}
              ${item.disabled ? 'disabled' : ''}
            `}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.25rem',
              fontWeight: index === selectedIndex ? 'bold' : 'normal',
              background: index === selectedIndex
                ? 'rgba(79, 195, 247, 0.3)'
                : item.disabled
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(255,255,255,0.2)',
              border: index === selectedIndex
                ? '2px solid #4fc3f7'
                : '2px solid transparent',
              borderRadius: '8px',
              color: item.disabled ? '#666' : 'white',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: item.disabled ? 0.5 : 1,
            }}
            onClick={() => {
              if (!item.disabled) {
                setSelectedIndex(index);
                item.action();
              }
            }}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Instructions */}
      <div
        style={{
          marginTop: '3rem',
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
        }}
      >
        <p>Utilisez ↑↓ / WASD / ZQSD pour naviguer, Entrée pour sélectionner</p>
        <p>Manette supportée</p>
      </div>

      {/* Debug Info */}
      {debugInfo.gamepadConnected && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: 'white',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <p>🎮 Manette connectée: {debugInfo.gamepadConnected ? 'Oui' : 'Non'}</p>
          <p>Gamepad ID: {debugInfo.gamepadId}</p>
          <p>Left Stick Y: {debugInfo.leftStickY.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
