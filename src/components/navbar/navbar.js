class NavbarComponent extends BaseComponent {
    constructor(config = {}) {
        super('navbar', config);
    }

    render() {
        const $navbar = createElement('nav', 'ui-navbar');
        
        // Brand/Logo
        if (this.config.brand) {
            const $brand = createElement('div', 'navbar-brand');
            if (this.config.brand.logo) {
                const $logo = createElement('img', 'navbar-logo');
                $logo.attr('src', this.config.brand.logo);
                $logo.attr('alt', this.config.brand.text || 'Logo');
                $brand.append($logo);
            }
            if (this.config.brand.text) {
                const $brandText = createElement('span', 'navbar-brand-text', this.config.brand.text);
                $brand.append($brandText);
            }
            if (this.config.brand.href) {
                const $brandLink = createElement('a', 'navbar-brand-link');
                $brandLink.attr('href', this.config.brand.href);
                $brandLink.append($brand);
                $navbar.append($brandLink);
            } else {
                $navbar.append($brand);
            }
        }

        // Navigation Items
        if (this.config.items && Array.isArray(this.config.items)) {
            const $navItems = createElement('div', 'navbar-items');
            
            this.config.items.forEach(item => {
                const $navItem = createElement('a', 'navbar-item');
                $navItem.attr('href', item.href || '#');
                $navItem.text(item.text || 'Link');
                
                if (item.active) {
                    $navItem.addClass('active');
                }
                
                if (item.onClick) {
                    $navItem.on('click', (e) => {
                        e.preventDefault();
                        item.onClick();
                    });
                }
                
                $navItems.append($navItem);
            });
            
            $navbar.append($navItems);
        }

        // Mobile menu toggle
        if (this.config.mobile) {
            const $mobileToggle = createElement('button', 'navbar-mobile-toggle');
            $mobileToggle.html('☰');
            $mobileToggle.on('click', () => {
                $navbar.toggleClass('mobile-open');
            });
            $navbar.append($mobileToggle);
        }

        return $navbar;
    }
}
