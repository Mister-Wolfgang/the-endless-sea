import '@testing-library/jest-dom';

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

describe('clamp', () => {
  it('retourne la valeur si elle est dans les bornes', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it('retourne min si valeur < min', () => {
    expect(clamp(-2, 0, 10)).toBe(0);
  });
  it('retourne max si valeur > max', () => {
    expect(clamp(42, 0, 10)).toBe(10);
  });
});
