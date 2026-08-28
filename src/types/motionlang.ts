/** One instruction-motion pair: caption plus the video's filename (without extension) on the HF dataset. */
export interface MotionLangRecord {
  readonly c: string;
  readonly v: string;
}

/** dataset[languageCode][categoryId] -> 20 records */
export type MotionLangDataset = Readonly<Record<string, Readonly<Record<string, readonly MotionLangRecord[]>>>>;
