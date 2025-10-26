# ParkEase APK File

## Important Note

This is a placeholder for the ParkEase Android APK file.

## To Add Your APK:

1. Build your Android app using Android Studio or React Native
2. Generate a signed APK file
3. Rename it to `parkease.apk`
4. Place it in the root directory of this project
5. Commit and push to GitHub

## Current Setup

The download button in `index.html` points to `/parkease.apk`

When users click "Download Now", they will download the APK file directly.

## File Location

Place your APK file here:
```
/parkease.apk
```

## Alternative: Use External Link

If you want to host the APK elsewhere (like Google Drive, Dropbox, or a CDN), update the link in `index.html`:

```html
<a href="YOUR_APK_URL_HERE" class="btn btn-primary" download>
```

For example:
```html
<a href="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID" class="btn btn-primary" download>
```

## APK Size Recommendation

- Keep APK size under 50 MB for better download experience
- Optimize images and resources
- Use ProGuard/R8 for code shrinking

## Testing

Before deploying:
1. Test the APK on multiple Android devices
2. Verify all features work correctly
3. Check permissions are properly requested
4. Test on different Android versions (8.0+)
