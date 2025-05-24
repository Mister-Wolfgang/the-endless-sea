/** Clés d'entrée supportées */
export enum InputKey {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

/** Dispositions de clavier supportées */
export enum KeyboardLayout {
  QWERTY = 'QWERTY',
  AZERTY = 'AZERTY',
  UNKNOWN = 'UNKNOWN'
}

/** Interface de mapping des touches */
export interface KeyMapping {
  physicalKey: string;   // La touche réellement pressée
  eventCode: string;     // Le code envoyé par le navigateur
  translationKey?: string; // Clé de traduction pour l'affichage
}

/** Mapping des touches par disposition de clavier */
const LAYOUT_MAPPINGS: Record<KeyboardLayout, Record<InputKey, KeyMapping>> = {
  [KeyboardLayout.QWERTY]: {
    [InputKey.UP]: { physicalKey: 'W', eventCode: 'KeyW', translationKey: 'controls.mapping.UP' },
    [InputKey.DOWN]: { physicalKey: 'S', eventCode: 'KeyS', translationKey: 'controls.mapping.DOWN' },
    [InputKey.LEFT]: { physicalKey: 'A', eventCode: 'KeyA', translationKey: 'controls.mapping.LEFT' },
    [InputKey.RIGHT]: { physicalKey: 'D', eventCode: 'KeyD', translationKey: 'controls.mapping.RIGHT' }
  },
  [KeyboardLayout.AZERTY]: {
    [InputKey.UP]: { physicalKey: 'Z', eventCode: 'KeyW', translationKey: 'controls.mapping.UP' },
    [InputKey.DOWN]: { physicalKey: 'S', eventCode: 'KeyS', translationKey: 'controls.mapping.DOWN' },
    [InputKey.LEFT]: { physicalKey: 'Q', eventCode: 'KeyA', translationKey: 'controls.mapping.LEFT' },
    [InputKey.RIGHT]: { physicalKey: 'D', eventCode: 'KeyD', translationKey: 'controls.mapping.RIGHT' }
  },
  [KeyboardLayout.UNKNOWN]: {
    [InputKey.UP]: { physicalKey: 'W/Z', eventCode: 'KeyW', translationKey: 'controls.mapping.UP' },
    [InputKey.DOWN]: { physicalKey: 'S', eventCode: 'KeyS', translationKey: 'controls.mapping.DOWN' },
    [InputKey.LEFT]: { physicalKey: 'A/Q', eventCode: 'KeyA', translationKey: 'controls.mapping.LEFT' },
    [InputKey.RIGHT]: { physicalKey: 'D', eventCode: 'KeyD', translationKey: 'controls.mapping.RIGHT' }
  }
};

export class InputSystem {
  private pressedKeys: Set<string>;
  private layout: KeyboardLayout;
  private layoutDetected: boolean;

  constructor() {
    this.pressedKeys = new Set();
    this.layout = KeyboardLayout.UNKNOWN;
    this.layoutDetected = false;
  }

  detectLayout(event: { code: string, key: string }): void {
    if (this.layoutDetected) return;

    // Si on appuie sur Q et qu'on reçoit KeyA, c'est un AZERTY
    if (event.code === 'KeyA' && event.key.toLowerCase() === 'q') {
      this.layout = KeyboardLayout.AZERTY;
      this.layoutDetected = true;
      console.log('Detected AZERTY layout');
    }
    // Si on appuie sur Z et qu'on reçoit KeyW, c'est un AZERTY
    else if (event.code === 'KeyW' && event.key.toLowerCase() === 'z') {
      this.layout = KeyboardLayout.AZERTY;
      this.layoutDetected = true;
      console.log('Detected AZERTY layout');
    }
    // Si la touche correspond au code, c'est un QWERTY
    else if (event.code === 'KeyA' && event.key.toLowerCase() === 'a' ||
             event.code === 'KeyW' && event.key.toLowerCase() === 'w') {
      this.layout = KeyboardLayout.QWERTY;
      this.layoutDetected = true;
      console.log('Detected QWERTY layout');
    }
  }

  onKeyDown(event: { code: string, key: string }): void {
    this.detectLayout(event);
    this.pressedKeys.add(event.code);
  }

  onKeyUp(event: { code: string }): void {
    this.pressedKeys.delete(event.code);
  }

  isKeyPressed(keyCode: string): boolean {
    return this.pressedKeys.has(keyCode);
  }

  isActionPressed(action: InputKey): boolean {
    const mapping = LAYOUT_MAPPINGS[this.layout][action];
    return this.pressedKeys.has(mapping.eventCode);
  }

  getPhysicalKey(action: InputKey): string {
    return LAYOUT_MAPPINGS[this.layout][action].physicalKey;
  }

  getActiveKeys(): { physicalKey: string, isPressed: boolean }[] {
    return Object.values(InputKey).map(action => ({
      physicalKey: this.getPhysicalKey(action),
      isPressed: this.isActionPressed(action)
    }));
  }

  getCurrentLayout(): KeyboardLayout {
    return this.layout;
  }

  /** Obtient la clé de traduction pour une touche donnée */
  getKeyTranslation(key: InputKey, t: (key: string, params?: any) => string): string {
    const mapping = LAYOUT_MAPPINGS[this.layout][key];
    return t(mapping.translationKey || '', { key: mapping.physicalKey });
  }

  /** Obtient la traduction de la disposition du clavier */
  getLayoutTranslation(t: (key: string, params?: any) => string): string {
    return t('controls.layout.detected', { 
      layout: t(`controls.layout.${this.layout}`) 
    });
  }

  /** Obtient toutes les informations de contrôle traduites */
  getControlsInfo(t: (key: string, params?: any) => string) {
    return {
      layout: this.getLayoutTranslation(t),
      keys: Object.values(InputKey).reduce((acc, key) => ({
        ...acc,
        [key]: this.getKeyTranslation(key as InputKey, t)
      }), {})
    };
  }

  /** Obtient la liste des touches actuellement pressées */
  getPressedKeys(): InputKey[] {
    return Object.values(InputKey).filter(key => 
      this.isKeyPressed(key as InputKey)
    );
  }
}
