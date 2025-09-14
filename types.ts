export enum Language {
  EN = 'EN',
  TH = 'TH',
  JP = 'JP',
}

export enum Mood {
  Happy = '😊 Happy',
  Lonely = '😔 Lonely',
  Exploring = '🗺️ Exploring',
  Creative = '🎨 Creative',
  Chill = '☕ Chill',
}

export enum Interest {
  Coffee = 'Coffee',
  Music = 'Music',
  Art = 'Art',
  Reading = 'Reading',
  Gaming = 'Gaming',
  Coding = 'Coding',
  Sports = 'Sports',
  Movies = 'Movies',
}

export interface UserProfile {
  name: string;
  photoUrl: string;
  mood: Mood;
  interests: Interest[];
}

export interface MockUser extends UserProfile {
  id: number;
  latitude: number;
  longitude: number;
}