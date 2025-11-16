import { DependencyAnalyzer } from '../core/analyzer.js';

export async function breadthFirstSearch(options) {
    try {
        const analyzer = new DependencyAnalyzer(options);
        const startPackage = options.package;

        const visitedPackages = new Set();
        visitedPackages.add(startPackage);

        const queue = [];
        queue.push({name: startPackage, version: null, level: 0});

        const allDependencies = new Map();
        allDependencies.set(startPackage, { dependencies: {}, version: null, level: 0 });

        while (queue.length !== 0) {
            const { name: node, version, level: currentLevel } = queue.shift();
            options.package = node;

            if (currentLevel >= options.maxDepth && node !== startPackage) {
                continue;
            }

            const dependencies = await analyzer.analyze();
            allDependencies.set(node, { dependencies, version, level: currentLevel });

            Object.entries(dependencies).forEach(([name, version]) => {
                if (!visitedPackages.has(name) && (options.filter === null || !options.filter.includes(name))) {
                    visitedPackages.add(name);
                    queue.push({ name, version, level: currentLevel + 1 });
                }
            });
        }

        return {
            root: startPackage,
            dependencies: allDependencies,
        };
    } catch (error) {
        throw error;
    }
}
