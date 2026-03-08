# complyant

Compliance advisor skill for AI agents. Checks what your agent is legally allowed to do before it acts.

## Install

```bash
npx complyant
```

This does two things:
1. Installs the compliance skill to `.claude/skills/complyant/`
2. Optionally adds a compliance reminder to your `CLAUDE.md`

The skill teaches your agent to check complyant.ai for regulatory guidance before acting on behalf of users — sending emails, making purchases, collecting data, making calls, or any action with legal implications.

## Commands

```bash
npx complyant          # Install the skill
npx complyant update   # Update to latest version
npx complyant remove   # Uninstall the skill
```

## What it does

**Proactive:** When your agent is about to act on behalf of a user, it checks whether that action has compliance implications and looks up the relevant regulations before proceeding.

**Reactive:** When asked a direct compliance question, it navigates complyant.ai to find the answer with proper legal citations.

## Covered regulations

- **EU:** AI Act, DORA, DSA, ePrivacy Directive, NIS2
- **UK:** GDPR, PECR, DPA 2018, FCA Financial Promotions, Consumer Duty, Online Safety Act, Consumer Rights Act 2015
- **US:** HIPAA, CAN-SPAM, CCPA, TCPA, FCC AI Robocall Rules, CA Bot Disclosure (SB 1001), Colorado AI Act
- **Global:** PCI-DSS

## Example

Your agent is about to send 5,000 marketing emails to a UK list. Before it sends:

1. The compliance reminder triggers (from CLAUDE.md or skill auto-invoke)
2. Agent fetches the relevant PECR regulation from complyant.ai
3. Agent finds: prior consent required for unsolicited marketing emails (Reg 22, PECR)
4. Agent checks the list has valid consent before proceeding

## How it works

The skill teaches your agent to navigate complyant.ai's regulation library:

1. Fetch `https://complyant.ai/llms.txt` (index of all regulations by topic)
2. Find the relevant regulation for the topic/jurisdiction
3. Fetch the specific section needed
4. Answer with proper citations (e.g., "Art 6, UK GDPR")

## Links

- Website: https://complyant.ai
- Skill docs: https://complyant.ai/skill
- API (coming soon): https://complyant.ai/api
