# SSL Certificate Fix Instructions

## The Problem
Your site is showing SSL certificate errors because:
1. The domain proteingoblin.com is pointing to GitHub Pages
2. GitHub Pages provides SSL certificates for *.github.io, not custom domains
3. Client-side HTTPS redirects were forcing HTTPS before a valid certificate existed

## What I Fixed (Code Side)
✅ Removed all client-side HTTPS redirects from JavaScript
✅ Removed _redirects file (Netlify-specific, not for GitHub Pages)
✅ Removed .htaccess file (Apache-specific, not for GitHub Pages)
✅ Removed CSP upgrade-insecure-requests headers

## What YOU Need to Do (Server/DNS Side)

### Option 1: Use GitHub Pages with Custom Domain (Recommended)
1. Go to your GitHub repository: https://github.com/skypathwayz/proteingoblin
2. Go to Settings → Pages
3. Under "Custom domain", enter: proteingoblin.com
4. Click "Save"
5. GitHub will automatically provision an SSL certificate (takes 5-60 minutes)
6. Update your DNS records to point to GitHub Pages:
   - Type: A records
   - Value: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - OR Type: CNAME
   - Value: skypathwayz.github.io (or your-username.github.io)

### Option 2: Use Netlify (Easier SSL)
1. Create account at netlify.com
2. Connect your GitHub repository
3. Netlify automatically provides SSL certificates for custom domains
4. Add custom domain: proteingoblin.com
5. Update DNS to point to Netlify (they'll provide the DNS records)

### Option 3: Use Cloudflare (Free SSL)
1. Create Cloudflare account
2. Add your site
3. Update nameservers in your domain registrar
4. Enable "Always Use HTTPS" in Cloudflare SSL/TLS settings
5. Cloudflare provides free SSL automatically

## Temporary Fix (Allow HTTP)
Until SSL is configured, users can access via HTTP:
- http://proteingoblin.com (will work)
- https://proteingoblin.com (will show error until SSL is fixed)

## Important
- DO NOT add HTTPS redirects back until SSL certificate is valid
- The CNAME file (proteingoblin.com) is correct for GitHub Pages
- Wait 5-60 minutes after configuring DNS for SSL to activate
