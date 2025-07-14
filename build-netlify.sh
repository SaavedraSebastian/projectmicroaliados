#!/bin/bash
echo "✅ Instalando dependencias con --legacy-peer-deps"
npm install --legacy-peer-deps

echo "✅ Compilando aplicación Angular"
npm run build -- --configuration=production
