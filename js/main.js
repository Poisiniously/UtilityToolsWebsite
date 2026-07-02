document.addEventListener('DOMContentLoaded', () => {
    // DOM Element Declarations
    const searchBar = document.getElementById('search-bar');
    const toolsGrid = document.getElementById('tools-grid');
    const toolCards = document.querySelectorAll('.tool-card');
    const emptyState = document.getElementById('empty-state');
    const sidebarItems = document.querySelectorAll('.nav-item');
    
    const popupOverlay = document.getElementById('popup-overlay');
    const popupWindow = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');
    const toolIframe = document.getElementById('tool-iframe');
    const popupTitle = document.getElementById('popup-title');

    // Live Grid Search Mapping Logic
    const filterTools = () => {
        const query = searchBar.value.toLowerCase().trim();
        const activeCategory = document.querySelector('.nav-item.active').getAttribute('data-filter');
        let totalVisible = 0;

        toolCards.forEach(card => {
            const tags = card.getAttribute('data-tags').toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = tags.includes(query);
            const matchesCategory = (activeCategory === 'all' || category === activeCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                totalVisible++;
            } else {
                card.style.display = 'none';
            }
        });

        // Toggle Empty State Message
        if (totalVisible === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    };

    // Global Event Assigners
    searchBar.addEventListener('input', filterTools);

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            filterTools();
        });
    });

    // Modal Lifecycle Trigger
    const openToolWorkspace = (url, title) => {
        popupTitle.textContent = title;
        toolIframe.src = url;
        popupOverlay.classList.remove('hidden');
        setTimeout(() => popupOverlay.classList.add('active'), 10);
    };

    const closeToolWorkspace = () => {
        popupOverlay.classList.remove('active');
        popupOverlay.classList.add('hidden');
        toolIframe.src = ''; // Clear iframe memory state
    };

    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetUrl = card.getAttribute('data-url');
            const targetTitle = card.querySelector('h3').textContent;
            openToolWorkspace(targetUrl, targetTitle);
        });
    });

    popupClose.addEventListener('click', closeToolWorkspace);
    
    // Close on click outside window elements
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) closeToolWorkspace();
    });

    // Accessibility Hotkeys ('/' to focus search)
    window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchBar) {
            e.preventDefault();
            searchBar.focus();
        }
        if (e.key === 'Escape' && !popupOverlay.classList.contains('hidden')) {
            closeToolWorkspace();
        }
    });
});
const commissionOverlay = (targetUrl, toolTitle) => {
    modalToolTitle.textContent = toolTitle;
    toolFrame.src = targetUrl;
    modalOverlay.classList.add('active');
    
    // Hard-Lock für das Scrollen auf der Hauptseite aktivieren
    document.body.classList.add('modal-open');
};

const decommissionOverlay = () => {
    modalOverlay.classList.remove('active');
    toolFrame.src = '';
    
    // Scrollen auf der Hauptseite wieder freigeben
    document.body.classList.remove('modal-open');
};
