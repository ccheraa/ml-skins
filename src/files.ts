import { readdirSync } from 'fs';
import { Orientation } from './classes';

export function getHeroes(orientation: Orientation): string[] {
  return readdirSync(`./data/${orientation}`);
}
export function getHero(orientation: Orientation, hero?: string): string {
  const heroes = getHeroes(orientation);
  return heroes.includes(hero) ? hero : heroes[Math.floor(Math.random() * heroes.length)];
}
export function getSkins(orientation: Orientation, hero: string): string[] {
  return readdirSync(`./data/${orientation}/${hero}`).map(skin => skin.split('.')[0]);
}
export function getSkin(orientation: Orientation, hero: string, skin?: string): string {
  const skins = getSkins(orientation, hero);
  return skins.includes(skin) ? skin : skins[Math.floor(Math.random() * skins.length)];
}