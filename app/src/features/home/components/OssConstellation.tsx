// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// SPDX-FileCopyrightText: 2025 Cogni-DAO

/**
 * Module: `@features/home/components/OssConstellation`
 * Purpose: Animated SVG node-graph that visualizes the cogni/oss "knowledge map" —
 *   labeled software-category clusters wired together as a navigable atlas of open source.
 * Scope: Decorative hero background only. Pure presentation; no data fetching, no interactivity.
 * Invariants:
 *   - Deterministic, fixed coordinates (no Math.random) so SSR and client markup match.
 *   - Token-only color: the SVG inherits `text-primary` and paints with `currentColor`.
 *   - aria-hidden; conveys no information a screen reader needs.
 * Side-effects: none (framer-motion animations are client-side, idempotent).
 * Links: src/features/home/components/NewHomeHero.tsx
 * @public
 */

"use client";

import { motion } from "framer-motion";
import type { ReactElement } from "react";

// viewBox space: 1200 x 700. Category anchors are the "regions" of the map.
const REGIONS = [
  { x: 175, y: 150, label: "AUTH" },
  { x: 470, y: 95, label: "PAYMENTS" },
  { x: 800, y: 140, label: "DATA" },
  { x: 1030, y: 250, label: "AI / LLM" },
  { x: 250, y: 430, label: "UI" },
  { x: 590, y: 355, label: "QUEUES" },
  { x: 910, y: 500, label: "OBSERVABILITY" },
  { x: 430, y: 600, label: "LICENSES" },
] as const;

// Edges between regions — the "how OSS interconnects" web.
const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 5],
  [1, 5],
  [5, 2],
  [5, 6],
  [6, 3],
  [6, 7],
  [5, 7],
  [4, 7],
  [0, 5],
  [2, 6],
];

// Small satellite packages scattered across the atlas.
const SATELLITES = [
  { x: 320, y: 210 },
  { x: 620, y: 180 },
  { x: 700, y: 280 },
  { x: 940, y: 180 },
  { x: 1090, y: 380 },
  { x: 150, y: 320 },
  { x: 380, y: 330 },
  { x: 520, y: 470 },
  { x: 760, y: 430 },
  { x: 690, y: 560 },
  { x: 980, y: 600 },
  { x: 300, y: 540 },
  { x: 560, y: 250 },
  { x: 860, y: 330 },
  { x: 240, y: 250 },
  { x: 1010, y: 470 },
] as const;

export function OssConstellation(): ReactElement {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full text-primary"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <radialGradient id="oss-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="55%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric glow centered on the map */}
      <rect x="0" y="0" width="1200" height="700" fill="url(#oss-glow)" />

      {/* Interconnection web — drawn on load */}
      <g stroke="currentColor" fill="none">
        {EDGES.map(([a, b], i) => {
          const from = REGIONS[a];
          const to = REGIONS[b];
          if (!from || !to) return null;
          return (
            <motion.line
              key={`edge-${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              strokeWidth={1}
              strokeOpacity={0.18}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.3 + i * 0.06,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </g>

      {/* Satellite packages — gentle, staggered twinkle */}
      <g fill="currentColor">
        {SATELLITES.map((s, i) => (
          <motion.circle
            key={`sat-${s.x}-${s.y}`}
            cx={s.x}
            cy={s.y}
            r={2.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{
              duration: 3.5,
              delay: (i % 8) * 0.25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>

      {/* Region anchors + labels */}
      <g>
        {REGIONS.map((r, i) => (
          <motion.g
            key={r.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            style={{ transformOrigin: `${r.x}px ${r.y}px` }}
          >
            <motion.circle
              cx={r.x}
              cy={r.y}
              r={5}
              fill="currentColor"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{
                duration: 4,
                delay: i * 0.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <circle
              cx={r.x}
              cy={r.y}
              r={11}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeOpacity={0.35}
            />
            <text
              x={r.x + 18}
              y={r.y + 4}
              className="fill-muted-foreground font-mono"
              fontSize={13}
              letterSpacing={2}
            >
              {r.label}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
