# Xcode Model Provider Configuration for Composer 1

This document contains the configuration details needed to add Composer 1 from Cursor as a custom model provider in Xcode.

## Required Configuration

### Host URL
**⚠️ TO BE DETERMINED** - The actual host URL needs to be found from one of these sources:
- Cursor's official API documentation
- Cursor Settings → API/Developer settings
- Cursor's GitHub repository or documentation
- Cursor support/community

Possible options to check:
- `https://api.cursor.com` (standard API endpoint)
- `https://composer.cursor.com` (Composer-specific endpoint)
- `http://localhost:PORT` (if Cursor runs a local API server)
- A different domain entirely

### API Endpoint
```
/v1/chat/completions
```
*Note: Adjust based on Cursor's actual API endpoint structure.*

### API Key Header
- **Header Name**: `Authorization`
- **Header Value Format**: `Bearer YOUR_API_KEY_HERE`
  OR
- **Header Name**: `X-API-Key`
- **Header Value**: `YOUR_API_KEY_HERE`

## Steps to Configure in Xcode

1. Open Xcode Preferences (Xcode → Settings → Features → AI Coding)
2. Click on "Model Providers" or "Custom Models"
3. Add a new custom provider
4. Enter the Host URL
5. Configure the API endpoint path
6. Set up the API Key header with your Cursor API key

## Getting Your API Key

To obtain your Cursor API key:
1. Open Cursor Settings
2. Navigate to Account/API settings
3. Generate or copy your API key
4. Use this key in the API Key Header configuration

## Alternative: Using Cursor's Local API

If Cursor provides a local API endpoint, you might use:
- **Host URL**: `http://localhost:PORT` (where PORT is Cursor's local API port)
- **API Endpoint**: `/api/v1/completions` (adjust based on actual endpoint)

## Notes

- Ensure your API key has the necessary permissions for model access
- Check Cursor's documentation for the most up-to-date API endpoints
- Some configurations may require additional headers (e.g., `Content-Type: application/json`)
