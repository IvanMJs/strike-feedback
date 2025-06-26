#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de despliegue...\n');

// Verificar estructura de archivos
const requiredFiles = [
  'api/render.yaml',
  'api/package.json',
  'api/prisma/schema.prisma',
  'api/src/index.ts',
  'package.json',
  'next.config.mjs',
  'vercel.json'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log('✅', file);
  } else {
    console.log('❌', file, '- FALTA');
    allFilesExist = false;
  }
});

console.log('\n📋 Verificando configuraciones...\n');

// Verificar render.yaml
try {
  const renderYaml = fs.readFileSync('api/render.yaml', 'utf8');
  if (renderYaml.includes('strike-feedback-api')) {
    console.log('✅ render.yaml configurado correctamente');
  } else {
    console.log('⚠️  render.yaml necesita revisión');
  }
} catch (e) {
  console.log('❌ Error leyendo render.yaml');
}

// Verificar package.json del API
try {
  const apiPackage = JSON.parse(fs.readFileSync('api/package.json', 'utf8'));
  if (apiPackage.scripts && apiPackage.scripts.build && apiPackage.scripts.start) {
    console.log('✅ Scripts de API configurados');
  } else {
    console.log('❌ Scripts de API faltantes');
    allFilesExist = false;
  }
} catch (e) {
  console.log('❌ Error leyendo package.json del API');
  allFilesExist = false;
}

// Verificar vercel.json
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  if (vercelConfig.env || vercelConfig.build) {
    console.log('✅ vercel.json configurado');
  } else {
    console.log('⚠️  vercel.json básico (opcional)');
  }
} catch (e) {
  console.log('⚠️  vercel.json no encontrado (opcional)');
}

// Verificar schema de Prisma
try {
  const schema = fs.readFileSync('api/prisma/schema.prisma', 'utf8');
  if (schema.includes('postgresql') || schema.includes('sqlite')) {
    console.log('✅ Schema de Prisma configurado');
  } else {
    console.log('❌ Schema de Prisma necesita configuración');
    allFilesExist = false;
  }
} catch (e) {
  console.log('❌ Error leyendo schema de Prisma');
  allFilesExist = false;
}

console.log('\n📝 Próximos pasos:\n');

if (allFilesExist) {
  console.log('🎉 ¡Todo listo para el despliegue!');
  console.log('');
  console.log('1. Sube tu código a GitHub');
  console.log('2. Ve a Render.com y conecta tu repo');
  console.log('3. Usa el archivo render.yaml para crear servicios');
  console.log('4. Ve a Vercel.com y despliega el frontend');
  console.log('5. Configura las variables de entorno');
  console.log('');
  console.log('📖 Lee DEPLOYMENT.md para instrucciones detalladas');
} else {
  console.log('❌ Hay archivos faltantes o configuraciones incompletas');
  console.log('📖 Revisa los errores arriba y corrige antes de desplegar');
}

console.log('\n🔗 URLs esperadas después del despliegue:');
console.log('API: https://strike-feedback-api.onrender.com');
console.log('Frontend: https://strike-feedback.vercel.app');
console.log('Health: https://strike-feedback-api.onrender.com/health');
