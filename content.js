function preloadFont() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.gstatic.com/s/materialsymbolsoutlined/v86/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsLjBuVY.woff2';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
}

function replaceIcon(config) {
    document.fonts.ready.then(() => {
        const elements = document.querySelectorAll(config.selector + ':not([data-icon-replaced])');
      
        elements.forEach(element => {
            const svg = element.querySelector('svg');
            if (svg) {
                const materialIcon = document.createElement('span');
                materialIcon.className = 'material-symbols-outlined';
                materialIcon.textContent = config.materialIconName;
                
                svg.parentElement.replaceChild(materialIcon, svg);
                
                element.setAttribute('data-icon-replaced', 'true');
            }
        });
    });
}

let debounceTimer;
function debouncedReplaceAllIcons() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        Object.values(ICON_CONFIG).forEach(config => {
            replaceIcon(config);
        });
    }, 100);
}

function replaceAllIcons() {
    Object.values(ICON_CONFIG).forEach(config => {
        replaceIcon(config);
    });
}

function replaceSearchIcon() {
    replaceIcon(ICON_CONFIG.search);
}

function waitForYouTubeAndReplace() {
    // Initial replacement after page load
    setTimeout(() => {
        debouncedReplaceAllIcons();
    }, 1000);
    
    // Less frequent interval
    const intervalId = setInterval(() => {
        debouncedReplaceAllIcons();
        
        // Stop the interval after 20 seconds, most elements should be loaded by then
        if (document.querySelector('[data-icon-replaced]')) {
            setTimeout(() => clearInterval(intervalId), 20000);
        }
    }, 5000);
    
    // More targeted mutation observer
    const observer = new MutationObserver((mutations) => {
        let shouldReplace = false;
        
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                // Check if any added nodes contain elements we care about
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        for (const config of Object.values(ICON_CONFIG)) {
                            if (node.matches(config.selector) || node.querySelector(config.selector)) {
                                shouldReplace = true;
                                break;
                            }
                        }
                        if (shouldReplace) break;
                    }
                }
            }
        }
        
        if (shouldReplace) {
            debouncedReplaceAllIcons();
        }
    });
    
    // Observe specific elements instead of the entire body when possible
    const observeTarget = document.querySelector('ytd-app') || document.body;
    if (observeTarget) {
        observer.observe(observeTarget, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            const target = document.querySelector('ytd-app') || document.body;
            observer.observe(target, { childList: true, subtree: true });
        });
    }
}

preloadFont();
waitForYouTubeAndReplace();