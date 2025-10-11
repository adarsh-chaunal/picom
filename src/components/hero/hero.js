class HeroComponent extends BaseComponent {
    constructor(config = {}) {
        super('hero', config);
    }

    render() {
        const $hero = createElement('section', 'ui-hero');
        
        // Background image
        if (this.config.background) {
            $hero.css('background-image', `url(${this.config.background})`);
        }
        
        // Content container
        const $container = createElement('div', 'hero-container');
        
        // Title
        if (this.config.title) {
            const $title = createElement('h1', 'hero-title', this.config.title);
            $container.append($title);
        }
        
        // Subtitle
        if (this.config.subtitle) {
            const $subtitle = createElement('p', 'hero-subtitle', this.config.subtitle);
            $container.append($subtitle);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const $buttonGroup = createElement('div', 'hero-buttons');
            
            this.config.buttons.forEach(btn => {
                const $button = createElement('a', `hero-btn ${btn.variant || 'primary'}`);
                $button.attr('href', btn.href || '#');
                $button.text(btn.text || 'Button');
                
                if (btn.onClick) {
                    $button.on('click', (e) => {
                        e.preventDefault();
                        btn.onClick();
                    });
                }
                
                $buttonGroup.append($button);
            });
            
            $container.append($buttonGroup);
        }
        
        $hero.append($container);
        return $hero;
    }
}
