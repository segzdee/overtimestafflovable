const fs = require('fs');

try {
  const data = fs.readFileSync('package-lock.json', 'utf8');
  const packageLock = JSON.parse(data);

  if (packageLock && packageLock.packages) {
    console.log('Packages are installed:', Object.keys(packageLock.packages).length > 0);
  } else {
    console.log('No packages found in package-lock.json');
  }
} catch (error) {
  console.error('Error reading package-lock.json:', error.message);
}
