import tailwindConfig from '../../../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { cssValueToNumber } from './cssValueToNumber';

export function getBreakpoints() {
  const fullConfig = resolveConfig(tailwindConfig)

  let breakpoints: {[key in string]: number} = {};
  for(const [key, value] of Object.entries(fullConfig.theme.screens)) {
    breakpoints[key] = cssValueToNumber(value);
  }

  return breakpoints;
}