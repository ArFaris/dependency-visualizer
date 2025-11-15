import { Logger } from './utils/logger.js';
import { formatConfigOutput } from './utils/helpers.js';
import { DependencyAnalyzer } from './core/analyzer.js';

export async function runApplication(options) {
  const logger = new Logger();
  
  try {
    logger.info('Starting application...');
    
    const analyzer = new DependencyAnalyzer(options);
    await analyzer.analyze();
    
    logger.success('Stage 2 completed successfully!');
  } catch (error) {
    logger.error(`Application failed: ${error.message}`);
    throw error;
  }
}
