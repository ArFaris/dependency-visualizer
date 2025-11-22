export function findReverseDependencies(targetPackage, dependencyGraph) {
    const reverseDeps = new Set();
    const { dependencies } = dependencyGraph;
    const toProcess = new Set([targetPackage]);
    const processed = new Set();

    while (toProcess.size > 0) {
        const current = toProcess.values().next().value;
        toProcess.delete(current);

        if (processed.has(current)) {
            continue;
        }
        processed.add(current);
 
        for (const [packageName, packageData] of dependencies) {
            const deps = packageData.dependencies || {};

            if (Object.keys(deps).includes(current) && packageName !== targetPackage) {
                reverseDeps.add(packageName);
                if (!processed.has(packageName)) {
                    toProcess.add(packageName);
                }
            }
        }
    }
    
    return Array.from(reverseDeps);
}