const hostname = window.location.hostname;
if (!hostname) {
  console.warn('Last Visit Tracker: No hostname found, exiting.');
} else {

  const now = Date.now();

  chrome.storage.local.get(['siteVisits', 'config_durationMs', 'config_trackingMethod'], (result) => {
    let visits = result.siteVisits || {};
    
    const trackingMethod = result.config_trackingMethod || 'both';
    const currentUrl = window.location.href.split('#')[0];
    const thresholdMs = result.config_durationMs || (24 * 60 * 60 * 1000);
    
    let shouldShowBanner = false;
    let bannerTimeToShow = null;

    if (trackingMethod === 'both' || trackingMethod === 'domain') {
        const lastDomainVisit = visits[hostname];
        if (lastDomainVisit && (now - lastDomainVisit) > thresholdMs) {
            shouldShowBanner = true;
            bannerTimeToShow = lastDomainVisit;
        }
        visits[hostname] = now;
    }

    if (trackingMethod === 'both' || trackingMethod === 'url') {
        const lastUrlVisit = visits[currentUrl];
        if (lastUrlVisit && (now - lastUrlVisit) > thresholdMs) {
            shouldShowBanner = true;
            // Prefer showing the more specific URL visit time if both triggered
            bannerTimeToShow = lastUrlVisit; 
        }
        visits[currentUrl] = now;
    }

    if (shouldShowBanner && bannerTimeToShow) {
        showBanner(bannerTimeToShow);
    }

    chrome.storage.local.set({ siteVisits: visits });
  });

  function showBanner(lastVisitTime) {
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '20px';
    banner.style.right = '20px';
    banner.style.backgroundColor = '#1e293b';
    banner.style.color = '#f8fafc';
    banner.style.padding = '12px 20px';
    banner.style.borderRadius = '8px';
    banner.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)';
    banner.style.zIndex = '2147483647'; // Maximum possible z-index
    banner.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    banner.style.fontSize = '14px';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'space-between';
    banner.style.alignItems = 'center';
    banner.style.transition = 'opacity 0.4s ease-in-out';
    banner.style.cursor = 'default';
    banner.style.borderLeft = '4px solid #3b82f6';

    // Calculate days/hours ago
    const timeDiff = Date.now() - lastVisitTime;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const date = new Date(lastVisitTime);
    const dateString = date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const timeString = date.toLocaleTimeString(undefined, {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    banner.innerHTML = `
        <div style="margin-right: 25px;">
            <strong style="display:block; margin-bottom: 2px;">Welcome back!</strong>
            <span style="opacity: 0.9;">Last visit: ${dateString} at ${timeString}</span>
        </div>
        <button style="background:none; border:none;  cursor:pointer; font-size:18px; padding:0; margin:0; line-height:1;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    document.body.appendChild(banner);

    // Close button logic
    const closeBtn = banner.querySelector('button');
    closeBtn.addEventListener('click', () => {
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 400);
    });

    // Add hover effect on close button
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.querySelector('svg').style.stroke = '#fff';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.querySelector('svg').style.stroke = '#94a3b8';
    });

    // Auto-hide after 15 seconds
    setTimeout(() => {
      if (document.body.contains(banner)) {
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 400);
      }
    }, 15000);
  }
}
