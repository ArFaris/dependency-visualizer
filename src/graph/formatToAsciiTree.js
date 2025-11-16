export function buildAsciiTree(dependencyGraph) {
    const { root, dependencies } = dependencyGraph;
    const visited = new Set();

    function buildTree(node, prefix = '', isLast = true) {
        if (visited.has(node)) {
            return prefix + (isLast ? '└── ' : '├── ') + node + ' [CYCLE]\n';
        }
        
        visited.add(node);
        
        const nodeData = dependencies.get(node);
        const nodeVersion = nodeData?.version ? `: ${nodeData.version}` : '';
        const nodeLine = prefix + (isLast ? '└── ' : '├── ') + node + nodeVersion + '\n';
        
        const depEntries = Object.entries(nodeData?.dependencies || {});
        
        if (depEntries.length === 0) {
            return nodeLine;
        }
        
        let tree = nodeLine;
        const newPrefix = prefix + (isLast ? '    ' : '│   ');
        
        depEntries.forEach(([depName, version], index) => {
            const isLastDep = index === depEntries.length - 1;
            tree += buildTree(depName, newPrefix, isLastDep);
        });
        
        visited.delete(node);
        return tree;
    }
    
    return buildTree(root);
}
