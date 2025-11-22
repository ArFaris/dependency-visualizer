import { Logger } from './utils/logger.js';
import { breadthFirstSearch } from './graph/breadthFirstSearch.js';
import { buildAsciiTree } from './graph/formatToAsciiTree.js';
import { findReverseDependencies } from './graph/findReverseDependencies.js';

export async function runApplication(options) {
  const logger = new Logger();
  
  try {
    logger.info('Starting application...');
    
    const dependencyGraph = await breadthFirstSearch(options);
   
    if (options.reverseDependencies) {
      const reverseDeps = findReverseDependencies(options.reverseDependencies, dependencyGraph);
      console.log('\nReverse Dependencies:');
      if (reverseDeps.length === 0) {
        console.log('  (none)');
      } else {
        reverseDeps.forEach(dep => console.log(`  - ${dep}`));
      }
    }

    if (options.asciiTree) {
      const tree = buildAsciiTree(dependencyGraph);
      console.log('\nAscii Tree: \n');
      logger.log(tree);
    }

    logger.success('Stage 4 completed successfully!');
  } catch (error) {
    logger.error(`Application failed: ${error.message}`);
    throw error;
  }
}
