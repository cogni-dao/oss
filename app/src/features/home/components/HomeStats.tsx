// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/HomeStats`
 * Purpose: The four capability pillars of the cogni/oss knowledge map — what the map
 *   does for you (index/retrieve, rank by fit, license intelligence, AI stitching).
 * Scope: Homepage section. Presentation only; describes capabilities, not live metrics.
 * Invariants: Token-only color; responsive 1→2→4 grid; on-scroll reveal via framer-motion.
 * Notes: Deliberately capability-framed rather than vanity counts — the map is being built.
 * Links: src/app/(public)/page.tsx
 * @public
 */

"use client";

import { motion } from "framer-motion";
import { Layers, ListOrdered, Scale, Sparkles } from "lucide-react";
import type { ReactElement } from "react";

const PILLARS = [
  {
    icon: Layers,
    title: "Indexed & retrievable",
    body: "Search and sort the open source universe by category, interest, and the problem you're solving.",
  },
  {
    icon: ListOrdered,
    title: "Ranked by fit",
    body: "Effectiveness and when-to-use signals — not just star counts — so you pick the right tool, not the loudest.",
  },
  {
    icon: Scale,
    title: "License-aware",
    body: "Understand every license and how they interact before you commit, so compliance never surprises you.",
  },
  {
    icon: Sparkles,
    title: "AI-stitched",
    body: "Describe an outcome and an AI developer wires proven OSS together into working code.",
  },
] as const;

export function HomeStats(): ReactElement {
  return (
    <section className="w-full border-border border-t bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="flex flex-col bg-card/40 p-8 backdrop-blur"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <pillar.icon className="size-6 text-primary" />
              <h3 className="mt-4 font-semibold text-base text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
