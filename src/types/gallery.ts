/** One paired human/robot dexterity example in the PragyaDex skill gallery. */
export interface GalleryExample {
  readonly title: string;
  readonly desc: string;
  /** e.g. "01/50" */
  readonly index: string;
  /** Path relative to GALLERY_VIDEO_BASE. */
  readonly humanVideo: string;
  /** Path relative to GALLERY_VIDEO_BASE. */
  readonly robotVideo: string;
  readonly transferGoal: string;
  readonly primitiveSequence: string;
  readonly objects: string;
  readonly dexteritySignals: string;
  readonly difficulty: string;
  /** Primitive tags plus a trailing difficulty tag, as scraped from the source gallery. */
  readonly tags: readonly string[];
}

export interface GalleryDomain {
  readonly id: string;
  readonly label: string;
  readonly desc: string;
  readonly examples: readonly GalleryExample[];
}
