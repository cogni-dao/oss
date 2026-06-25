// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/NewHomeHero`
 * Purpose: cogni/oss landing hero — frames the mission (a navigable knowledge map of the
 *   world's open source, license-aware, AI-stitched) over an animated constellation atlas.
 * Scope: Homepage only. Does not handle global layout or auth UI.
 * Invariants: Staggered load reveal; token-only color; CTAs route via useTryDemo / Links.
 * Side-effects: none (CTA handler lives in useTryDemo).
 * Links: src/features/home/components/OssConstellation.tsx, src/features/home/hooks/useTryDemo.ts
 */

"use client";

import { ArrowRight, Github, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { Button } from "@/components";

import { useTryDemo } from "../hooks/useTryDemo";
import { OssConstellation } from "./OssConstellation";

const CATEGORIES = [
  "auth",
  "payments",
  "vector db",
  "queues",
  "observability",
  "ui kits",
  "licenses",
] as const;

export function NewHomeHero(): ReactElement {
  const { handleTryDemo } = useTryDemo();

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Atlas background */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <OssConstellation />
      </div>
      {/* Fade the atlas into the page bottom so content stays legible */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-28 text-center sm:px-6 md:py-40">
        {/* Eyebrow */}
        <div className="duration-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-muted-foreground text-xs uppercase tracking-widest backdrop-blur">
            <span className="size-1.5 rounded-full bg-primary" />
            open source · indexed · ranked · stitched
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-balance font-bold text-4xl text-foreground leading-tight tracking-tight duration-700 animate-in fade-in slide-in-from-bottom-3 sm:text-6xl md:text-7xl">
          Navigate the world&apos;s{" "}
          <span className="text-gradient-accent">open source.</span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground leading-relaxed delay-150 duration-700 animate-in fade-in slide-in-from-bottom-3 sm:text-lg">
          A living map of every open source tool, the licenses that govern it,
          and how the pieces fit together — so you and your AI developer can ship
          with proven code instead of reinventing it.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 delay-300 duration-700 animate-in fade-in slide-in-from-bottom-3 sm:flex-row">
          <Button size="lg" onClick={handleTryDemo}>
            Describe what you want to build
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/knowledge">
              <MapIcon className="mr-2 size-4" />
              Explore the map
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://github.com/Cogni-DAO/oss"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 size-4" />
              GitHub
            </Link>
          </Button>
        </div>

        {/* Category index chips */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 delay-500 duration-1000 animate-in fade-in">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="rounded-md border border-border/60 bg-card/40 px-3 py-1 font-mono text-muted-foreground text-xs backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
            >
              {c}
            </span>
          ))}
          <span className="px-1 font-mono text-muted-foreground/60 text-xs">
            +∞ more
          </span>
        </div>
      </div>
    </section>
  );
}
