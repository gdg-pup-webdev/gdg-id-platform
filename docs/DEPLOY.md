# Deploying to Google Cloud Run

This guide explains how to deploy the ID Platform to Google Cloud Run.

## Prerequisites

1. **Google Cloud SDK**: Ensure `gcloud` CLI is installed and authenticated.
   ```bash
   gcloud auth login
   gcloud config set project [YOUR_PROJECT_ID]
   ```
2. **APIs Enabled**: Enable Cloud Run and Container Registry/Artifact Registry APIs.
   ```bash
   gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
   ```

## 1. Environment Variables

You need to prepare your environment variables. Since this application uses Firebase regarding client-side keys and server-side secrets, you should set them in Cloud Run.

Collect the following values:

- `NEXT_PUBLIC_APIKEY`
- `NEXT_PUBLIC_AUTHDOMAIN`
- `NEXT_PUBLIC_PROJECTID`
- `NEXT_PUBLIC_STORAGEBUCKET`
- `NEXT_PUBLIC_MESSAGINGSENDERID`
- `NEXT_PUBLIC_APPID`
- `NEXT_PUBLIC_MEASUREMENTID`
- `NEXT_PUBLIC_ENV` (Set to "production")
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `ADMIN_EMAIL`
- `SITE_URL` (Your Cloud Run URL after first deployment)

## 2. Deploy Command

Run the following command in your terminal. Replace `[YOUR_REGION]` (e.g., `asia-southeast1`) and the environment variable placeholders.

```bash
gcloud run deploy gdg-id-platform \
  --source . \
  --platform managed \
  --region [YOUR_REGION] \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_ENV=production \
  --set-env-vars NEXT_PUBLIC_APIKEY=[VALUE] \
  --set-env-vars NEXT_PUBLIC_AUTHDOMAIN=[VALUE] \
  --set-env-vars NEXT_PUBLIC_PROJECTID=[VALUE] \
  --set-env-vars NEXT_PUBLIC_STORAGEBUCKET=[VALUE] \
  --set-env-vars NEXT_PUBLIC_MESSAGINGSENDERID=[VALUE] \
  --set-env-vars NEXT_PUBLIC_APPID=[VALUE] \
  --set-env-vars NEXT_PUBLIC_MEASUREMENTID=[VALUE] \
  --set-env-vars SUPABASE_URL=[VALUE] \
  --set-env-vars SUPABASE_SECRET_KEY=[VALUE] \
  --set-env-vars GOOGLE_CLIENT_ID=[VALUE] \
  --set-env-vars GOOGLE_CLIENT_SECRET=[VALUE] \
  --set-env-vars GOOGLE_REFRESH_TOKEN=[VALUE] \
  --set-env-vars ADMIN_EMAIL=[VALUE]
```

_Note: For `SITE_URL`, you can update it after the first deployment when you get the generated URL, or map a custom domain first._

## 3. Dealing with Secrets (Recommended)

For sensitive keys like `SUPABASE_SECRET_KEY` and Google credentials, it is recommended to use **Secret Manager**.

1. Create a secret:
   ```bash
   echo -n "your-secret-value" | gcloud secrets create supabase-secret-key --data-file=-
   ```
2. Access it in Cloud Run:

## Option 2: Continuous Deployment via GitHub (Recommended)

If you don't have the `gcloud` CLI installed locally, you can set up automatic deployments:

