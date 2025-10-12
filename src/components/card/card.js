class CardComponent extends BaseComponent {
    constructor(config = {}) {
        super('card', config);
    }

    render() {
        const card = document.createElement('div');
        card.className = 'picom-card';
        
        // Card image
        if (this.config.image) {
            const image = document.createElement('div');
            image.className = 'picom-card-image';
            
            const img = document.createElement('img');
            img.src = this.config.image.src || this.config.image;
            img.alt = this.config.image.alt || 'Card image';
            
            image.appendChild(img);
            card.appendChild(image);
        }
        
        // Card content
        const content = document.createElement('div');
        content.className = 'picom-card-content';
        
        // Title
        if (this.config.title) {
            const title = document.createElement('h3');
            title.className = 'picom-card-title';
            title.textContent = this.config.title;
            content.appendChild(title);
        }
        
        // Description
        if (this.config.description) {
            const description = document.createElement('p');
            description.className = 'picom-card-description';
            description.textContent = this.config.description;
            content.appendChild(description);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'picom-card-buttons';
            
            this.config.buttons.forEach(btn => {
                const button = document.createElement('a');
                button.className = `picom-card-btn ${btn.variant || 'primary'}`;
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
            
            content.appendChild(buttonGroup);
        }
        
        card.appendChild(content);
        
        // Store element reference
        this.element = card;
        
        return card;
    }
}
