#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, rmSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_NAME = 'complyant';
const SKILL_DIR = join(process.cwd(), '.claude', 'skills', SKILL_NAME);
const SOURCE_SKILL = join(__dirname, '..', 'skill', 'SKILL.md');
const CLAUDE_MD_PATH = join(process.cwd(), 'CLAUDE.md');

const COMPLIANCE_REMINDER = `Before acting on behalf of a user — purchasing, emailing, calling, negotiating, collecting data, or making automated decisions — check compliance using the complyant skill. If unsure whether an action has legal implications, check anyway.`;

const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

function printBanner() {
  console.log('');
  console.log(colors.bold('  Complyant'));
  console.log(colors.dim('  Compliance advisor for AI agents'));
  console.log('');
}

function prompt(question) {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function claudeMdHasReminder() {
  if (!existsSync(CLAUDE_MD_PATH)) return false;
  const content = readFileSync(CLAUDE_MD_PATH, 'utf-8');
  return content.includes('complyant');
}

function addClaudeMdReminder() {
  if (existsSync(CLAUDE_MD_PATH)) {
    const content = readFileSync(CLAUDE_MD_PATH, 'utf-8');
    const newContent = content.trimEnd() + '\n\n' + COMPLIANCE_REMINDER + '\n';
    writeFileSync(CLAUDE_MD_PATH, newContent);
  } else {
    writeFileSync(CLAUDE_MD_PATH, COMPLIANCE_REMINDER + '\n');
  }
}

function removeClaudeMdReminder() {
  if (!existsSync(CLAUDE_MD_PATH)) return false;

  const content = readFileSync(CLAUDE_MD_PATH, 'utf-8');
  if (!content.includes('complyant')) return false;

  // Remove the compliance reminder line and any surrounding blank lines
  const lines = content.split('\n');
  const filteredLines = lines.filter(line => !line.includes('complyant skill'));

  // Clean up multiple consecutive blank lines
  let newContent = filteredLines.join('\n');
  newContent = newContent.replace(/\n{3,}/g, '\n\n').trim();

  if (newContent) {
    writeFileSync(CLAUDE_MD_PATH, newContent + '\n');
  } else {
    rmSync(CLAUDE_MD_PATH);
  }

  return true;
}

async function promptClaudeMdInstall() {
  if (claudeMdHasReminder()) {
    console.log(colors.green('  ✓ CLAUDE.md already has compliance reminder'));
    console.log('');
    return;
  }

  console.log('  Would you like to add a compliance reminder to your CLAUDE.md?');
  console.log('');
  console.log(colors.dim('  This adds a single line that reminds your agent to check'));
  console.log(colors.dim('  compliance before acting on behalf of users (sending emails,'));
  console.log(colors.dim('  making purchases, collecting data, etc.)'));
  console.log('');

  const answer = await prompt('  Add to CLAUDE.md? [Y/n] ');

  if (answer === '' || answer === 'y' || answer === 'yes') {
    addClaudeMdReminder();
    console.log('');
    console.log(colors.green('  ✓ Added compliance reminder to CLAUDE.md'));
    console.log('');
  } else {
    console.log('');
    console.log('  No problem. You can add this line to your CLAUDE.md later:');
    console.log('');
    console.log(colors.dim('  "' + COMPLIANCE_REMINDER + '"'));
    console.log('');
  }
}

async function promptClaudeMdRemove() {
  if (!claudeMdHasReminder()) {
    return;
  }

  console.log('  Would you like to remove the compliance reminder from CLAUDE.md?');
  console.log('');

  const answer = await prompt('  Remove from CLAUDE.md? [Y/n] ');

  if (answer === '' || answer === 'y' || answer === 'yes') {
    removeClaudeMdReminder();
    console.log('');
    console.log(colors.green('  ✓ Removed compliance reminder from CLAUDE.md'));
    console.log('');
  } else {
    console.log('');
  }
}

async function install() {
  printBanner();

  if (existsSync(SKILL_DIR)) {
    console.log(colors.yellow('  Skill already installed. Use "update" to refresh.'));
    console.log('');
    return;
  }

  mkdirSync(SKILL_DIR, { recursive: true });
  copyFileSync(SOURCE_SKILL, join(SKILL_DIR, 'SKILL.md'));

  console.log(colors.green('  ✓ Installed to .claude/skills/complyant/'));
  console.log('');

  await promptClaudeMdInstall();

  console.log('  Your agent will now check compliance before acting on behalf');
  console.log('  of users — sending emails, making purchases, collecting data, etc.');
  console.log('');
  console.log(colors.dim('  Learn more: https://complyant.ai/skill'));
  console.log('');
}

async function update() {
  printBanner();

  if (!existsSync(SKILL_DIR)) {
    console.log(colors.yellow('  Skill not installed. Running install...'));
    console.log('');
    mkdirSync(SKILL_DIR, { recursive: true });
  }

  copyFileSync(SOURCE_SKILL, join(SKILL_DIR, 'SKILL.md'));

  console.log(colors.green('  ✓ Updated .claude/skills/complyant/'));
  console.log('');

  // Check if CLAUDE.md has the reminder, offer to add if not
  await promptClaudeMdInstall();
}

async function remove() {
  printBanner();

  if (!existsSync(SKILL_DIR)) {
    console.log(colors.yellow('  Skill not installed.'));
    console.log('');
    return;
  }

  rmSync(SKILL_DIR, { recursive: true });

  console.log(colors.green('  ✓ Removed .claude/skills/complyant/'));
  console.log('');

  await promptClaudeMdRemove();
}

function showHelp() {
  printBanner();
  console.log('  ' + colors.bold('Usage:'));
  console.log('');
  console.log('    npx complyant          Install the skill (default)');
  console.log('    npx complyant add      Install the skill');
  console.log('    npx complyant update   Update to latest version');
  console.log('    npx complyant remove   Remove the skill');
  console.log('');
  console.log('  ' + colors.bold('What it does:'));
  console.log('');
  console.log('    Installs a compliance advisor skill that teaches your agent');
  console.log('    to check complyant.ai before acting on behalf of users —');
  console.log('    sending emails, making purchases, collecting data, etc.');
  console.log('');
  console.log('    The skill fires proactively (before the agent acts) and');
  console.log('    reactively (when asked compliance questions directly).');
  console.log('');
  console.log(colors.dim('  https://complyant.ai'));
  console.log('');
}

// Parse command
const command = process.argv[2] || 'add';

switch (command) {
  case 'add':
  case 'install':
    install();
    break;
  case 'update':
    update();
    break;
  case 'remove':
  case 'uninstall':
    remove();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
