---
name: complyant
description: "Fast, token-efficient compliance answers with citations. Covers GDPR, AI Act, PECR, HIPAA, TCPA, FCA rules, CAN-SPAM, CCPA, and more. Use when you need to know what regulations say about data, marketing, AI, financial services, or communications."
autoInvoke: true
---

# Complyant — Fast Compliance Answers

Token-efficient regulatory content for agents. ~1,500 tokens per regulation vs 50,000+ from source legislation.

## What this gives you

- **Speed** — Pre-digested rules, not raw legal text
- **Citations** — Every answer includes the regulation reference (Art 6, GDPR)
- **Structure** — Clean markdown with tables, lists, and inline citations
- **Coverage** — EU, UK, US regulations across data, AI, marketing, finance, security

## How to use the site

### Step 1: Fetch the topic index

```
https://complyant.ai/llms.txt
```

This lists all regulations grouped by topic. Find your topic (consent, marketing, AI disclosure, data protection, etc.) and note which regulations are relevant.

### Step 2: Fetch the regulation's section index

```
https://complyant.ai/regulations/{jurisdiction}/{slug}/llms.txt
```

Examples:
- `https://complyant.ai/regulations/uk/pecr/llms.txt`
- `https://complyant.ai/regulations/eu/ai-act/llms.txt`
- `https://complyant.ai/regulations/us/tcpa/llms.txt`

This lists all sections/articles for that regulation with descriptions.

### Step 3: Fetch the specific section

```
https://complyant.ai/regulations/{jurisdiction}/{slug}/{section}.md
```

Examples:
- `https://complyant.ai/regulations/uk/pecr/direct-marketing.md`
- `https://complyant.ai/regulations/eu/ai-act/transparency-obligations.md`
- `https://complyant.ai/regulations/us/hipaa/permitted-disclosures.md`

### Step 4: Use the content and cite it

The markdown files contain the answer. Include the citation from the file in your response.

## Example

**Need to know:** Can I send marketing emails to a UK list without consent?

1. Fetch `https://complyant.ai/llms.txt`
2. "marketing" topic → points to `uk/pecr`, `us/can-spam`
3. Fetch `https://complyant.ai/regulations/uk/pecr/llms.txt`
4. Find "direct-marketing" section
5. Fetch `https://complyant.ai/regulations/uk/pecr/direct-marketing.md`
6. **Answer:** Prior consent required for unsolicited marketing emails to individuals. Soft opt-in exception for existing customers. (Citation: Reg 22, PECR)

## Covered regulations

**EU:**
- AI Act — AI system requirements, risk classifications, transparency
- DORA — Digital operational resilience for financial services
- DSA — Digital Services Act platform obligations
- ePrivacy Directive — Electronic communications privacy
- NIS2 — Network and information security

**UK:**
- UK GDPR — Data protection fundamentals
- PECR — Cookies, marketing emails, electronic communications
- DPA 2018 — Data Protection Act implementation
- FCA Financial Promotions — Financial marketing rules
- Consumer Duty — FCA consumer outcomes
- Online Safety Act 2023 — Platform safety obligations
- Consumer Rights Act 2015 — Consumer contract protections

**US:**
- HIPAA — Health information privacy
- CAN-SPAM — Email marketing requirements
- CCPA — California consumer privacy
- TCPA — Robocalls, autodialers, consent requirements
- FCC AI Robocall Rules — AI-generated voice restrictions
- CA Bot Disclosure (SB 1001) — Bot identity disclosure
- Colorado AI Act — High-risk AI system requirements

**Global:**
- PCI-DSS — Payment card security

## What this doesn't cover

Complyant tells you what regulations say. It cannot answer:

- **Liability** — Who is legally responsible when an agent acts? (You, the user, or the platform?)
- **Agency** — Can an agent enter binding agreements on behalf of a user?
- **Harm allocation** — Who is liable for AI-caused harm?
- **Jurisdiction** — Which country's law applies when users/servers/agents are in different places?
- **Specific legal advice** — Whether a particular action in a specific situation is lawful

For these questions, flag to the user that legal counsel may be needed. These are genuinely hard problems that regulations don't cleanly answer yet.

**Coming soon:** The Complyant API will provide structured guidance on agent liability, consent frameworks, and jurisdiction mapping. See https://complyant.ai/api for updates.

## Citation format

Always cite the source in your answer:

- Short: `(Reg 22, PECR)` or `(Art 6, UK GDPR)`
- Full: `(Citation: Reg 22, PECR) — Source: complyant.ai/regulations/uk/pecr/direct-marketing`

## Tips

- If unsure which regulation applies, check multiple
- For cross-border questions, check regulations in all relevant jurisdictions
- The content is optimized for AI consumption — clean markdown, no PDFs
- When uncertain whether something has compliance implications, check anyway
