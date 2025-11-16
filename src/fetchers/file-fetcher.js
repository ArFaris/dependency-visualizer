// import fs from 'fs/promises';
// import { Logger } from '../utils/logger.js';

// export class FileFetcher {
//   constructor(filePath) {
//     this.filePath = filePath;
//     this.logger = new Logger();
//   }

//   async getDependencies(packageName) {
//     try {
//       this.logger.debug(`Reading dependencies from file: ${this.filePath}`);
      
//       const content = await fs.readFile(this.filePath, 'utf-8');
//       const packageData = JSON.parse(content);
      
//       let dependencies = {};
      
//       if (packageData.dependencies) {
//         dependencies = packageData.dependencies;
//       } else if (packageData[packageName] && packageData[packageName].dependencies) {
//         dependencies = packageData[packageName].dependencies;
//       }
      
//       this.logger.debug(`Found ${Object.keys(dependencies).length} dependencies for ${packageName} in file`);
      
//       return dependencies;
//     } catch (error) {
//       throw new Error(`Failed to read dependencies from file: ${error.message}`);
//     }
//   }
// }

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
      
      // Загружаем данные один раз
      if (!this.repositoryData) {
        const content = await fs.readFile(this.filePath, 'utf-8');
        this.repositoryData = JSON.parse(content);
      }
      
      let dependencies = {};
      
      // Случай 1: файл как тестовый репозиторий { "A": { "dependencies": {...} }, "B": {...} }
      if (this.repositoryData[packageName]) {
        dependencies = this.repositoryData[packageName].dependencies || {};
      }
      // Случай 2: файл как package.json { "name": "test-package", "dependencies": {...} }
      else if (this.repositoryData.name === packageName && this.repositoryData.dependencies) {
        dependencies = this.repositoryData.dependencies;
      }
      // Случай 3: файл как package.json, но запрашиваем не основной пакет
      else if (this.repositoryData.dependencies && this.repositoryData.dependencies[packageName]) {
        // Для пакетов, которые есть в dependencies основного пакета, но нет в корне репозитория
        // Возвращаем пустые зависимости (или можно искать их отдельно)
        dependencies = {};
      }
      // Случай 4: пакет не найден - возвращаем пустые зависимости
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

