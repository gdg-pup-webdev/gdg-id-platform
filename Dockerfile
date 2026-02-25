FROM node:20-slim AS base

# Install dependencies only when needed
FROM base AS deps
# Install required system dependencies for canvas and other native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Helper to define build args and environment vars
ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_APIKEY
ARG NEXT_PUBLIC_AUTHDOMAIN
ARG NEXT_PUBLIC_PROJECTID
ARG NEXT_PUBLIC_STORAGEBUCKET
ARG NEXT_PUBLIC_MESSAGINGSENDERID
ARG NEXT_PUBLIC_APPID
ARG NEXT_PUBLIC_MEASUREMENTID

# Server-side secrets needed during build
ARG SUPABASE_URL
ARG SUPABASE_SECRET_KEY
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_REFRESH_TOKEN
ARG ADMIN_EMAIL
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_CLIENT_EMAIL
ARG FIREBASE_PRIVATE_KEY

ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_APIKEY=$NEXT_PUBLIC_APIKEY
ENV NEXT_PUBLIC_AUTHDOMAIN=$NEXT_PUBLIC_AUTHDOMAIN
ENV NEXT_PUBLIC_PROJECTID=$NEXT_PUBLIC_PROJECTID
ENV NEXT_PUBLIC_STORAGEBUCKET=$NEXT_PUBLIC_STORAGEBUCKET
ENV NEXT_PUBLIC_MESSAGINGSENDERID=$NEXT_PUBLIC_MESSAGINGSENDERID
ENV NEXT_PUBLIC_APPID=$NEXT_PUBLIC_APPID
ENV NEXT_PUBLIC_MEASUREMENTID=$NEXT_PUBLIC_MEASUREMENTID

# Server-side environment variables
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_SECRET_KEY=$SUPABASE_SECRET_KEY
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_REFRESH_TOKEN=$GOOGLE_REFRESH_TOKEN
ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
ENV FIREBASE_CLIENT_EMAIL=$FIREBASE_CLIENT_EMAIL
ENV FIREBASE_PRIVATE_KEY=$FIREBASE_PRIVATE_KEY

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# Runtime environment variables - these need to be passed again
ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_APIKEY
ARG NEXT_PUBLIC_AUTHDOMAIN
ARG NEXT_PUBLIC_PROJECTID
ARG NEXT_PUBLIC_STORAGEBUCKET
ARG NEXT_PUBLIC_MESSAGINGSENDERID
ARG NEXT_PUBLIC_APPID
ARG NEXT_PUBLIC_MEASUREMENTID
ARG SUPABASE_URL
ARG SUPABASE_SECRET_KEY
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_REFRESH_TOKEN
ARG ADMIN_EMAIL
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_CLIENT_EMAIL
ARG FIREBASE_PRIVATE_KEY

ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_APIKEY=$NEXT_PUBLIC_APIKEY
ENV NEXT_PUBLIC_AUTHDOMAIN=$NEXT_PUBLIC_AUTHDOMAIN
ENV NEXT_PUBLIC_PROJECTID=$NEXT_PUBLIC_PROJECTID
ENV NEXT_PUBLIC_STORAGEBUCKET=$NEXT_PUBLIC_STORAGEBUCKET
ENV NEXT_PUBLIC_MESSAGINGSENDERID=$NEXT_PUBLIC_MESSAGINGSENDERID
ENV NEXT_PUBLIC_APPID=$NEXT_PUBLIC_APPID
ENV NEXT_PUBLIC_MEASUREMENTID=$NEXT_PUBLIC_MEASUREMENTID
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_SECRET_KEY=$SUPABASE_SECRET_KEY
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_REFRESH_TOKEN=$GOOGLE_REFRESH_TOKEN
ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID
ENV FIREBASE_CLIENT_EMAIL=$FIREBASE_CLIENT_EMAIL
ENV FIREBASE_PRIVATE_KEY=$FIREBASE_PRIVATE_KEY

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# set hostname to localhost
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
