const fs = require('fs');
const path = require('path');

// Create the missing client reference manifest file
const manifestDir = '.next/server/app/(dashboard)';
const manifestFile = path.join(manifestDir, 'page_client-reference-manifest.js');

try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(manifestDir)) {
        fs.mkdirSync(manifestDir, { recursive: true });
        console.log('✅ Created directory:', manifestDir);
    }

    // Create empty manifest file
    fs.writeFileSync(manifestFile, '{}');
    console.log('✅ Created client reference manifest:', manifestFile);
} catch (error) {
    console.error('❌ Error creating client reference manifest:', error);
}
