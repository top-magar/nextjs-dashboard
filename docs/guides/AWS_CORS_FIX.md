# AWS S3 CORS Configuration - Quick Fix

**Issue**: "Expected params.CORSConfiguration.CORSRules to be an Array"

**Solution**: Use the correct JSON format (array only, no wrapper)

---

## ❌ WRONG Format

```json
{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": ["ETag"]
    }
  ]
}
```

**Problem**: Has `{"CORSRules": ...}` wrapper - AWS doesn't want this!

---

## ✅ CORRECT Format

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

**Key**: Just the array `[...]` - no wrapper object!

---

## 🔧 How to Fix

### Step 1: Go to AWS S3 Console
https://s3.console.aws.amazon.com/s3/buckets

### Step 2: Select Your Bucket
Click on: `pasaal-marketplace-storage`

### Step 3: Go to Permissions Tab
Click the "Permissions" tab

### Step 4: Find CORS Section
Scroll down to "Cross-origin resource sharing (CORS)"

### Step 5: Click Edit
Click the "Edit" button

### Step 6: Clear Everything
Delete all existing content

### Step 7: Paste This (Copy Exactly)

**For Development (Recommended):**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

**For Production (Specific Origins):**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://nextjs-dashboard-six-beta-71.vercel.app",
      "http://192.168.1.67:3000"
    ],
    "ExposeHeaders": ["ETag"]
  }
]
```

### Step 8: Save Changes
Click "Save changes" button

### Step 9: Verify
You should see a success message: "Successfully edited CORS configuration"

---

## 🧪 Test CORS

After saving, test the upload:

1. Go to: http://localhost:3000/dashboard/products/create
2. Try uploading a file
3. Should work without CORS errors!

---

## 🐛 Still Having Issues?

### Check Browser Console
Open DevTools (F12) → Console tab
Look for CORS errors like:
- "Access-Control-Allow-Origin"
- "CORS policy"

### Verify CORS is Saved
1. Go back to S3 → Permissions → CORS
2. Should see your configuration
3. Should be just an array `[...]`

### Check Bucket Name
In `.env.local`:
```bash
AWS_S3_BUCKET=pasaal-marketplace-storage
```

Should match your actual bucket name!

### Check Region
In `.env.local`:
```bash
AWS_REGION=us-west-2
```

Should match your bucket's region!

---

## 📝 Why This Format?

AWS S3 CORS configuration expects:
- **Input**: JSON array of CORS rules
- **NOT**: JSON object with CORSRules property

The AWS Console automatically wraps your array in the proper structure internally.

---

## ✅ Success Checklist

- [ ] Deleted old CORS configuration
- [ ] Pasted new configuration (array format)
- [ ] Clicked "Save changes"
- [ ] Saw success message
- [ ] Tested file upload
- [ ] No CORS errors in console

---

**Last Updated**: December 6, 2025  
**Status**: Ready to test after applying fix
