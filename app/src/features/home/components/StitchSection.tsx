// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/StitchSection`
 * Purpose: Narrates the cogni/oss mission flow — describe an outcome, get the right open
 *   source tools ranked (license-aware), and have an AI developer stitch them into code.
 * Scope: Homepage marketing section. Presentation only; no data fetching.
 * Invariants: Token-only color; responsive 1→3 column flow; on-scroll reveal via framer-motion.
 * Side-effects: none
 * Links: src/app/(public)/page.tsx, src/features/home/components/NewHomeHero.tsx
 */

"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Scale, Workflow } from "lucide-react";
import type { ReactElement } from "react";

const STEPS = [
  {
    n: "01",
    icon: MessageSquareText,
    title: "Describe what you want",
    body: "Say it in plain language — “a billing system with usage metering and a customer portal.” No need to know the libraries yet.",
  },
  {
    n: "02",
    icon: Scale,
    title: "We map & rank the options",
    body: "The knowledge map surfaces the open source tools that actually fit — ranked by traction and when-to-use, with every license and how they interact made explicit.",
  },
  {
    n: "03",
    icon: Workflow,
    title: "Your AI developer stitches it",
    body: "Proven components get wired together into working code. You build on what already exists instead of reinventing it.",
  },
] as const;

export function StitchSection(): ReactElement {
  return (
    <section className="w-full border-border border-t bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-primary text-xs uppercase tracking-widest">
            How it works
          </span>
          <h2 className="mt-3 text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
            From an idea to shipped — stitched from the world&apos;s best open
            source.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              className="group relative flex flex-col rounded-2xl border border-border bg-card/40 p-7 backdrop-blur transition-colors hover:border-primary/50"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <step.icon className="size-5" />
                </span>
                <span className="font-mono text-2xl text-muted-foreground/40 tabular-nums">
                  {step.n}
                </span>
              </div>
              <h3 className="mt-5 font-semibold text-foreground text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