1. Push your code to a GitHub repository.
2. Go to the [Google Cloud Console > Cloud Run](https://console.cloud.google.com/run).
3. Click **Create Service**.
4. Select **Continuously deploy new revisions from a source repository**.
5. Log in with GitHub and select your repository.
6. Configure the build:
   - **Build Logic**: Dockerfile
   - **Source location**: / (root directory)
7. In the **Variables & Secrets** tab, add all the environment variables listed in Section 1.
8. Click **Create**.

Google Cloud Build will automatically build your Docker container and deploy it to Cloud Run whenever you push changes to your repository.

## Testing Locally

Before deploying, you can test your Docker image locally to ensure everything works as expected.

1.  **Build the Image**:
    You need to pass your local environment variables as build arguments.

    ```bash
    docker build \
      --build-arg NEXT_PUBLIC_ENV=production \
      --build-arg NEXT_PUBLIC_APIKEY=[VALUE] \
      ... (other public vars) \
      -t gdg-id-platform:local .
    ```

2.  **Run the Container**:
    Pass your server-side secrets as environment variables.

    ```bash
    docker run -p 3000:3000 \
      -e SUPABASE_URL=[VALUE] \
      -e SUPABASE_SECRET_KEY=[VALUE] \
      ... (other secret vars) \
      gdg-id-platform:local
    ```

3.  **Access**: Open [http://localhost:3000](http://localhost:3000).

## Option 3: Deploy from Container Image (Artifact Registry or Docker Hub)

If you prefer to build the image locally and push it to a registry, follow these steps.

### Prerequisites

1.  **Install Google Cloud SDK**:
    - **Recommended**: Download the official Windows installer from [cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install#windows).
    - Run the installer and follow the prompts.
    - Check "Start Google Cloud SDK Shell" at the end.
    - Run `gcloud init` to log in.

2.  **Install Docker**: Ensure Docker Desktop is running.

### A. Using Google Artifact Registry (Recommended)

1.  **Enable Artifact Registry API**:

    ```bash
    gcloud services enable artifactregistry.googleapis.com
    ```

2.  **Create a Repository**:

    ```bash
    gcloud artifacts repositories create id-platform \
      --repository-format=docker \
      --location=[YOUR_REGION] \
      --description="Docker repository for ID Platform"
    ```

3.  **Configure Docker Auth**:

    ```bash
    gcloud auth configure-docker [YOUR_REGION]-docker.pkg.dev
    ```

4.  **Build and Tag (Passing Public Env Vars)**:
    Since Next.js "bakes in" `NEXT_PUBLIC_` variables at build time, you must pass them here.
    _(Replace `[VALUE]` with your actual values)_

    ```bash
    docker build \
      --build-arg NEXT_PUBLIC_ENV=production \
      --build-arg NEXT_PUBLIC_APIKEY=[VALUE] \
      --build-arg NEXT_PUBLIC_AUTHDOMAIN=[VALUE] \
      --build-arg NEXT_PUBLIC_PROJECTID=[VALUE] \
      --build-arg NEXT_PUBLIC_STORAGEBUCKET=[VALUE] \
      --build-arg NEXT_PUBLIC_MESSAGINGSENDERID=[VALUE] \
      --build-arg NEXT_PUBLIC_APPID=[VALUE] \
      --build-arg NEXT_PUBLIC_MEASUREMENTID=[VALUE] \
      -t [YOUR_REGION]-docker.pkg.dev/[PROJECT_ID]/id-platform/gdg-id-platform:latest .
    ```

5.  **Push the Image**:

    ```bash
    docker push [YOUR_REGION]-docker.pkg.dev/[PROJECT_ID]/id-platform/gdg-id-platform:latest
    ```

6.  **Deploy (Passing Secrets)**:
    Now pass the **server-side secrets** (Supabase, Google Credentials, etc.) to the runtime container.
    ```bash
    gcloud run deploy gdg-id-platform \
      --image [YOUR_REGION]-docker.pkg.dev/[PROJECT_ID]/id-platform/gdg-id-platform:latest \
      --platform managed \
      --region [YOUR_REGION] \
      --allow-unauthenticated \
      --set-env-vars SUPABASE_URL=[VALUE] \
      --set-env-vars SUPABASE_SECRET_KEY=[VALUE] \
      --set-env-vars GOOGLE_CLIENT_ID=[VALUE] \
      --set-env-vars GOOGLE_CLIENT_SECRET=[VALUE] \
      --set-env-vars GOOGLE_REFRESH_TOKEN=[VALUE] \
      --set-env-vars ADMIN_EMAIL=[VALUE]
    ```

### B. Using Docker Hub

1.  **Login to Docker Hub**:

    ```bash
    docker login
    ```

2.  **Build and Tag**:

    ```bash
    docker build -t [YOUR_DOCKERHUB_USERNAME]/gdg-id-platform:latest .
    ```

3.  **Push the Image**:

    ```bash
    docker push [YOUR_DOCKERHUB_USERNAME]/gdg-id-platform:latest
    ```

4.  **Deploy**:
    ```bash
    gcloud run deploy gdg-id-platform \
      --image [YOUR_DOCKERHUB_USERNAME]/gdg-id-platform:latest \
      --platform managed \
      --region [YOUR_REGION] \
      --allow-unauthenticated \
      --set-env-vars ...
    ```
