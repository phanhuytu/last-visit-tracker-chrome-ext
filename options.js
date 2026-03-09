// Save options to chrome.storage
const saveOptions = () => {
    const value = parseInt(document.getElementById('durationValue').value, 10);
    const unit = document.getElementById('durationUnit').value;

    let multiplier = 1;
    switch (unit) {
        case 'seconds': multiplier = 1000; break;
        case 'hours': multiplier = 60 * 60 * 1000; break;
        case 'days': multiplier = 24 * 60 * 60 * 1000; break;
        case 'weeks': multiplier = 7 * 24 * 60 * 60 * 1000; break;
        case 'months': multiplier = 30 * 24 * 60 * 60 * 1000; break; // Approx 30 days
        case 'years': multiplier = 365 * 24 * 60 * 60 * 1000; break; // Approx 365 days
    }

    const durationMs = value * multiplier;

    chrome.storage.local.set(
        { 
            config_durationValue: value,
            config_durationUnit: unit,
            config_durationMs: durationMs 
        },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('statusMessage');
            status.textContent = 'Settings saved!';
            status.style.opacity = '1';
            
            setTimeout(() => {
                status.style.opacity = '0';
                setTimeout(() => {
                    status.textContent = '';
                }, 400); // Wait for fade out
            }, 2000);
        }
    );
};

// Restores select box and text fields state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.local.get(
        // Default values
        { 
            config_durationValue: 1,
            config_durationUnit: 'days' 
        },
        (items) => {
            document.getElementById('durationValue').value = items.config_durationValue;
            document.getElementById('durationUnit').value = items.config_durationUnit;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);
