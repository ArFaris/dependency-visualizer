import fs from 'fs/promises';
import { Logger } from '../utils/logger.js';

export class FileFetcher {
  constructor(filePath) {
    this.filePath = filePath;
    this.logger = new Logger();
  }

  async getDependencies(packageName) {
    try {
      this.logger.debug(`Reading dependencies from file: ${this.filePath}`);
      
      const content = await fs.readFile(this.filePath, 'utf-8');
      const packageData = JSON.parse(content);
      
      let dependencies = {};
      
      if (packageData.dependencies) {
        dependencies = packageData.dependencies;
      } else if (packageData[packageName] && packageData[packageName].dependencies) {
        dependencies = packageData[packageName].dependencies;
      } else {
        throw new Error(`Package ${packageName} not found in file`);
      }
      
      this.logger.debug(`Found ${Object.keys(dependencies).length} dependencies for ${packageName} in file`);
      
      return dependencies;
    } catch (error) {
      throw new Error(`Failed to read dependencies from file: ${error.message}`);
    }
  }
}