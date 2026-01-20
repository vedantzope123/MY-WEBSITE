# 🔧 MongoDB Setup Guide

## Current Issue
Your MongoDB Atlas connection is blocked because your IP address is not whitelisted.

## Option 1: Fix MongoDB Atlas (Recommended for Production)

### Step-by-Step:

1. **Go to MongoDB Atlas**
   - Visit: https://cloud.mongodb.com
   - Sign in to your account

2. **Select Your Project**
   - Click on your project that contains the database

3. **Navigate to Network Access**
   - Click "Network Access" in the left sidebar (under "Security")

4. **Add Your IP Address**
   - Click "Add IP Address" button
   - Either:
     - Click "Add Current IP Address" (recommended)
     - OR enter `0.0.0.0/0` to allow all IPs (development only!)
   - Click "Confirm"

5. **Wait for Changes**
   - Wait 1-2 minutes for changes to take effect

6. **Restart Backend Server**
   - Stop the backend server (Ctrl+C)
   - Run: `npm run dev:server`
   - Look for: ✅ MongoDB connected successfully

## Option 2: Use Local MongoDB (Easier for Development)

### Step-by-Step:

1. **Install MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Install with default settings
   - Make sure "Install MongoDB as a Service" is checked

2. **Verify MongoDB is Running**
   ```powershell
   Get-Service MongoDB
   ```
   Should show "Running"

3. **Update Environment Variables**
   - Open the `.env` file
   - Change this line:
     ```
     MONGODB_URI=mongodb+srv://vedantzope123:Sunidhi<3@cluster0.pjuvsdk.mongodb.net/
     ```
   - Save the file

4. **Restart Backend Server**
   - Stop the backend (Ctrl+C)
   - Run: `npm run dev:server`
   - You should see: ✅ MongoDB connected successfully

5. **Seed the Database** (Optional)
   ```bash
   npm run seed
   ```
   This will populate the database with sample products.

## Check Connection Status

After fixing MongoDB, restart the backend and look for this message:
```
✅ MongoDB connected successfully
```

If you still see errors, check:
- Is MongoDB service running? (Option 2)
- Is your IP whitelisted? (Option 1)
- Is the connection string correct in `.env`?

## Test the Connection

1. Open http://localhost:5000/api/health
2. Should show: `{"message":"Server is running"}`

3. Open http://localhost:5000/api/products
4. Should show an array of products (or empty array)

---

**Once MongoDB is connected, all features will work perfectly!** 🎉
