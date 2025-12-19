const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  try {
    console.log('🎨 Starting favicon generation...\n');

    const svgPath = path.join(__dirname, '../public/favicon.svg');
    const svgBuffer = fs.readFileSync(svgPath);

    // Generate 16x16
    console.log('📦 Generating favicon-16x16.png...');
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, '../public/favicon-16x16.png'));
    console.log('✅ favicon-16x16.png created');

    // Generate 32x32
    console.log('📦 Generating favicon-32x32.png...');
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '../public/favicon-32x32.png'));
    console.log('✅ favicon-32x32.png created');

    // Generate 180x180 (Apple Touch Icon)
    console.log('📦 Generating apple-touch-icon.png...');
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png created');

    // Generate 192x192 for PWA
    console.log('📦 Generating icon-192x192.png...');
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(__dirname, '../public/icon-192x192.png'));
    console.log('✅ icon-192x192.png created');

    // Generate 512x512 for PWA
    console.log('📦 Generating icon-512x512.png...');
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(__dirname, '../public/icon-512x512.png'));
    console.log('✅ icon-512x512.png created');

    // Generate favicon.ico (32x32 for simplicity)
    console.log('📦 Generating favicon.ico...');
    const icoBuffer = await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toBuffer();
    
    fs.writeFileSync(path.join(__dirname, '../app/favicon.ico'), icoBuffer);
    console.log('✅ favicon.ico created');

    console.log('\n🎉 All favicons generated successfully!');
    console.log('\n📋 Generated files:');
    console.log('   - public/favicon-16x16.png');
    console.log('   - public/favicon-32x32.png');
    console.log('   - public/apple-touch-icon.png');
    console.log('   - public/icon-192x192.png');
    console.log('   - public/icon-512x512.png');
    console.log('   - app/favicon.ico');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
