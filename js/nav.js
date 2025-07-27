document.addEventListener('DOMContentLoaded', function() {
    // Cargar el navbar
    fetch('./components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            initializeNavbar();
            initializeMobileMenu();
            initializeSearchModal();
            initializeContactCopy();
            initializeSlidingBackground();
            addDynamicStyles();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

function initializeNavbar() {
    // Menú hamburguesa (versión simplificada que será reemplazada por initializeMobileMenu)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        const icon = mobileMenuButton.querySelector('i');
        mobileMenuButton.addEventListener('click', function() {
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.remove('hidden');
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Cambiar ícono
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Cambiar ícono
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

function initializeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('search-button');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const closeSearch = document.getElementById('close-search');

    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('none');
            searchModal.classList.add('anim');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.add('none');
            document.body.style.overflow = '';
        }
    }

    if (searchButton) searchButton.addEventListener('click', openSearchModal);
    if (mobileSearchButton) mobileSearchButton.addEventListener('click', openSearchModal);
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);

    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('none')) {
            closeSearchModal();
        }
    });
}

function initializeContactCopy() {
    const contactElements = document.querySelectorAll('.contact-info');
    
    contactElements.forEach(element => {
        element.addEventListener('click', function() {
            const info = this.getAttribute('data-info');
            copyToClipboard(info);
            showToast('Información copiada correctamente');
        });
    });
}

function initializeSlidingBackground() {
    const slidingBg = document.getElementById('sliding-background');
    const navbarItems = document.querySelectorAll('.navbar-item');
    
    if (!slidingBg || navbarItems.length === 0) {
        console.log('Sliding background elements not found');
        return;
    }
    
    // Detectar si es dispositivo móvil
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    
    if (isMobile) {
        console.log('Mobile device detected, disabling hover effects');
        // Ocultar el elemento deslizante en móvil
        slidingBg.style.display = 'none';
        return;
    }
    
    console.log('Initializing sliding background with', navbarItems.length, 'items');
    
    navbarItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            console.log('Mouse enter on item', index);
            const rect = this.getBoundingClientRect();
            const navbarContainer = this.closest('.nav-container');
            const navbarRect = navbarContainer.getBoundingClientRect();
            
            // Calcular posición relativa al navbar
            const left = rect.left - navbarRect.left;
            const width = rect.width;
            const height = rect.height;
            
            console.log('Position:', { left, width, height });
            
            // Aplicar estilos al elemento deslizante
            slidingBg.style.left = `${left}px`;
            slidingBg.style.width = `${width}px`;
            slidingBg.style.height = `${height}px`;
            slidingBg.style.opacity = '1';
            slidingBg.style.pointerEvents = 'none';
        });
        
        item.addEventListener('mouseleave', function() {
            console.log('Mouse leave on item', index);
            // Ocultar el elemento deslizante
            slidingBg.style.opacity = '0';
        });
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // Para contextos seguros (HTTPS)
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        // Fallback para contextos no seguros
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        console.log('Texto copiado al portapapeles (fallback)');
    } catch (err) {
        console.error('Error al copiar (fallback):', err);
    }
    
    document.body.removeChild(textArea);
}

function showToast(message) {
    const toast = document.getElementById('copy-toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Mostrar el toast
        toast.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
        
        // Ocultar el toast después de 3 segundos
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
        }, 3000);
    }
}

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        
        .anim {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .none {
            display: none;
        }
        
        /* Estilos para el menú móvil */
        .-translate-x-full {
            transform: translateX(-100%);
        }
        
        #mobile-menu {
            transition: transform 0.3s ease-in-out;
        }
        
        #menu-overlay {
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        /* Estilos para el toast */
        #copy-toast {
            transition: transform 0.3s ease-in-out;
        }
        
        .contact-info {
            transition: all 0.3s ease-in-out;
            border: none;
            outline: none;
        }
        
        .contact-info:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .contact-info:active {
            transform: scale(0.95);
        }
        
        .contact-info:focus {
            outline: 2px solid rgba(59, 130, 246, 0.5);
            outline-offset: 2px;
        }
        
        /* Estilos para el navbar deslizante */
        .navbar-item {
            position: relative;
            z-index: 10;
            transition: all 0.3s ease;
        }
        
        /* Hover effects solo en desktop */
        @media (min-width: 769px) {
            .navbar-item:hover {
                transform: translateY(-1px);
            }
        }
        
        /* Deshabilitar hover en móvil */
        @media (max-width: 768px) {
            .navbar-item:hover {
                transform: none;
            }
            
            #sliding-background {
                display: none !important;
            }
        }
        
        #sliding-background {
            z-index: 5;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            min-width: 20px;
            min-height: 20px;
        }
        

    `;
    document.head.appendChild(style);
    
    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);
}

// Función para manejar cambios de tamaño de ventana
function handleResize() {
    const slidingBg = document.getElementById('sliding-background');
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window);
    
    if (slidingBg) {
        if (isMobile) {
            slidingBg.style.display = 'none';
        } else {
            slidingBg.style.display = 'block';
        }
    }
}
