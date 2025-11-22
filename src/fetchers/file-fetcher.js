import fs from 'fs/promises';
import { Logger } from '../utils/logger.js';

export class FileFetcher {
  constructor(filePath) {
    this.filePath = filePath;
    this.logger = new Logger();
    this.repositoryData = null;
  }

  async getDependencies(packageName) {
    try {
      this.logger.debug(`Reading dependencies from file: ${this.filePath}`);
      
      if (!this.repositoryData) {
        const content = await fs.readFile(this.filePath, 'utf-8');
        this.repositoryData = JSON.parse(content);
      }
      
      let dependencies = {};
      
      if (this.repositoryData[packageName]) {
        dependencies = this.repositoryData[packageName].dependencies || {};
      }
      else if (this.repositoryData.name === packageName && this.repositoryData.dependencies) {
        dependencies = this.repositoryData.dependencies;
      }
      else if (this.repositoryData.dependencies && this.repositoryData.dependencies[packageName]) {
        dependencies = {};
      }
      else {
        dependencies = {};
      }
      
      this.logger.debug(`Found ${Object.keys(dependencies).length} dependencies for ${packageName} in file`);
      
      return dependencies;
      
    } catch (error) {
      throw new Error(`Failed to read dependencies from file: ${error.message}`);
    }
  }
}

