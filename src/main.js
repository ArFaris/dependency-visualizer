import { Logger } from './utils/logger.js';
import { breadthFirstSearch } from './graph/breadthFirstSearch.js';
import { buildAsciiTree } from './graph/formatToAsciiTree.js';

export async function runApplication(options) {
  const logger = new Logger();
  
  try {
    logger.info('Starting application...');
    
    const dependencyGraph = await breadthFirstSearch(options);
    const tree = buildAsciiTree(dependencyGraph);

    console.log('\nAscii Tree: \n');
    logger.log(tree);

    logger.success('Stage 3 completed successfully!');
  } catch (error) {
    logger.error(`Application failed: ${error.message}`);
    throw error;
  }
}
