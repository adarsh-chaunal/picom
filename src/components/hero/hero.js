class HeroComponent extends BaseComponent {
    constructor(config = {}) {
        super('hero', config);
    }

    render() {
        const hero = document.createElement('section');
        hero.className = 'picom-hero';
        
        // Background image
        if (this.config.background) {
            hero.style.backgroundImage = `url(${this.config.background})`;
        }
        
        // Content container
        const container = document.createElement('div');
        container.className = 'picom-hero-container';
        
        // Title
        if (this.config.title) {
            const title = document.createElement('h1');
            title.className = 'picom-hero-title';
            title.textContent = this.config.title;
            container.appendChild(title);
        }
        
        // Subtitle
        if (this.config.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.className = 'picom-hero-subtitle';
            subtitle.textContent = this.config.subtitle;
            container.appendChild(subtitle);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'picom-hero-buttons';
            
            this.config.buttons.forEach(btn => {
                const button = document.createElement('a');
                button.className = `picom-hero-btn ${btn.variant || 'primary'}`;
                button.href = btn.href || '#';
                button.textContent = btn.text || 'Button';
                
                if (btn.onClick) {
                    this.addEventHandler(button, 'click', (e) => {
                        e.preventDefault();
                        btn.onClick();
                    });
                }
                
                buttonGroup.appendChild(button);
            });
            
            container.appendChild(buttonGroup);
        }
        
        hero.appendChild(container);
        
        // Store element reference
        this.element = hero;
        
        return hero;
    }
}
