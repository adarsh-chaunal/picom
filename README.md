# Picom UI Library

A lightweight JavaScript and CSS component library with drag-and-drop form builder capabilities and JSON-driven website building.

## Features

- 🎨 **Modern UI Components**: Navbar, Hero, Section, Card, Button, Input, Checkbox, Select
- 🖱️ **Drag & Drop Form Builder**: Visual form creation interface
- 🏗️ **JSON Website Builder**: Build entire websites from JSON configurations
- 📦 **Lightweight**: Pure JavaScript and CSS, no heavy frameworks
- 🎯 **Easy Integration**: Simple API for adding components to your projects
- 📱 **Responsive**: Mobile-friendly design
- 🎭 **Multiple Themes**: Light, dark, and custom theme support

## Quick Start

### Installation

```bash
npm install picom-ui-library
```

Or include directly in your HTML:

```html
<!-- CSS -->
<link rel="stylesheet" href="dist/picom.css">

<!-- JavaScript (requires jQuery) -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
<script src="dist/picom.js"></script>
```

### Basic Usage

#### Individual Components

```javascript
// Create a button
const button = new ButtonComponent({
    text: 'Click Me',
    onClick: () => alert('Button clicked!')
}).render();

// Create an input field
const input = new InputComponent({
    label: 'Username',
    placeholder: 'Enter your username'
}).render();

// Create a checkbox
const checkbox = new CheckboxComponent({
    label: 'I agree to terms',
    checked: false,
    onChange: (checked) => console.log('Checked:', checked)
}).render();

// Create a select dropdown
const select = new SelectComponent({
    label: 'Choose option',
    options: ['Option 1', 'Option 2', 'Option 3'],
    onChange: (value) => console.log('Selected:', value)
}).render();

// Add to your page
$('#my-container').append(button).append(input).append(checkbox).append(select);
```

#### Form Builder

```javascript
// Initialize the form builder
const formBuilder = new FormBuilder('form-container');

// Get form data
const formData = formBuilder.getFormData();

// Clear the form
formBuilder.clearForm();
```

## Components

### NavbarComponent

Creates a responsive navigation bar.

**Options:**
- `brand` (object): Brand configuration with text, logo, and href
- `items` (array): Navigation items with text, href, and active state
- `mobile` (boolean): Enable mobile menu toggle

### HeroComponent

Creates a hero section with title, subtitle, and buttons.

**Options:**
- `title` (string): Hero title
- `subtitle` (string): Hero subtitle
- `background` (string): Background image URL
- `buttons` (array): Array of button configurations

### SectionComponent

Creates a content section with title, subtitle, and content.

**Options:**
- `title` (string): Section title
- `subtitle` (string): Section subtitle
- `background` (object): Background color or image
- `className` (string): Additional CSS classes
- `content` (array): Array of components or HTML string

### CardComponent

Creates a card with image, title, description, and buttons.

**Options:**
- `title` (string): Card title
- `description` (string): Card description
- `image` (string/object): Image URL or object with src and alt
- `buttons` (array): Array of button configurations

### ButtonComponent

Creates a styled button with click handling.

**Options:**
- `text` (string): Button text
- `onClick` (function): Click handler

### InputComponent

Creates a text input with label.

**Options:**
- `label` (string): Input label
- `placeholder` (string): Placeholder text

### CheckboxComponent

Creates a checkbox with label.

**Options:**
- `label` (string): Checkbox label
- `checked` (boolean): Initial checked state
- `onChange` (function): Change handler

### SelectComponent

Creates a dropdown select.

**Options:**
- `label` (string): Select label
- `options` (array): Array of option strings
- `onChange` (function): Change handler

## JSON Website Builder

Build entire websites from JSON configurations. Perfect for dynamic content, CMS integration, and rapid prototyping.

### Features

- **JSON Configuration**: Define entire websites in JSON
- **Component Composition**: Nest components within sections
- **Dynamic Loading**: Load website configurations from files
- **Responsive Design**: All components are mobile-friendly
- **Theme Support**: Light, dark, and custom themes

### Usage

```javascript
// Initialize website builder
const websiteBuilder = new WebsiteBuilder('website-container');

// Build from JSON object
const config = {
  pages: [{
    id: 'home',
    components: [
      {
        type: 'navbar',
        config: {
          brand: { text: 'My Site' },
          items: [
            { text: 'Home', href: '#', active: true },
            { text: 'About', href: '#about' }
          ]
        }
      },
      {
        type: 'hero',
        config: {
          title: 'Welcome to My Site',
          subtitle: 'Built with Picom UI Library',
          buttons: [
            { text: 'Get Started', href: '#', variant: 'primary' }
          ]
        }
      }
    ]
  }]
};

websiteBuilder.buildFromJSON(config);

// Or load from file
websiteBuilder.loadFromFile('website.json', (error, data) => {
  if (!error) {
    console.log('Website loaded successfully!');
  }
});
```

### JSON Structure

```json
{
  "title": "My Website",
  "pages": [
    {
      "id": "home",
      "className": "home-page",
      "components": [
        {
          "type": "navbar",
          "config": {
            "brand": {
              "text": "My Brand",
              "logo": "logo.png",
              "href": "#"
            },
            "items": [
              {
                "text": "Home",
                "href": "#",
                "active": true
              }
            ],
            "mobile": true
          }
        },
        {
          "type": "section",
          "config": {
            "title": "Features",
            "subtitle": "What we offer",
            "className": "light",
            "content": [
              {
                "type": "card",
                "config": {
                  "title": "Feature 1",
                  "description": "Description here",
                  "buttons": [
                    {
                      "text": "Learn More",
                      "href": "#",
                      "variant": "outline"
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Form Builder

The Form Builder provides a visual interface for creating forms by dragging and dropping components.

### Features

- **Component Palette**: Drag components from the left panel
- **Form Canvas**: Drop components to build your form
- **Live Preview**: See your form as you build it
- **Export Data**: Export form data as JSON
- **Clear Form**: Reset the form builder

### Usage

```html
<div id="form-builder"></div>
<script>
const formBuilder = new FormBuilder('form-builder');
</script>
```

## Development

### Project Structure

```
picom/
├── src/                    # Component library source
│   ├── core/              # Base classes and utilities
│   │   ├── base.js
│   │   ├── eventBus.js
│   │   ├── domUtils.js
│   │   └── websiteBuilder.js
│   ├── components/        # UI components
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── section/
│   │   ├── card/
│   │   ├── button/
│   │   ├── input/
│   │   ├── checkbox/
│   │   └── select/
│   └── builder/           # Form builder functionality
├── website/               # Website files
│   ├── demos/            # Demo pages
│   ├── pages/            # JSON page configurations
│   └── assets/           # Images and other assets
├── dist/                 # Built library files
├── index.html            # Main website
└── package.json          # NPM configuration
```

### Building

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Start development server
npm run dev
```

### Adding New Components

1. Create component directory in `src/components/`
2. Add `component.js` and `component.css` files
3. Extend `BaseComponent` class
4. Implement `render()` method
5. Add to form builder if needed

Example:

```javascript
class MyComponent extends BaseComponent {
    constructor(config = {}) {
        super('my-component', config);
    }

    render() {
        const $element = createElement('div', 'my-component');
        // Add your component logic
        return $element;
    }
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- jQuery 3.0+
- jQuery UI 1.13+ (for drag and drop)

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Changelog

### v1.0.0
- Initial release
- Basic components (Button, Input, Checkbox, Select)
- Drag and drop form builder
- Export functionality
