---
name: dolt-human-visuals
description: Use whenever authoring a Cogni knowledge entry whose primary consumer is a HUMAN reviewing it visually (design diagrams, status scorecards, roadmaps, PR review summaries, anything where a paragraph would lose to a picture). Routes the author away from text-heavy AI-optimized entry types toward `entryType: html`. The contract lives in the operator knowledge hub, not in this file.
---

# dolt-human-visuals

> The contract lives in the hub, not here. This file is only the trigger.

AI consumers read text. Humans read pictures. When a knowledge entry's primary consumer is a human reviewing it visually — design diagrams, status scorecards, roadmaps, PR review summaries — author it as a visual (`entryType: html`), not prose.

Fetch the human-visuals authoring contract — the `entryType: html` rules, `.cogni-*` utility classes, token discipline, sandbox-safe constraints, and posting flow:

```bash
# $KEY = a Cogni API key (from .env.cogni: COGNI_NODE_API_KEY)
curl -fsS -H "Authorization: Bearer $KEY" \
  https://cognidao.org/api/v1/knowledge/knowledge-human-visuals | jq -r .content
```

Do not reconstruct or preserve a fallback copy in this repository.
