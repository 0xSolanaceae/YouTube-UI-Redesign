function preloadFont() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = chrome.runtime.getURL('fonts/material-symbols.woff2');
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    
    link.onload = () => {
        setTimeout(replaceAllIcons, 50);
    };

    document.head.appendChild(link);
    
    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'Material Symbols Outlined';
            font-style: normal;
            font-weight: 400;
            src: url('${chrome.runtime.getURL('fonts/material-symbols.woff2')}') format('woff2');
            font-display: swap;
        }
    `;
    document.head.appendChild(style);
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

function waitForYouTubeAndReplace() {
    setTimeout(() => {
        debouncedReplaceAllIcons();
    }, 1000);
    
    const intervalId = setInterval(() => {
        debouncedReplaceAllIcons();
        
        if (document.querySelector('[data-icon-replaced]')) {
            setTimeout(() => clearInterval(intervalId), 20000);
        }
    }, 5000);
    
    const observer = new MutationObserver((mutations) => {
        let shouldReplace = false;
        
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
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