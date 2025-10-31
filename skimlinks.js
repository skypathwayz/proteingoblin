/**
 * Skimlinks Integration for Protein Goblin
 * 
 * This file handles the integration of Skimlinks affiliate marketing
 * to automatically convert regular links to affiliate links.
 * 
 * Instructions:
 * 1. Sign up for Skimlinks at https://skimlinks.com/
 * 2. Get your website ID from the Skimlinks dashboard
 * 3. Replace 'YOUR_WEBSITE_ID' below with your actual website ID
 * 4. Add this script to your HTML pages
 */

(function() {
    'use strict';
    
    // Configuration
    const SKIMLINKS_CONFIG = {
        websiteId: 'YOUR_WEBSITE_ID', // Replace with your actual website ID
        domain: 'proteinshack.com',
        autoLink: true,
        excludeSelectors: [
            '.no-affiliate', // Links with this class won't be converted
            '[data-no-affiliate]' // Links with this attribute won't be converted
        ],
        customAffiliateLinks: {
            // Custom affiliate links for specific products
            'optimum-nutrition': 'https://amzn.to/3xyz123',
            'myprotein': 'https://tidd.ly/abc456',
            'dymatize': 'https://amzn.to/3def789',
            'quest-bar': 'https://amzn.to/3ghi012',
            'protein-shaker': 'https://amzn.to/3jkl345'
        }
    };

    // Skimlinks API endpoints
    const SKIMLINKS_API = {
        base: 'https://go.skimresources.com',
        script: 'https://s.skimresources.com/js/skimlinks.js',
        converter: 'https://go.skimresources.com/api/v1/links'
    };

    /**
     * Initialize Skimlinks
     */
    function initSkimlinks() {
        if (typeof window.skimlinks === 'undefined') {
            loadSkimlinksScript();
        } else {
            configureSkimlinks();
        }
    }

    /**
     * Load Skimlinks script
     */
    function loadSkimlinksScript() {
        const script = document.createElement('script');
        script.src = SKIMLINKS_API.script;
        script.async = true;
        script.onload = configureSkimlinks;
        script.onerror = function() {
            console.warn('Failed to load Skimlinks script. Using fallback method.');
            initFallbackAffiliateLinks();
        };
        document.head.appendChild(script);
    }

    /**
     * Configure Skimlinks
     */
    function configureSkimlinks() {
        if (window.skimlinks && window.skimlinks.init) {
            window.skimlinks.init({
                websiteId: SKIMLINKS_CONFIG.websiteId,
                domain: SKIMLINKS_CONFIG.domain,
                autoLink: SKIMLINKS_CONFIG.autoLink,
                excludeSelectors: SKIMLINKS_CONFIG.excludeSelectors
            });
        }
    }

    /**
     * Fallback method for affiliate links when Skimlinks fails
     */
    function initFallbackAffiliateLinks() {
        console.log('Initializing fallback affiliate links...');
        
        // Convert regular Amazon links to affiliate links
        convertAmazonLinks();
        
        // Convert other retailer links
        convertRetailerLinks();
        
        // Apply custom affiliate links
        applyCustomAffiliateLinks();
    }

    /**
     * Convert Amazon links to affiliate links
     */
    function convertAmazonLinks() {
        const amazonLinks = document.querySelectorAll('a[href*="amazon.com"], a[href*="amazon.co.uk"], a[href*="amazon.ca"]');
        
        amazonLinks.forEach(link => {
            if (shouldConvertLink(link)) {
                const originalUrl = link.href;
                const affiliateUrl = convertToAffiliateUrl(originalUrl, 'amazon');
                if (affiliateUrl !== originalUrl) {
                    link.href = affiliateUrl;
                    link.setAttribute('data-affiliate', 'true');
                    link.setAttribute('rel', 'nofollow sponsored');
                }
            }
        });
    }

    /**
     * Convert other retailer links
     */
    function convertRetailerLinks() {
        const retailers = [
            { domain: 'myprotein.com', affiliateId: 'abc456' },
            { domain: 'bodybuilding.com', affiliateId: 'def789' },
            { domain: 'vitacost.com', affiliateId: 'ghi012' }
        ];

        retailers.forEach(retailer => {
            const links = document.querySelectorAll(`a[href*="${retailer.domain}"]`);
            links.forEach(link => {
                if (shouldConvertLink(link)) {
                    const originalUrl = link.href;
                    const affiliateUrl = convertToAffiliateUrl(originalUrl, retailer.affiliateId);
                    if (affiliateUrl !== originalUrl) {
                        link.href = affiliateUrl;
                        link.setAttribute('data-affiliate', 'true');
                        link.setAttribute('rel', 'nofollow sponsored');
                    }
                }
            });
        });
    }

    /**
     * Apply custom affiliate links
     */
    function applyCustomAffiliateLinks() {
        Object.keys(SKIMLINKS_CONFIG.customAffiliateLinks).forEach(key => {
            const links = document.querySelectorAll(`[data-product="${key}"]`);
            links.forEach(link => {
                if (shouldConvertLink(link)) {
                    link.href = SKIMLINKS_CONFIG.customAffiliateLinks[key];
                    link.setAttribute('data-affiliate', 'true');
                    link.setAttribute('rel', 'nofollow sponsored');
                }
            });
        });
    }

    /**
     * Check if a link should be converted to affiliate link
     */
    function shouldConvertLink(link) {
        // Don't convert if already an affiliate link
        if (link.getAttribute('data-affiliate') === 'true') {
            return false;
        }

        // Don't convert if excluded
        for (const selector of SKIMLINKS_CONFIG.excludeSelectors) {
            if (link.matches(selector)) {
                return false;
            }
        }

        // Don't convert internal links
        if (link.hostname === window.location.hostname) {
            return false;
        }

        return true;
    }

    /**
     * Convert URL to affiliate URL
     */
    function convertToAffiliateUrl(originalUrl, affiliateId) {
        try {
            const url = new URL(originalUrl);
            
            // Add affiliate parameters
            if (url.hostname.includes('amazon')) {
                url.searchParams.set('tag', affiliateId);
            } else if (url.hostname.includes('myprotein')) {
                url.searchParams.set('affiliate', affiliateId);
            } else {
                // Generic affiliate parameter
                url.searchParams.set('aff', affiliateId);
            }

            return url.toString();
        } catch (error) {
            console.warn('Failed to convert URL to affiliate URL:', error);
            return originalUrl;
        }
    }

    /**
     * Track affiliate link clicks
     */
    function trackAffiliateClick(link) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_click', {
                'event_category': 'affiliate',
                'event_label': link.hostname,
                'value': 1
            });
        }

        // Custom tracking
        if (typeof window.trackEvent === 'function') {
            window.trackEvent('affiliate_click', {
                url: link.href,
                hostname: link.hostname,
                product: link.getAttribute('data-product') || 'unknown'
            });
        }
    }

    /**
     * Add click tracking to affiliate links
     */
    function addClickTracking() {
        const affiliateLinks = document.querySelectorAll('a[data-affiliate="true"]');
        
        affiliateLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                trackAffiliateClick(this);
            });
        });
    }

    /**
     * Initialize when DOM is ready
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize Skimlinks
        initSkimlinks();

        // Add click tracking
        addClickTracking();

        // Re-scan for new links (for dynamic content)
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    // Re-convert new links
                    if (typeof window.skimlinks === 'undefined') {
                        initFallbackAffiliateLinks();
                    }
                    addClickTracking();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Start initialization
    init();

    // Export for manual use
    window.Protein GoblinAffiliates = {
        init: init,
        convertLinks: initFallbackAffiliateLinks,
        trackClick: trackAffiliateClick,
        config: SKIMLINKS_CONFIG
    };

})();

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. Replace 'YOUR_WEBSITE_ID' with your actual Skimlinks website ID
 * 2. Add this script to your HTML pages before the closing </body> tag
 * 3. For custom affiliate links, add data-product attributes to your links:
 *    <a href="https://amazon.com/product" data-product="optimum-nutrition">Buy Now</a>
 * 
 * 4. To exclude links from conversion, add the no-affiliate class:
 *    <a href="https://example.com" class="no-affiliate">Regular Link</a>
 * 
 * 5. The script will automatically:
 *    - Convert Amazon and other retailer links to affiliate links
 *    - Add rel="nofollow sponsored" attributes
 *    - Track clicks for analytics
 *    - Handle dynamic content updates
 */
