import { Logger } from './utils/logger.js';
import { formatConfigOutput } from './utils/helpers.js';

export async function runApplication(options) {
  const logger = new Logger(options.verbose);
  
  try {
    logger.info('Starting application...');
    
    console.log('\n' + formatConfigOutput(options) + '\n');
    
    logger.success('Stage 1 completed successfully!');
  } catch (error) {
    logger.error(`Application failed: ${error.message}`);
    throw error;
  }
}
