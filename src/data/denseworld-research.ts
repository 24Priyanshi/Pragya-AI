/**
 * Content of the "Research" tab, ported verbatim (2026-09-01) from the
 * project's own Gradio Space (huggingface.co/spaces/Pragya-AI/denseworld,
 * tab2_research.html) — the team's own existing benchmark writeup, not
 * written fresh here.
 */

export interface BenchmarkRow {
  readonly label: string;
  readonly value: string;
  readonly widthPct: number;
  readonly isOurs?: boolean;
}

export interface BenchmarkChart {
  readonly title: string;
  readonly subtitle: string;
  readonly direction: "up" | "down";
  readonly rows: readonly BenchmarkRow[];
}

export interface ResearchMetric {
  readonly chart: BenchmarkChart;
  readonly name: string;
  readonly formula: string;
  readonly definition: string;
  readonly bullets: readonly string[];
  readonly citation: string;
  /** Text column comes before the chart instead of after (source's ".metric.flip"). */
  readonly flip?: boolean;
}

export interface ResearchSection {
  readonly number: string;
  readonly heading: string;
  readonly tldr: string;
  readonly tldrStat?: string;
  readonly pinned?: boolean;
  readonly hero?: boolean;
  readonly metrics: readonly ResearchMetric[];
  readonly takeawayLabel?: string;
  readonly takeaway?: string;
}

export const researchIntro = {
  heading: "Measured against V-JEPA, metric by metric",
  lede: "DenseWorld is evaluated head-to-head against the Frozen V-JEPA foundation model and a full sweep of adaptation baselines — Full Fine-tuning, LoRA, DoRA, and AutoPEFT — across three capability buckets: scene categorization, future prediction, and scene understanding. Every plot below is reported on the held-out test set with bootstrap confidence intervals.",
};

export const researchFootnote =
  "Unless otherwise stated, all results are reported on the held-out test set with 95% bias-corrected and accelerated (BCa) bootstrap confidence intervals. DenseWorld denotes our released factor-tuned ViT-G model, while Frozen V-JEPA denotes the original pretrained ViT-G foundation model. Abbreviations: F1, harmonic mean of precision and recall; MSE, mean squared error; L1, mean absolute error; PEFT, parameter-efficient fine-tuning.";

