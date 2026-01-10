# Angela Steffan - Therapy & Wellness Website

A professional, multilingual website for a holistic therapy practice. Built with pure HTML, CSS, and JavaScript - no build tools or dependencies required.

## Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local development server (optional but recommended)

### Running Locally

#### Option 1: Direct File Opening (Simplest)
1. Navigate to the project directory
2. Double-click `index.html` to open in your default browser
3. Or right-click `index.html` → Open With → Choose your browser

**Note**: Some features like CORS and module loading work better with a local server.

#### Option 2: Python HTTP Server (Recommended)
```bash
# Navigate to project directory
cd c:\Users\castel\repos\angela-steffan

# Python 3.x (comes with Windows)
python -m http.server 8000

# Or specify Python 3 explicitly if you have multiple versions
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 3: Node.js HTTP Server
```bash
# If you have Node.js installed
npx http-server -p 8000

# Or install globally and use
npm install -g http-server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 4: VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically with live reload enabled

#### Option 5: PHP Built-in Server
```bash
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

### Testing the Site

Once running, you can:
- Navigate between pages using the menu (Home, About Me, Contact)
- Switch languages using the DE/NL buttons in the top-right
- Test responsive design by resizing your browser window
- Try the hamburger menu on mobile viewport sizes (< 768px)
- Fill out the contact form (demo only - doesn't send emails)

### Browser Developer Tools

Press `F12` to open DevTools:
- **Console**: View JavaScript logs and errors
- **Network**: Check file loading and performance
- **Elements**: Inspect HTML/CSS in real-time
- **Responsive Mode**: Test different device sizes (Ctrl+Shift+M / Cmd+Shift+M)

## Deployment

This static site can be deployed to any static hosting service:

### GitHub Pages
```bash
# Push to GitHub, then in repository settings:
Settings → Pages → Source: main branch → Save
```
Your site will be available at `https://snps-castel.github.io/angela-steffan/`

### Netlify
1. Drag and drop the project folder to [app.netlify.com](https://app.netlify.com)
2. Or connect your GitHub repository for automatic deployments

### Vercel
```bash
npx vercel
```

### Other Options
- **Cloudflare Pages**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**
- **Any FTP/SFTP hosting**

## Troubleshooting

**Language switching not working?**
- Check browser console for errors (F12)
- Ensure JSON files are valid (use a JSON validator)
- Check that `data-i18n` attributes match JSON keys

**Images not loading?**
- Verify file paths are correct (case-sensitive on some servers)
- Check browser support for AVIF format
- Open DevTools → Network tab to see 404 errors

**Styles look broken?**
- Hard refresh to clear cache (Ctrl+F5)
- Check that `css/style.css` loaded successfully
- Verify no CSS syntax errors in DevTools Console

**Port already in use?**
```bash
# Use a different port
python -m http.server 3000
# or
npx http-server -p 3000
```

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** - No frameworks or libraries
- **JSON** - Internationalization data
- **AVIF** - Image format for performance
1. **Clone the repository**
   ```bash
   git clone https://github.com/snps-castel/angela-steffan.git
   cd angela-steffan
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required
   - For best results, use a local development server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Or using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **View the site**
   - Navigate to `http://localhost:8000` (or open `index.html` directly)
   - Test language switching between DE and NL
   - Verify responsive design by resizing browser window

### Customization

- **Content**: Edit translation files in `lang/` directory
- **Styling**: Modify CSS variables in `css/style.css` for color scheme changes
- **Images**: Replace images in `images/` directory (maintain AVIF format for performance)
- **Layout**: Update HTML structure in respective `.html` files

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design supports mobile, tablet, and desktop viewports
- AVIF image fallbacks may be needed for older browsers

## Purpose

This website serves as a professional online presence for a therapy practice, providing:
- Information about therapeutic services and approach
- Therapist background and credentials
- Easy contact method for potential clients
- A calming, trustworthy first impression
- Multilingual accessibility for German and Dutch-speaking clients