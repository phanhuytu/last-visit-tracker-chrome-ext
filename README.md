# Last Visit Tracker

A lightweight, customizable Google Chrome extension that helps you remember the last time you visited a website. If you return to a website after your configured duration (e.g., more than a day), the extension displays a non-intrusive banner welcoming you back with the exact date and time of your previous visit.

## Important Notes: How it Works

*   **Local Tracking Only:** To ensure your privacy, this extension records visits *locally* on your current device using `chrome.storage.local`. This means your visit history does NOT sync between different computers or browsers.
*   **First Visit Behavior:** When you visit a website for the very first time after installing this extension, nothing will happen. The banner will only trigger on your *subsequent* visits after the configured amount of time has passed.

## Features

- **Customizable Duration:** Easily configure how much time must pass before the banner appears (choose between seconds, hours, days, weeks, months, or years).
- **Helpful Reminder Banner:** Displays a sleek, dark-themed banner summarizing your previous visit.
- **Auto-hiding:** The banner automatically disappears after 15 seconds to stay out of your way.
- **Manual Dismissal:** Includes a convenient close button to dismiss the banner immediately.
- **Privacy Focused:** All data stays on your device. No information is ever sent to external servers.

## Installation

Since this extension is not published on the Chrome Web Store, you can install it manually using Chrome's Developer Mode.

### Steps to Install in Chrome

1. **Open the Extensions Page:**
   - Open Google Chrome.
   - Type `chrome://extensions/` in the address bar and press Enter.
   - Alternatively, click the puzzle piece icon (Extensions) in the top right corner and select "Manage Extensions".

2. **Enable Developer Mode:**
   - In the top right corner of the Extensions page, toggle the switch for **Developer mode** to the **ON** position.

3. **Load the Extension:**
   - Click the **Load unpacked** button that appears in the top left corner.
   - A file dialog will open. Navigate to the folder containing this extension's files (the folder containing `manifest.json` and `content.js`).
   - Select the folder and click **Select Folder**.

4. **Configure Your Settings:**
   - Find "Last Visit Tracker" in your extensions list.
   - Click the **Details** button, then select **Extension options**. (Or right-click the extension icon in your toolbar and select **Options**).
   - Set your preferred duration and click **Save Settings**.
