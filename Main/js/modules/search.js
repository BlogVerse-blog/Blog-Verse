// Search functionality module
const SearchManager = (() => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const cardsContainer = document.getElementById('cardsContainer');

    let allData = [];

    /**
     * Filter data berdasarkan query pencarian
     * @param {string} query - Query pencarian
     * @returns {Array} Data yang difilter
     */
    const filterData = (query) => {
        if (!query.trim()) return allData;

        const lowerQuery = query.toLowerCase();
        return allData.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    };

    /**
     * Render hasil pencarian
     * @param {Array} results - Hasil pencarian
     * @param {string} query - Query pencarian
     */
    const renderSearchResults = (results, query) => {
        if (!query.trim()) {
            searchResults.classList.remove('active');
            return;
        }

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">Tidak ada hasil</div>';
            searchResults.classList.add('active');
            return;
        }

        const resultsHTML = results.map(item => `
            <div class="search-result-item" role="listitem">
                <div class="search-result-title">
                    ${Utils.highlightText(Utils.escapeHtml(item.title), query)}
                </div>
                <div class="search-result-description">
                    ${Utils.highlightText(Utils.escapeHtml(item.description), query)}
                </div>
                <div class="search-result-tags">
                    ${item.tags.map(tag => 
                        `<span class="search-tag">${Utils.escapeHtml(tag)}</span>`
                    ).join('')}
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
        searchResults.classList.add('active');
    };

    /**
     * Render cards di main content
     * @param {Array} data - Data untuk di-render
     */
    const renderCards = (data) => {
        const cardsHTML = data.map(item => `
            <div class="card" role="listitem">
                <a href="${item.href}" style="text-decoration : none ;">
                    <img src="${Utils.escapeHtml(item.image)}" alt="image" class="card-image">
                    <h3 class="card-title">${Utils.escapeHtml(item.title)}</h3>
                    <p class="card-description">${Utils.escapeHtml(item.description)}</p>
                    <div class="card-tags">
                        ${item.tags.map(tag => 
                            `<span class="card-tag">${Utils.escapeHtml(tag)}</span>`
                        ).join('')}
                    </div>
                </a>
            </div>
        `).join('');

        cardsContainer.innerHTML = cardsHTML;
    };

    /**
     * Handle pencarian
     * @param {Event} event - Event object
     */
    const handleSearch = (event) => {
        const query = event.target.value;
        const results = filterData(query);
        
        renderSearchResults(results, query);
        renderCards(results);
    };

    // Debounced search handler
    const debouncedSearch = Utils.debounce(handleSearch, 200);

    /**
     * Initialize search functionality
     * @param {Array} data - Data untuk pencarian
     */
    const init = (data) => {
        allData = data;
        
        // Render semua data awal
        renderCards(allData);
        
        // Event listeners
        searchInput.addEventListener('input', debouncedSearch);
        
        // Close search results ketika klik di luar
        document.addEventListener('click', (event) => {
            if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
                searchResults.classList.remove('active');
            }
        });

        // Keyboard navigation untuk search results
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                searchResults.classList.remove('active');
                searchInput.blur();
            }
        });
    };

    return {
        init
    };
})();