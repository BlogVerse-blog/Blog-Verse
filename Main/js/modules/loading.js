// Loading screen management module
const LoadingManager = (() => {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress-bar');
    const loadingContainer = document.querySelector('.loading-container');

    /**
     * Show loading screen
     */
    const show = () => {
        loadingScreen.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    /**
     * Hide loading screen dengan animasi smooth
     */
    const hide = () => {
        // Tambahkan class complete untuk animasi selesai
        loadingScreen.classList.add('loading-complete');
        
        // Tunggu sebentar untuk animasi complete, lalu hide
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Hapus loading screen dari DOM setelah animasi selesai
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 1000);
        }, 500);
    };

    /**
     * Simulate progress (optional - untuk efek visual tambahan)
     */
    const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            // Progress bar sudah dianimasikan di CSS, ini hanya backup
        }, 300);
    };

    /**
     * Initialize loading screen
     * @param {number} duration - Durasi loading dalam milidetik
     */
    const init = (duration = 3000) => {
        show();
        simulateProgress();
        
        // Sembunyikan loading setelah durasi tertentu
        setTimeout(() => {
            hide();
        }, duration);
    };

    return {
        init,
        show,
        hide
    };
})();