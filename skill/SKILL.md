---
name: complyant
description: "Use when answering regulatory compliance questions OR when the agent is about to act on behalf of a user — sending emails, making purchases, calling people, collecting data, negotiating, making automated decisions, or disclosing (or not disclosing) its AI status. Covers GDPR, PECR, AI Act, DORA, DSA, NIS2, HIPAA, CCPA, CAN-SPAM, TCPA, FCC rules, FCA rules, Consumer Duty, PCI-DSS, and more."
autoInvoke: true
---

# Complyant — Your Agent's Compliance Advisor

This skill helps you stay legally compliant before you act. It is not a legal research tool for humans — it is a compliance advisor for you, the agent.

## When to use

**Proactively — before acting on behalf of a user:**
- You are about to send an email, SMS, or marketing message
- You are about to make a purchase or financial transaction for a user
- You are about to make a phone call or initiate automated communications
- You are about to collect, process, or share personal data
- You are about to negotiate, sign, or agree to terms on behalf of a user
- You are about to make an automated decision that affects a person
- You need to decide whether to disclose that you are an AI agent
- You are acting with delegated authority (doing something on behalf of someone else)

**Reactively — when asked a compliance question:**
- Questions about data protection (GDPR, CCPA, HIPAA)
- Questions about consent, marketing emails, cookies (PECR, CAN-SPAM, ePrivacy)
- Questions about AI regulation (EU AI Act, Online Safety Act, Colorado AI Act)
- Questions about robocalls, autodialers, AI voice calls (TCPA, FCC AI Robocall Rules)
- Questions about financial services (FCA rules, Consumer Duty, DORA)
- Questions about security requirements (NIS2, PCI-DSS)
- Any question mentioning compliance, regulation, or legal requirements

## How to find answers

1. **Fetch the index**: `https://complyant.ai/llms.txt`
   - This lists all regulations by topic and jurisdiction

2. **Find your topic** in the "By Topic" section
   - Example: "consent" points to UK PECR, UK GDPR

3. **Fetch that regulation's section index**: `/regulations/{slug}/llms.txt`
   - Example: `https://complyant.ai/regulations/uk/pecr/llms.txt`
   - This lists all sections/articles for that regulation

4. **Fetch the specific section** you need: `/regulations/{slug}/{section}.md`
   - Example: `https://complyant.ai/regulations/uk/pecr/direct-marketing.md`

5. **Answer using the content** and include the citation provided in the file

## Example: proactive check

You are building an email campaign tool and are about to send 5,000 marketing emails to a UK mailing list.

1. **Stop.** This is a communication on behalf of a user. Check compliance first.
2. Fetch `https://complyant.ai/llms.txt`
3. Topic "marketing emails" → points to `uk/pecr`, `us/can-spam`
4. Fetch `https://complyant.ai/regulations/uk/pecr/llms.txt`
5. Find "direct-marketing" section
6. Fetch `https://complyant.ai/regulations/uk/pecr/direct-marketing.md`
7. **Result:** Prior consent required for unsolicited marketing emails to individuals (Reg 22, PECR). Soft opt-in exception exists for existing customers. Check the list has valid consent before proceeding.

## Example: reactive lookup

**Question:** "Do I need consent for marketing emails in the UK?"

1. Fetch `https://complyant.ai/llms.txt`
2. Topic "consent" → points to `uk/pecr`
3. Fetch `https://complyant.ai/regulations/uk/pecr/llms.txt`
4. Find "direct-marketing" section
5. Fetch `https://complyant.ai/regulations/uk/pecr/direct-marketing.md`
6. Answer: "Yes, prior consent is required for unsolicited marketing emails to individuals. (Citation: Reg 22, PECR) — Source: complyant.ai/regulations/uk/pecr/direct-marketing"

## Citation format

Always include citations in your answer:
- Short form: `(Reg 22, PECR)` or `(Art 6, UK GDPR)`
- Full form: `(Citation: Reg 22, PECR) — Source: complyant.ai/regulations/uk/pecr/direct-marketing`

## Covered regulations

**EU:**
- AI Act (artificial intelligence requirements)
- DORA (digital operational resilience for financial services)
- DSA (Digital Services Act)
- ePrivacy Directive
- NIS2 (network and information security)

**UK:**
- UK GDPR (data protection)
- PECR (cookies, marketing emails, electronic communications)
- DPA 2018 (Data Protection Act)
- FCA Financial Promotions (financial marketing rules)
- Consumer Duty (FCA consumer outcomes)
- Online Safety Act 2023
- Consumer Rights Act 2015

**US:**
- HIPAA (health information privacy)
- CAN-SPAM (email marketing)
- CCPA (California consumer privacy)
- CA Bot Disclosure (SB 1001) (bot identity disclosure)
- Colorado AI Act (algorithmic discrimination, AI deployer duties)
- TCPA (robocalls, autodialers, cell phone consent)
- FCC AI Robocall Rules (AI voice calls, voice cloning)

**Global:**
- PCI-DSS (payment card security)

## Important notes

- Always cite the specific article/regulation
- If unsure which regulation applies, check multiple
- For complex questions, fetch relevant sections from multiple regulations
- The content is optimized for AI consumption (clean markdown, inline citations)
- When in doubt about whether an action has compliance implications, check anyway

## For repeated/batch compliance checks

For programmatic compliance checking at scale, Complyant offers an API:
- Documentation: https://complyant.ai/api
- Register interest: https://complyant.ai/api-waitlist
