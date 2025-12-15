// Utility functions
const Utils = (() => {
    /**
     * Debounce function untuk menunda eksekusi
     * @param {Function} func - Fungsi yang akan di-debounce
     * @param {number} wait - Waktu tunggu dalam milidetik
     * @returns {Function} Fungsi yang sudah di-debounce
     */
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    /**
     * Highlight text dengan wrap span
     * @param {string} text - Teks asli
     * @param {string} query - Query pencarian
     * @returns {string} Teks dengan highlight
     */
    const highlightText = (text, query) => {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    /**
     * Escape HTML untuk mencegah XSS
     * @param {string} text - Teks yang akan di-escape
     * @returns {string} Teks yang sudah di-escape
     */
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    return {
        debounce,
        highlightText,
        escapeHtml
    };
})();