export const researchSections: readonly ResearchSection[] = [
  {
    number: "01 · Scene Categorization",
    heading: "Classifying Urban Scenes",
    tldr: "DenseWorld classifies complex Global South urban scenes more accurately than V-JEPA",
    tldrStat: "+1.3% relative improvement",
    metrics: [
      {
        chart: {
          title: "Scene taxonomy F1",
          subtitle: "Held-out test set · 95% bias-corrected & accelerated (BCa) bootstrap confidence interval",
          direction: "up",
          rows: [
            { label: "DenseWorld", value: "0.789", widthPct: 100.0, isOurs: true },
            { label: "Frozen V-JEPA", value: "0.779", widthPct: 69.6 },
            { label: "Full Fine-tuning", value: "0.771", widthPct: 45.3 },
            { label: "DoRA", value: "0.768", widthPct: 36.2 },
            { label: "LoRA", value: "0.766", widthPct: 30.1 },
            { label: "AutoPEFT", value: "0.762", widthPct: 18.0 },
          ],
        },
        name: "Scene Taxonomy · F1 Score",
        formula: "F1 = 2 · (Precision · Recall) / (Precision + Recall)",
        definition:
          "A single 0–1 metric that balances precision and recall, measuring how accurately the model assigns videos to their correct scene categories while minimizing missed detections.",
        bullets: [
          "Built on the DENSEWORLD taxonomy comprising 15 semantic dimensions, 65+ attribute values, and 3 structured tags.",
          "Scene types: markets, residential, commercial, promenades, transit, highways, heritage sites, junctions, flyovers, beaches, ghats, bazaars, and skylines.",
          "Environmental context: time of day, weather, lighting, vegetation, and video quality.",
          "Traffic & interaction: crowd density, traffic density, traffic composition, pedestrian–vehicle separation, encroachment, and locally characteristic objects such as auto-rickshaws, cycle rickshaws, street vendors, and animals.",
          "The improvement is intentionally modest: V-JEPA is already a strong scene recognizer, and DenseWorld preserves and slightly improves this capability while adapting to substantially more complex urban environments.",
        ],
        citation: "Metric definition and taxonomy probing follow V-JEPA 2.1 (Mur-Labadia et al., 2026).",
      },
    ],
  },
  {
    number: "02 · Future Prediction · Core Capability",
    heading: "Predicting What Happens Next",
    tldr: "Future prediction is the defining capability of a world model. Across all baselines — including Full Fine-tuning, LoRA, DoRA, AutoPEFT, and Frozen V-JEPA — DenseWorld achieves the most accurate next-frame prediction.",
    pinned: true,
    hero: true,
    metrics: [
      {
        chart: {
          title: "Future-frame MSE",
          subtitle: "Held-out test set · 95% bias-corrected & accelerated (BCa) bootstrap confidence interval",
          direction: "down",
          rows: [
            { label: "DenseWorld", value: "0.498", widthPct: 18.0, isOurs: true },
            { label: "Full Fine-tuning", value: "0.522", widthPct: 51.4 },
            { label: "DoRA", value: "0.528", widthPct: 59.7 },
            { label: "LoRA", value: "0.531", widthPct: 63.9 },
            { label: "AutoPEFT", value: "0.540", widthPct: 76.4 },
            { label: "Frozen V-JEPA", value: "0.557", widthPct: 100.0 },
          ],
        },
        name: "Future-frame MSE · Mean Squared Error",
        formula: "MSE = (1/N) · Σ (predicted − actual)²",
        definition:
          "Measures the average squared difference between the predicted future frame and the ground-truth future frame. Lower values indicate more accurate predictions, while larger errors are penalized more heavily.",
        bullets: [
          "DenseWorld achieves the lowest prediction error among all evaluated methods.",
          "Reduces MSE by 0.059 compared with the Frozen V-JEPA baseline.",
          "MSE emphasizes large prediction failures, making it particularly sensitive to catastrophic forecasting errors.",
        ],
        citation: "Evaluation protocol follows V-JEPA 2.1 (Assran et al., 2025; Mur-Labadia et al., 2026).",
      },
      {
        chart: {
          title: "Causal L1",
          subtitle: "Past-only (causal) prediction",
          direction: "down",
          rows: [
            { label: "DenseWorld", value: "0.531", widthPct: 18.0, isOurs: true },
            { label: "Full Fine-tuning", value: "0.549", widthPct: 45.8 },
            { label: "DoRA", value: "0.556", widthPct: 56.7 },
            { label: "LoRA", value: "0.560", widthPct: 62.9 },
            { label: "AutoPEFT", value: "0.568", widthPct: 75.2 },
            { label: "Frozen V-JEPA", value: "0.584", widthPct: 100.0 },
          ],
        },
        name: "Causal L1 · Mean Absolute Error",
        formula: "L1 = (1/N) · Σ | predicted − actual |",
        definition:
          "Measures the average absolute difference between predicted and ground-truth future frames. Unlike MSE, each prediction error contributes proportionally, providing a complementary view of prediction quality.",
        bullets: [
          "Causal evaluation restricts the model to past observations only, preventing access to future information during prediction.",
          "DenseWorld achieves the lowest L1 error, improving upon the Frozen V-JEPA baseline by 0.053.",
          "Reporting both MSE and L1 demonstrates consistent improvements across complementary prediction metrics.",
        ],
        citation: "Causal prediction protocol follows V-JEPA 2.1.",
        flip: true,
      },
    ],
    takeawayLabel: "Bottom takeaway",
    takeaway:
      "DenseWorld consistently achieves the strongest predictive performance. Among the highest-performing methods, differences fall within the 95% Bias-Corrected and Accelerated (BCa) bootstrap confidence interval, indicating statistically comparable top-tier performance while consistently favoring DenseWorld.",
  },
  {
    number: "03 · Scene Understanding",
    heading: "Understanding the Scene Under Occlusion",
    tldr: "Real-world streets are rarely fully visible. DenseWorld preserves reliable scene understanding under heavy occlusion while improving recognition of complex motion patterns.",
    pinned: true,
    metrics: [
      {
        chart: {
          title: "Mask-ratio slope",
          subtitle: "Error growth per masked fraction",
          direction: "down",
          rows: [
            { label: "DenseWorld", value: "0.537", widthPct: 18.0, isOurs: true },
            { label: "Full Fine-tuning", value: "0.581", widthPct: 37.9 },
            { label: "DoRA", value: "0.598", widthPct: 45.6 },
            { label: "LoRA", value: "0.607", widthPct: 49.7 },
            { label: "AutoPEFT", value: "0.635", widthPct: 62.4 },
            { label: "Frozen V-JEPA", value: "0.718", widthPct: 100.0 },
          ],
        },
        name: "Masking Robustness · Mask-Ratio Slope",
        formula: "Slope = Δ(Prediction Error) / Δ(Masked Image Fraction)",
        definition:
          "Measures how rapidly prediction quality deteriorates as progressively larger portions of the scene are hidden. Lower slopes indicate greater robustness to occlusion.",
        bullets: [
          "DenseWorld degrades more gracefully as visibility decreases.",
          "Lower slopes indicate stronger resilience to crowded, partially visible environments.",
          "Particularly important for dense urban scenes where frequent occlusion is unavoidable.",
        ],
        citation: "Masking-robustness evaluation follows the dense-feature probing protocol introduced in V-JEPA 2.1.",
      },
      {
        chart: {
          title: "Motion top-1 accuracy",
          subtitle: "11 motion categories",
          direction: "up",
          rows: [
            { label: "DenseWorld", value: "49.2%", widthPct: 100.0, isOurs: true },
            { label: "Full Fine-tuning", value: "47.1%", widthPct: 64.9 },
            { label: "DoRA", value: "46.4%", widthPct: 53.1 },
            { label: "LoRA", value: "46.0%", widthPct: 46.4 },
            { label: "AutoPEFT", value: "45.3%", widthPct: 34.7 },
            { label: "Frozen V-JEPA", value: "44.3%", widthPct: 18.0 },
          ],
        },
        name: "Motion Classification · Top-1 Accuracy",
        formula: "Top-1 Accuracy = Correct Predictions / Total Videos",
        definition:
          "Measures how often the model correctly identifies the dominant motion occurring in a scene using only its highest-confidence prediction.",
        bullets: [
          "Evaluated across 11 motion categories.",
          "DenseWorld improves motion recognition by 4.9 percentage points over the Frozen V-JEPA baseline.",
          "Represents the largest relative improvement among the scene-understanding evaluations.",
        ],
        citation: "Motion-understanding evaluation follows the Something-Something V2 protocol adopted by V-JEPA 2.",
        flip: true,
      },
    ],
    takeawayLabel: "Takeaway",
    takeaway:
      "DenseWorld maintains reliable scene understanding even when visibility deteriorates, demonstrating stronger representations for crowded urban environments.",
  },
];
