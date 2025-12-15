// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
    console.log('Modern Website Template initialized');
    
    // Initialize theme manager
    ThemeManager.init();
    
    // Initialize search with sample data
    SearchManager.init(sampleData);
    
    // Add loading state (optional)
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Set initial opacity untuk transition
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
    console.log('Modern Website Template initialized');
    
    // Set initial opacity untuk transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Initialize loading screen selama 3 detik
    LoadingManager.init(3000);
    
    // Setelah loading selesai, initialize komponen lainnya
    setTimeout(() => {
        // Initialize theme manager
        ThemeManager.init();
        
        // Initialize search with sample data
        SearchManager.init(sampleData);
        
        // Fade in main content
        document.body.style.opacity = '1';
    }, 3000);
});