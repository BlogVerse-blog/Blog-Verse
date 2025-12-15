// Theme management module
const ThemeManager = (() => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Default theme berdasarkan preferensi sistem
    const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Load theme dari localStorage atau gunakan sistem default
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = getSystemTheme();
        const theme = savedTheme || systemTheme;
        
        htmlElement.setAttribute('data-theme', theme);
        return theme;
    };

    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Initialize theme
    const init = () => {
        loadTheme();
        themeToggle.addEventListener('click', toggleTheme);
        
        // Listen untuk perubahan preferensi sistem
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                htmlElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    };

    return {
        init
    };
})();