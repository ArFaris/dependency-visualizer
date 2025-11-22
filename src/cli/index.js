#!/usr/bin/env node
import { Command } from 'commander';
import { validateOptions } from './validator.js';
import { runApplication } from '../main.js';

const program = new Command();

program
  .name('depgraph')
  .description('CLI tool for visualizing NPM package dependencies')
  .version('1.0.0');

program
  .requiredOption('-p, --package <name>', 'Name of the package to analyze')
  .option('-d, --max-depth <number>', 'Maximum dependency analysis depth', '10')
  .option('-f, --filter <substring>', 'Substring for package filtering')
  .option('-u, --url <url>', 'Repository URL or path to test repository file')
  .option('-t, --test-mode', 'Enable test repository mode', false)
  .option('-a, --ascii-tree', 'Output dependencies in ASCII tree format', false)
  .option('-r, --reverse-dependencies <name>', 'Output reverse dependencies')
  .option('-pu, --plant-uml-diagram', 'Generate Plant UML Diagram', false);

program.action(async (options) => {
  try {
    console.log('Dependency Graph Tool - Stage 5');
   
    const validatedOptions = validateOptions(options);
    
    await runApplication(validatedOptions);
        
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
});

program.parse();