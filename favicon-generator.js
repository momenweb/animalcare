// This is a simple SVG string that represents the logo in the navbar
// Red cross with blue paw print
const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <!-- Red Cross -->
  <path d="M32 4v56M4 32h56" stroke="#E53E3E" stroke-width="8" stroke-linecap="round" />
  
  <!-- Blue Paw Print -->
  <g fill="#3182CE" transform="translate(16, 16)">
    <circle cx="16" cy="8" r="4" />
    <circle cx="8" cy="16" r="4" />
    <circle cx="24" cy="16" r="4" />
    <circle cx="12" cy="28" r="4" />
    <circle cx="20" cy="28" r="4" />
    <path d="M16 16 Q 16 20, 12 28 M16 16 Q 16 20, 20 28" stroke="#3182CE" stroke-width="4" />
  </g>
</svg>`;

// Write this to a file
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Ensure directory exists
try {
  mkdirSync('public/favicon', { recursive: true });
} catch (err) {
  // Directory already exists or cannot be created
  console.error('Error creating directory:', err);
}

try {
  writeFileSync('public/favicon/favicon.svg', svgString);
  console.log('SVG favicon generated at public/favicon/favicon.svg');
  console.log('Now you need to convert this SVG to various PNG sizes and ICO format.');
  console.log('You can use a tool like https://realfavicongenerator.net/ to upload this SVG and get all the necessary files.');
} catch (err) {
  console.error('Error writing file:', err);
} 