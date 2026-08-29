/**
 * The 7-programme dataset driving the landing page's constellation hero and
 * detail sheet. Copied verbatim from the reference site's own compiled JS
 * bundle (the `$` array in its page chunk), as part of porting
 * https://pragyalab-ai.dramitavadas.chatgpt.site/ as the landing page exactly
 * (2026-08-29) — not paraphrased or re-derived.
 */

export interface ProgrammeCapability {
  readonly title: string;
  readonly body: string;
}

export interface Programme {
  readonly id: string;
  readonly name: string;
  readonly navName: string;
  readonly group: string;
  readonly functionWord: string;
  readonly statement: string;
  readonly challenge: string;
  readonly image: string;
  /** "contain" for the one banner (DenseWorld) that letterboxes instead of covers. */
  readonly imageClass?: "contain";
  readonly proof: string;
  readonly capabilities: readonly ProgrammeCapability[];
  readonly nodeClass: string;
}

export const programmes: readonly Programme[] = [
  {
    id: "denseworld",
    name: "DenseWorld",
    navName: "DENSEWORLD",
    group: "UNDERSTAND",
    functionWord: "PERCEIVE",
    statement: "The sovereign world model for crowded Global South environments.",
    challenge:
      "Indian streets combine persistent occlusion, heterogeneous agents, soft boundaries and continuous social negotiation—conditions largely absent from conventional world-model benchmarks.",
    image: "/pragya/denseworld-v2.png",
    imageClass: "contain",
    proof: "1,000 HOURS · 22 CITIES · WALK · DRIVE · DRONE",
    capabilities: [
      { title: "Observe", body: "Read dense, heterogeneous multi-agent scenes." },
      { title: "Predict", body: "Model trajectories behind persistent occlusion." },
      { title: "Understand", body: "Learn the spatial grammar of Global South cities." },
    ],
    nodeClass: "node-denseworld",
  },
  {
    id: "densewalk",
    name: "DenseWalk",
    navName: "DENSEWALK",
    group: "ACT",
    functionWord: "NAVIGATE",
    statement: "Humanoid locomotion for dense, socially negotiated terrain.",
    challenge:
      "A safe path in an Indian street is not simply empty geometry. It changes continuously as pedestrians, vehicles, vendors and informal boundaries negotiate space.",
    image: "/pragya/densewalk-v2.png",
    proof: "WALK · SIDE-STEP · TURN · RECOVER",
    capabilities: [
      { title: "Anticipate", body: "Track head, shoulder, waist and foot motion." },
      { title: "Navigate", body: "Adapt to moving people and soft boundaries." },
      { title: "Recover", body: "Correct balance before instability compounds." },
    ],
    nodeClass: "node-densewalk",
  },
  {
    id: "pragyavla",
    name: "PragyaVLA",
    navName: "PRAGYAVLA",
    group: "ACT",
    functionWord: "UNDERSTAND",
    statement: "India's multilingual vision-language-action intelligence for humanoids.",
    challenge:
      "Humanoid instructions in India are multilingual, code-mixed and grounded in physical context. PragyaVLA turns what a robot sees and hears into purposeful body-level action.",
    image: "/pragya/pragyavla-v2.png",
    proof: "INDIAN LANGUAGES · CODE-MIX · EMBODIED ACTION",
    capabilities: [
      { title: "See", body: "Ground instructions in the visible world." },
      { title: "Understand", body: "Interpret Indian languages and code-mix." },
      { title: "Act", body: "Convert intent into safe humanoid motion." },
    ],
    nodeClass: "node-pragyavla",
  },
  {
    id: "pragyadex",
    name: "PragyaDex",
    navName: "PRAGYADEX",
    group: "ACT",
    functionWord: "MANIPULATE",
    statement: "Culturally grounded, language-instructed dexterity.",
    challenge:
      "Dexterity is more than mechanics. A humanoid must interpret language, sense contact, regulate force and coordinate two hands across fragile, deformable and culturally familiar objects.",
    image: "/pragya/pragyadex-v2.png",
    proof: "LANGUAGE · TOUCH · TWO-HANDED ACTION",
    capabilities: [
      { title: "Understand", body: "Interpret instruction, cultural context and intent." },
      { title: "Touch", body: "Sense contact, texture, force and object response." },
      { title: "Manipulate", body: "Execute precise, coordinated two-handed action." },
    ],
    nodeClass: "node-pragyadex",
  },
  {
    id: "kalarisena",
    name: "KalariSena",
    navName: "KALARISENA",
    group: "SCALE & EXTEND",
    functionWord: "EMBODY",
    statement: "Kalaripayattu-inspired whole-body skills for balance, agility and recovery.",
    challenge:
      "General-purpose humanoids need coordinated motion grammars—not isolated poses—to redirect momentum, defend balance and recover through contact-rich transitions.",
    image: "/pragya/kalarisena-v2.png",
    proof: "BALANCE · AGILITY · DEFENCE · RECOVERY",
    capabilities: [
      { title: "Balance", body: "Control the centre of mass under momentum." },
      { title: "Coordinate", body: "Link hands, feet and torso as one system." },
      { title: "Recover", body: "Transition safely after disrupted motion." },
    ],
    nodeClass: "node-kalarisena",
  },
  {
    id: "pragyaspace",
    name: "PragyaSpace",
    navName: "PRAGYASPACE",
    group: "SCALE & EXTEND",
    functionWord: "EXTEND",
    statement: "Gravity-aware humanoid intelligence beyond Earth.",
    challenge:
      "Earth-trained motion fails when gravity changes: the Moon amplifies flight, Mars reduces traction, zero-g preserves drift and orbital manipulation produces recoil.",
    image: "/pragya/pragyaspace-v2.png",
    proof: "MOON ¹⁄₆g · MARS ³⁄₈g · ISS 0g · ORBIT",
    capabilities: [
      { title: "Traverse", body: "Adapt locomotion to reduced gravity." },
      { title: "Anchor", body: "Use contact and handholds to brake and reorient." },
      { title: "Maintain", body: "Counter recoil while servicing orbital systems." },
    ],
    nodeClass: "node-pragyaspace",
  },
  {
    id: "kalam-protocol",
    name: "Kalam Protocol",
    navName: "KALAM PROTOCOL",
    group: "SAFETY",
    functionWord: "SAFEGUARD",
    statement: "Safety governing every layer of embodied intelligence.",
    challenge:
      "Humanoid safety cannot be attached after training. It must govern data, learning, evaluation, deployment and the physical consequences of every action.",
    image: "/pragya/kalam-v2.png",
    proof: "TRAIN · BENCHMARK · VALIDATE · DEPLOY SAFELY",
    capabilities: [
      { title: "Train", body: "Build safety into data and learning." },
      { title: "Validate", body: "Test language, world and body together." },
      { title: "Deploy", body: "Preserve constraints in physical operation." },
    ],
    nodeClass: "node-kalam",
  },
] as const;
