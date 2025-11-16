import { NpmFetcher } from '../fetchers/npm-fetcher.js';
import { FileFetcher } from '../fetchers/file-fetcher.js';
import { Logger } from '../utils/logger.js';

export class DependencyAnalyzer {
  constructor(options) {
    this.options = options;
    this.logger = new Logger();
  }

  async analyze() {
    try {
      console.log('\n');
      this.logger.info(`Analyzing package: ${this.options.package}`);
      
      const fetcher = this.createFetcher();
      const dependencies = await fetcher.getDependencies(this.options.package);
      
      this.displayDirectDependencies(dependencies);
      
      return dependencies;
    } catch (error) {
      this.logger.error(`Analysis failed: ${error.message}`);
      throw error;
    }
  }

  createFetcher() {
    if (this.options.url) {
      this.logger.debug(`Using file fetcher with: ${this.options.url}`);
      return new FileFetcher(this.options.url);
    } else {
      this.logger.debug('Using npm registry fetcher');
      return new NpmFetcher();
    }
  }

  displayDirectDependencies(dependencies) {
    console.log('\nDirect Dependencies:');
    console.log('─────────────────────');
    
    if (Object.keys(dependencies).length === 0) {
      console.log('No dependencies found');
      return;
    }

    Object.entries(dependencies).forEach(([name, version]) => {
      console.log(`  - ${name}: ${version}`);
    });
  }
}