import { Logger } from './utils/logger.js';
import { breadthFirstSearch } from './graph/breadthFirstSearch.js';
import { buildAsciiTree } from './graph/formatToAsciiTree.js';
import { findReverseDependencies } from './graph/findReverseDependencies.js';
import { PlantUMLGenerator } from './PlantUMLGenerator/PlantUMLGenerator.js';
import { writeFileSync } from 'fs';

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

    if (options.plantUMLDiagram) {
        console.log('PlantUML Diagram:');
        const generator = new PlantUMLGenerator();
        
        const plantUMLText = generator.generatePlantUMLText(dependencyGraph);
        console.log('PlantUML source:');
        console.log(plantUMLText);
        
        try {
            const imageBuffer = await generator.generateDiagram(plantUMLText);
            
            writeFileSync('dependencies.png', new Uint8Array(imageBuffer));
            console.log('✅ Diagram saved as dependencies.png');
            
        } catch (error) {
            console.log('❌ Failed to generate image, using text only');
            console.log(plantUMLText);
        }
    }

    logger.success('Stage 5 completed successfully!');
  } catch (error) {
    logger.error(`Application failed: ${error.message}`);
    throw error;
  }
}
