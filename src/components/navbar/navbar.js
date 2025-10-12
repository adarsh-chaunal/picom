class NavbarComponent extends BaseComponent {
    constructor(config = {}) {
        super('navbar', config);
    }

    render() {
        const navbar = document.createElement('nav');
        navbar.className = 'picom-navbar';
        
        // Brand/Logo
        if (this.config.brand) {
            const brand = document.createElement('div');
            brand.className = 'picom-navbar-brand';
            
            if (this.config.brand.logo) {
                const logo = document.createElement('img');
                logo.className = 'picom-navbar-logo';
                logo.src = this.config.brand.logo;
                logo.alt = this.config.brand.text || 'Logo';
                brand.appendChild(logo);
            }
            
            if (this.config.brand.text) {
                const brandText = document.createElement('span');
                brandText.className = 'picom-navbar-brand-text';
                brandText.textContent = this.config.brand.text;
                brand.appendChild(brandText);
            }
            
            if (this.config.brand.href) {
                const brandLink = document.createElement('a');
                brandLink.className = 'picom-navbar-brand-link';
                brandLink.href = this.config.brand.href;
                brandLink.appendChild(brand);
                navbar.appendChild(brandLink);
            } else {
                navbar.appendChild(brand);
            }
        }

        // Navigation Items
        if (this.config.items && Array.isArray(this.config.items)) {
            const navItems = document.createElement('div');
            navItems.className = 'picom-navbar-items';
            
            this.config.items.forEach(item => {
                const navItem = document.createElement('a');
                navItem.className = 'picom-navbar-item';
                navItem.href = item.href || '#';
                navItem.textContent = item.text || 'Link';
                
                if (item.active) {
                    navItem.classList.add('active');
                }
                
                if (item.onClick) {
                    this.addEventHandler(navItem, 'click', (e) => {
                        e.preventDefault();
                        item.onClick();
                    });
                }
                
                navItems.appendChild(navItem);
            });
            
            navbar.appendChild(navItems);
        }

        // Mobile menu toggle
        if (this.config.mobile) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'picom-navbar-mobile-toggle';
            mobileToggle.innerHTML = '☰';
            
            this.addEventHandler(mobileToggle, 'click', () => {
                navbar.classList.toggle('mobile-open');
            });
            
            navbar.appendChild(mobileToggle);
        }

        // Store element reference
        this.element = navbar;
        
        return navbar;
    }
}
