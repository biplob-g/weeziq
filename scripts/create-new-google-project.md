# Create New Google Cloud Project - Step by Step

## Step 1: Create New Project

1. Go to https://console.cloud.google.com/
2. Click "Select a project" at the top
3. Click "New Project"
4. Name: "WeezGen Integration"
5. Click "Create"

## Step 2: Enable APIs

1. Go to APIs & Services > Library
2. Search for "Google Sheets API"
3. Click on it and click "Enable"
4. Search for "Google Drive API"
5. Click on it and click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to APIs & Services > OAuth consent screen
2. Click "Configure Consent Screen"
3. User Type: External
4. App name: "WeezGen"
5. User support email: [Your email]
6. Developer contact information: [Your email]
7. Click "Save and Continue"
8. Scopes: Add these scopes:
   - https://www.googleapis.com/auth/spreadsheets
   - https://www.googleapis.com/auth/userinfo.email
9. Click "Save and Continue"
10. Test users: Add your email
11. Click "Save and Continue"

## Step 4: Create OAuth Credentials

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "OAuth client ID"
3. Application type: Web application
4. Name: "WeezGen Web Client"
5. Authorized redirect URIs:
   - http://localhost:3000/api/integrations/google/callback
6. Click "Create"
7. Copy the Client ID and Client Secret

## Step 5: Update Environment Variables

Update your .env.local file:

```
GOOGLE_CLIENT_ID=your_new_client_id
GOOGLE_CLIENT_SECRET=your_new_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/integrations/google/callback
```

## Step 6: Test

1. Restart your development server
2. Go to http://localhost:3000/integration
3. Click "Connect Google Sheets"
4. You should see Google's consent screen
