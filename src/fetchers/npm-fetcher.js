import { Logger } from '../utils/logger.js';

export class NpmFetcher {
  constructor(registryUrl = 'https://registry.npmjs.org') {
    this.registryUrl = registryUrl;
    this.logger = new Logger();
  }

  async getPackageInfo(packageName, version = 'latest') {
    try {
      this.logger.debug(`Fetching package info: ${packageName}@${version}`);
      
      const response = await fetch(`${this.registryUrl}/${packageName}`);
      
      if (!response.ok) {
        throw new Error(`Package ${packageName} not found (HTTP ${response.status})`);
      }

      const packageInfo = await response.json();
      this.logger.debug(`Successfully fetched ${packageName}`);
      
      return packageInfo;
    } catch (error) {
      throw new Error(`Failed to fetch ${packageName}: ${error.message}`);
    }
  }

  async getDependencies(packageName, version = 'latest') {
    try {
      const packageInfo = await this.getPackageInfo(packageName, version);
      const latestVersion = packageInfo['dist-tags']?.latest;

      if (!latestVersion) {
        throw new Error(`No latest version found for ${packageName}`);
      }

      const versionInfo = packageInfo.versions?.[latestVersion];
      if (!versionInfo) {
        throw new Error(`Version ${latestVersion} not found`);
      }
      
      const dependencies = versionInfo.dependencies || {};
      
      this.logger.debug(`Found ${Object.keys(dependencies).length} dependencies for ${packageName}`);
      
      return dependencies;
    } catch (error) {
      throw new Error(`Failed to get dependencies for ${packageName}: ${error.message}`);
    }
  }
}