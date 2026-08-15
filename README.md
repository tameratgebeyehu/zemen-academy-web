# Zemen Academy Website

Official public website for Zemen Academy at `zemenacademy.com`.

## Included pages

- Home
- Download
- Help center
- Premium account activation
- Privacy policy
- Terms of service
- Account deletion
- Android Digital Asset Links verification

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Production verification

```bash
npm run build
```

## Premium portal configuration

The server-side portal uses the existing Zemen Academy Apps Script deployment. `ZEMEN_APPS_SCRIPT_URL` can override the current deployment URL in the hosted environment. To embed the optional walkthrough video, set `NEXT_PUBLIC_PREMIUM_GUIDE_VIDEO_ID` to the YouTube video ID.

The production server can then be started with:

```bash
npm run start
```

## Android verification

The Digital Asset Links file is served at:

`https://zemenacademy.com/.well-known/assetlinks.json`

Keep its package name and SHA-256 certificate fingerprint synchronized with the Android release signing certificate.
