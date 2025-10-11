class CardComponent extends BaseComponent {
    constructor(config = {}) {
        super('card', config);
    }

    render() {
        const $card = createElement('div', 'ui-card');
        
        // Card image
        if (this.config.image) {
            const $image = createElement('div', 'card-image');
            const $img = createElement('img');
            $img.attr('src', this.config.image.src || this.config.image);
            $img.attr('alt', this.config.image.alt || 'Card image');
            $image.append($img);
            $card.append($image);
        }
        
        // Card content
        const $content = createElement('div', 'card-content');
        
        // Title
        if (this.config.title) {
            const $title = createElement('h3', 'card-title', this.config.title);
            $content.append($title);
        }
        
        // Description
        if (this.config.description) {
            const $description = createElement('p', 'card-description', this.config.description);
            $content.append($description);
        }
        
        // Buttons
        if (this.config.buttons && Array.isArray(this.config.buttons)) {
            const $buttonGroup = createElement('div', 'card-buttons');
            
            this.config.buttons.forEach(btn => {
                const $button = createElement('a', `card-btn ${btn.variant || 'primary'}`);
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
            
            $content.append($buttonGroup);
        }
        
        $card.append($content);
        return $card;
    }
}
