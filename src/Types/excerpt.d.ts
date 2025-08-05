export type Excerpt = {
  id: number;
  description: string;
  measures: string;
  pictures: string[][];
};

export type Composition = {
  id: number;
  composer: string;
  composerLast: string;
  name: string;
  date: string;
  era: string;
  genre: string;
  excerpts: Excerpt[];
  mutes: string;
  videos: string;
};
