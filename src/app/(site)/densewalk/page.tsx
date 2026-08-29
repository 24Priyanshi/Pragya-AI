import type { Metadata } from "next";

import { AnalysisPair } from "@/components/AnalysisCharts";
import { InstructionFeed } from "@/components/InstructionFeed";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { SectionRule } from "@/components/SectionRule";
import { StatStrip } from "@/components/StatStrip";
import { barChart, hero, lineChart, proseBlocks, stats, videoPlaylist } from "@/data/densewalk";
import { feedData } from "@/data/densewalk-feed";

export const metadata: Metadata = {
  title: "DenseWalk",
  description:
    "A data-and-benchmark pipeline for short-horizon humanoid navigation in populous, crowded and chaotic Global South urban environments.",
};

export default function DenseWalkPage() {
  return (
    <PageShell>
      <PageHero hero={hero} />

      {/* The dataset explorer sits directly under the hero; the narrative
          sections below are unchanged. feedData is built on the server, so only
          the view model crosses to the client — not the raw annotations. */}
      <InstructionFeed data={feedData} />

      <StatStrip stats={stats} />

      <section className="space-y-32">
        {proseBlocks.map((block) => (
          <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12" key={block.label}>
            <SectionRule label={block.label} margin="mb-8" />
            {block.paragraphs.map((paragraph, i) => (
              <p
                className={`inter text-sm md:text-base text-on-surface-variant leading-relaxed max-w-6xl${
                  i < block.paragraphs.length - 1 ? " mb-6" : ""
                }`}
                key={paragraph.slice(0, 40)}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12">
          <SectionRule label="04. Video Demonstrations" margin="mb-8" />
          <div className="aspect-video w-full max-w-4xl">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              src={videoPlaylist.embedSrc}
              title={videoPlaylist.title}
            />
          </div>
        </div>
      </section>

      <AnalysisPair bar={barChart} line={lineChart} />
    </PageShell>
  );
}
