export function validateOptions(options) {
  const errors = [];

  if (!options.package || options.package.trim() === '') {
    errors.push('Package name is required');
  }

  const maxDepth = parseInt(options.maxDepth);
  if (isNaN(maxDepth) || maxDepth < 1) {
    errors.push('Max depth must be a positive number');
  }

  if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.map(e => `  - ${e}`).join('\n')}`);
  }

  return {
    package: options.package.trim(), 
    url: options.url || null,
    testMode: Boolean(options.testMode),
    asciiTree: Boolean(options.asciiTree),
    maxDepth: maxDepth,
    filter: options.filter ? options.filter.trim() : null, 
    reverseDependencies: options.reverseDependencies
  };
}