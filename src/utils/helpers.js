export function formatConfigOutput(options) {
  const lines = [];
  
  lines.push('User Configuration:');
  lines.push('──────────────────');
  
  for (const [key, value] of Object.entries(options)) {
    const formattedValue = value === null || value === undefined || value === false ? 'not set' : value;
    const formattedKey = key.padEnd(12);
    lines.push(`  ${formattedKey}: ${formattedValue}`);
  }
  
  return lines.join('\n');
}