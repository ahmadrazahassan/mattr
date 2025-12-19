# Favicon Generation Guide

The favicon files have been set up with the MATTR logo design matching the footer logo.

## Files Created

1. **favicon.svg** - Vector favicon (recommended for modern browsers)
2. **favicon.ico** - Legacy favicon for older browsers
3. **favicon-16x16.png** - Small favicon
4. **favicon-32x32.png** - Standard favicon
5. **apple-touch-icon.png** - iOS home screen icon (180x180)
6. **site.webmanifest** - PWA manifest file

## Design Specifications

The favicon uses the same "M" pattern as the footer logo:
- **Background:** `#1a1a1a` (dark)
- **Foreground:** `#ffffff` (white)
- **Border Radius:** 10px (25% of 40px viewBox)
- **Stroke Width:** 2.5px
- **Pattern:** Two "M" shapes with zigzag lines

## To Generate PNG Files from SVG

### Option 1: Using Online Tools
1. Go to https://realfavicongenerator.net/
2. Upload `public/favicon.svg`
3. Download the generated package
4. Replace the placeholder PNG files

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Generate 16x16
magick convert -background none -resize 16x16 public/favicon.svg public/favicon-16x16.png

# Generate 32x32
magick convert -background none -resize 32x32 public/favicon.svg public/favicon-32x32.png

# Generate 180x180 (Apple Touch Icon)
magick convert -background none -resize 180x180 public/favicon.svg public/apple-touch-icon.png

# Generate favicon.ico (multi-size)
magick convert public/favicon.svg -define icon:auto-resize=16,32,48 app/favicon.ico
```

### Option 3: Using Node.js (sharp library)
```bash
npm install sharp sharp-ico

# Create a script generate-favicons.js:
```

```javascript
const sharp = require('sharp');
const fs = require('fs');

async function generateFavicons() {
  const svg = fs.readFileSync('public/favicon.svg');
  
  // Generate 16x16
  await sharp(svg)
    .resize(16, 16)
    .png()
    .toFile('public/favicon-16x16.png');
  
  // Generate 32x32
  await sharp(svg)
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');
  
  // Generate 180x180 (Apple Touch Icon)
  await sharp(svg)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  
  console.log('Favicons generated successfully!');
}

generateFavicons();
```

```bash
# Run the script
node generate-favicons.js
```

## Current Status

✅ SVG favicon created and configured
✅ Metadata added to layout.tsx
✅ site.webmanifest created
⚠️ PNG files are placeholders - need to be generated from SVG

## Browser Support

- **Modern Browsers:** Will use `favicon.svg` (Chrome, Firefox, Safari, Edge)
- **Legacy Browsers:** Will fall back to `favicon.ico`
- **iOS/Safari:** Will use `apple-touch-icon.png`
- **PWA:** Will use icons from `site.webmanifest`

## Testing

After generating the PNG files, test the favicon by:
1. Clear browser cache
2. Visit the site
3. Check browser tab for favicon
4. Check bookmarks
5. Test on mobile devices
6. Test PWA installation

## Notes

- The SVG favicon is the primary source of truth
- All PNG files should be generated from the SVG to maintain consistency
- The design matches the footer logo exactly
- Dark background (#1a1a1a) with white strokes (#ffffff)
