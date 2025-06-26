# 🚀 Guía de Despliegue - Strike Feedback

## 📋 Pre-requisitos
- Cuenta en [Render](https://render.com)
- Cuenta en [Vercel](https://vercel.com)
- Repositorio de GitHub con tu código

## 🔧 Paso 1: Preparar el Repositorio

1. **Asegúrate de que tu código esté en GitHub**
2. **Estructura requerida:**
   ```
   /api (backend)
   /   (frontend - Next.js en la raíz)
   ```

## 🗄️ Paso 2: Desplegar la Base de Datos y API en Render

### 2.1 Conectar Repositorio
1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en "New +" → "Blueprint"
3. Conecta tu repositorio de GitHub
4. Selecciona el archivo `api/render.yaml`

### 2.2 Configurar Variables de Entorno
Render detectará automáticamente las variables del `render.yaml`, pero verifica:
- `DATABASE_URL`: Se configurará automáticamente con PostgreSQL
- `FRONTEND_URL`: Actualiza con tu dominio de Vercel
- `NODE_ENV`: production

### 2.3 Desplegar
1. Click en "Apply"
2. Render creará:
   - Base de datos PostgreSQL
   - Servicio web para la API
3. Espera a que termine el build (5-10 minutos)

## 🌐 Paso 3: Desplegar Frontend en Vercel

### 3.1 Importar Proyecto
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. **Root Directory**: Deja en blanco (raíz del proyecto)

### 3.2 Configurar Variables de Entorno
En la sección "Environment Variables":
```
NEXT_PUBLIC_API_URL = https://tu-api.onrender.com
```

### 3.3 Configurar Build
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: Dejar vacío
- **Install Command**: `npm install`

### 3.4 Desplegar
1. Click en "Deploy"
2. Espera a que termine el build (2-5 minutos)

## 🔄 Paso 4: Actualizar CORS

Una vez que tengas la URL de Vercel:

1. **En Render**, ve a tu servicio API
2. **Environment Variables**
3. Actualiza `FRONTEND_URL` con tu URL de Vercel:
   ```
   FRONTEND_URL = https://tu-app.vercel.app
   ```
4. **Redeploy** el servicio

## ✅ Paso 5: Verificar Despliegue

### Backend (Render)
1. Ve a tu URL de API: `https://tu-api.onrender.com/health`
2. Deberías ver: `{"status":"OK","timestamp":"..."}`

### Frontend (Vercel)
1. Ve a tu URL de Vercel: `https://tu-app.vercel.app`
2. Verifica que la app cargue y puedas crear vulnerabilidades

## 🐛 Solución de Problemas Comunes

### API no responde
- Verifica logs en Render Dashboard
- Asegúrate de que `DATABASE_URL` esté configurada
- Verifica que el puerto esté correcto (Render usa el PORT automáticamente)

### CORS errors
- Verifica que `FRONTEND_URL` en Render coincida con tu dominio de Vercel
- Asegúrate de incluir el protocolo: `https://`

### Base de datos vacía
- Los datos semilla se cargan automáticamente en el `startCommand`
- Si no, ejecuta manualmente: `npx prisma db seed` en Render shell

### Frontend no conecta con API
- Verifica `NEXT_PUBLIC_API_URL` en Vercel
- Asegúrate de que la URL incluya el protocolo: `https://`

## 📚 URLs Finales

Después del despliegue tendrás:
- **API**: `https://strike-feedback-api.onrender.com`
- **Frontend**: `https://strike-feedback.vercel.app`
- **Health Check**: `https://strike-feedback-api.onrender.com/health`

## 🔄 Actualizaciones Futuras

### Para actualizar el código:
1. **Push** cambios a GitHub
2. **Vercel**: Se redespliega automáticamente
3. **Render**: Se redespliega automáticamente

### Para cambios en la base de datos:
1. Actualiza `prisma/schema.prisma`
2. Crea migración: `npx prisma migrate dev`
3. Push a GitHub - Render ejecutará `prisma migrate deploy` automáticamente

¡Tu aplicación estará lista para producción! 🎉
