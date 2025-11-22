export class PlantUMLGenerator {
    constructor(apiEndpoint = 'https://kroki.io') {
        this.apiEndpoint = apiEndpoint;
    }

    generatePlantUMLText(dependencyGraph) {
        const { root, dependencies } = dependencyGraph;
        let plantUMLCode = `@startuml\ntitle "Dependencies for ${root}"\n\n`;
        const addedEdges = new Set();

        for (const [packageName, packageData] of dependencies) {
            const deps = packageData.dependencies || {};

            for (const [depName, version] of Object.entries(deps)) {
                const edge = `"${packageName}" -> "${depName}"`;
                if (!addedEdges.has(edge)) {
                    plantUMLCode += `${edge}\n`;
                    addedEdges.add(edge);
                }
            }
        }

        plantUMLCode += '@enduml';
        return plantUMLCode;
    }

    async generateDiagram(plantUMLCode, format = 'png') {
        try { 
            const payload = { diagram_source: plantUMLCode };
            const url = `${this.apiEndpoint}/plantuml/${format}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            return await response.arrayBuffer();
        } catch (error) {
            throw new Error(`Diagram generation failed: ${error.message}`);
        } 
    }
}
