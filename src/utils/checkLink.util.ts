// containsValidLinks.ts

export function containsValidLinks(text: string, allowedDomains: string[]): boolean {
    // Regular expression to match URLs and raw domains
    const urlRegex = /https?:\/\/[^\s]+|bit\.ly\/[^\s]+|(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g;

    // Find all URLs in the text
    const urls = text.match(urlRegex);
    
    if (!urls) return true; // No URLs found, return true

    // Extract domains from the URLs and raw domains
    const domains = urls.map(url => {
        try {
            const domain = (new URL(url)).hostname;
            return domain.replace('www.', ''); // Remove 'www.' if present
        } catch (e) {
            return url; // If it's not a URL, return it as is
        }
    });

    // Check if any domain is not allowed
    for (const domain of domains) {
        // Check if the domain is NOT in the allowed list
        if (!allowedDomains.includes(domain)) {
            return false; // Found a disallowed domain
        }
    }

    return true; // All domains are allowed
}
