# Layout System Documentation

The Picom UI Library includes a comprehensive layout system that eliminates code repetition and provides consistent, reusable layouts for your websites.

## Overview

The layout system consists of:
- **LayoutComponent**: Base component that handles different layout types
- **Layout Templates**: Pre-built configurations for common layouts
- **Website Builder Integration**: Seamless integration with JSON website building

## Available Layouts

### 1. Landing Page Layout
Perfect for marketing pages, product launches, and company websites.

```javascript
const layout = new LayoutComponent({
    type: 'landing',
    navbar: { /* navbar config */ },
    hero: { /* hero config */ },
    sections: [ /* array of sections */ ],
    footer: { /* footer config */ }
});
```

### 2. Dashboard Layout
Ideal for admin panels, analytics dashboards, and data management interfaces.

```javascript
const layout = new LayoutComponent({
    type: 'dashboard',
    sidebar: { /* sidebar config */ },
    topbar: { /* topbar config */ },
    content: [ /* main content */ ]
});
```

### 3. Blog Layout
Great for content websites, news sites, and personal blogs.

```javascript
const layout = new LayoutComponent({
    type: 'blog',
    header: { /* header config */ },
    content: [ /* blog content */ ],
    sidebar: { /* sidebar config */ },
    footer: { /* footer config */ }
});
```

### 4. Portfolio Layout
Perfect for showcasing work, projects, and creative portfolios.

```javascript
const layout = new LayoutComponent({
    type: 'portfolio',
    navbar: { /* navbar config */ },
    hero: { /* hero config */ },
    portfolio: { /* portfolio grid config */ },
    footer: { /* footer config */ }
});
```

### 5. Minimal Layout
Clean and simple layout for focused content.

```javascript
const layout = new LayoutComponent({
    type: 'minimal',
    header: { /* header config */ },
    content: [ /* main content */ ]
});
```

### 6. Sidebar Layout
Navigation-focused layout with persistent sidebar.

```javascript
const layout = new LayoutComponent({
    type: 'sidebar',
    sidebar: { /* sidebar config */ },
    content: [ /* main content */ ]
});
```

### 7. Grid Layout
Organized grid-based layout for structured content.

```javascript
const layout = new LayoutComponent({
    type: 'grid',
    header: { /* header config */ },
    grid: [ /* array of grid items */ ],
    footer: { /* footer config */ }
});
```

## Using Layout Templates

### Quick Start with Templates

```javascript
// Get a pre-built template
const landingTemplate = getLayoutTemplate('landing');

// Create layout with template
const layout = new LayoutComponent(landingTemplate);
const $layout = layout.render();

// Add to your page
$('#container').append($layout);
```

### Available Templates

- `landing` - Complete landing page layout
- `dashboard` - Admin dashboard layout
- `blog` - Blog/content layout
- `portfolio` - Portfolio showcase layout
- `minimal` - Simple minimal layout
- `sidebar` - Sidebar navigation layout
- `grid` - Grid-based layout

### Customizing Templates

```javascript
// Get template and customize
const template = getLayoutTemplate('landing');

// Modify the template
template.navbar.brand.text = 'My Custom Brand';
template.hero.title = 'Welcome to My Site';

// Create layout
const layout = new LayoutComponent(template);
```

## JSON Website Integration

### Using Layouts in JSON Configuration

```json
{
  "pages": [
    {
      "id": "home",
      "layout": {
        "type": "landing",
        "navbar": {
          "brand": { "text": "My Site" },
          "items": [
            { "text": "Home", "href": "#", "active": true },
            { "text": "About", "href": "#about" }
          ]
        },
        "hero": {
          "title": "Welcome",
          "subtitle": "Build amazing things",
          "buttons": [
            { "text": "Get Started", "href": "#", "variant": "primary" }
          ]
        }
      }
    }
  ]
}
```

### Building from JSON

```javascript
const websiteBuilder = new WebsiteBuilder('container');
websiteBuilder.loadFromFile('website.json', (error, data) => {
    if (!error) {
        console.log('Website with layouts loaded!');
    }
});
```

## Layout Configuration Options

### Navbar Configuration
```javascript
navbar: {
    brand: {
        text: 'Brand Name',
        logo: 'logo.png',
        href: '#'
    },
    items: [
        { text: 'Home', href: '#', active: true },
        { text: 'About', href: '#about' }
    ],
    mobile: true
}
```

### Hero Configuration
```javascript
hero: {
    title: 'Main Title',
    subtitle: 'Subtitle text',
    background: 'hero-bg.jpg',
    buttons: [
        { text: 'Primary', href: '#', variant: 'primary' },
        { text: 'Secondary', href: '#', variant: 'secondary' }
    ]
}
```

### Section Configuration
```javascript
sections: [
    {
        title: 'Section Title',
        subtitle: 'Section subtitle',
        className: 'light', // or 'dark', 'primary', 'secondary'
        content: [
            {
                type: 'card',
                config: { /* card config */ }
            }
        ]
    }
]
```

### Sidebar Configuration
```javascript
sidebar: {
    title: 'Navigation',
    items: [
        { text: 'Dashboard', href: '#', active: true },
        { text: 'Settings', href: '#settings' }
    ]
}
```

### Footer Configuration
```javascript
footer: {
    text: '© 2024 My Company',
    links: [
        { text: 'Privacy', href: '#' },
        { text: 'Terms', href: '#' }
    ]
}
```

## Responsive Design

All layouts are fully responsive and include:
- Mobile-first design approach
- Flexible grid systems
- Collapsible navigation
- Touch-friendly interactions
- Optimized typography scaling

## Theme Support

Layouts support multiple themes:
- **Light**: Default light theme
- **Dark**: Dark mode theme
- **Primary**: Brand color theme
- **Secondary**: Secondary color theme
- **Custom**: User-defined themes

```javascript
// Apply theme to layout
const layout = new LayoutComponent({
    type: 'landing',
    theme: 'dark',
    // ... other config
});
```

## Best Practices

### 1. Choose the Right Layout
- Use `landing` for marketing pages
- Use `dashboard` for admin interfaces
- Use `blog` for content sites
- Use `portfolio` for showcasing work

### 2. Consistent Navigation
- Keep navigation items consistent across pages
- Use active states to show current page
- Include mobile-friendly navigation

### 3. Content Organization
- Use sections to group related content
- Maintain consistent spacing and typography
- Include clear call-to-action buttons

### 4. Performance
- Use layout templates for faster development
- Minimize custom CSS overrides
- Leverage the built-in responsive system

## Examples

### Complete Landing Page
```javascript
const landingPage = new LayoutComponent({
    type: 'landing',
    navbar: {
        brand: { text: 'My Startup' },
        items: [
            { text: 'Home', href: '#', active: true },
            { text: 'Features', href: '#features' },
            { text: 'Pricing', href: '#pricing' },
            { text: 'Contact', href: '#contact' }
        ]
    },
    hero: {
        title: 'Revolutionary Product',
        subtitle: 'Change the way you work with our innovative solution',
        buttons: [
            { text: 'Start Free Trial', href: '#', variant: 'primary' },
            { text: 'Watch Demo', href: '#', variant: 'secondary' }
        ]
    },
    sections: [
        {
            title: 'Features',
            subtitle: 'Everything you need to succeed',
            className: 'light',
            content: [
                {
                    type: 'card',
                    config: {
                        title: 'Feature 1',
                        description: 'Amazing feature description',
                        buttons: [{ text: 'Learn More', href: '#', variant: 'outline' }]
                    }
                }
                // ... more cards
            ]
        }
    ],
    footer: {
        text: '© 2024 My Startup. All rights reserved.',
        links: [
            { text: 'Privacy Policy', href: '#' },
            { text: 'Terms of Service', href: '#' }
        ]
    }
});
```

### Dashboard Interface
```javascript
const dashboard = new LayoutComponent({
    type: 'dashboard',
    sidebar: {
        title: 'Admin Panel',
        items: [
            { text: 'Overview', href: '#', active: true },
            { text: 'Users', href: '#users' },
            { text: 'Analytics', href: '#analytics' },
            { text: 'Settings', href: '#settings' }
        ]
    },
    topbar: {
        title: 'Dashboard Overview',
        actions: [
            { text: 'Export Data', onClick: () => exportData() },
            { text: 'Settings', onClick: () => openSettings() }
        ]
    },
    content: [
        {
            type: 'card',
            config: {
                title: 'Welcome to Dashboard',
                description: 'Manage your application from here',
                buttons: [
                    { text: 'View Reports', href: '#', variant: 'primary' }
                ]
            }
        }
    ]
});
```

## Migration Guide

### From Individual Components to Layouts

**Before (Individual Components):**
```javascript
const navbar = new NavbarComponent(navbarConfig);
const hero = new HeroComponent(heroConfig);
const section = new SectionComponent(sectionConfig);
const footer = new FooterComponent(footerConfig);

$('#container').append(navbar.render())
               .append(hero.render())
               .append(section.render())
               .append(footer.render());
```

**After (Layout System):**
```javascript
const layout = new LayoutComponent({
    type: 'landing',
    navbar: navbarConfig,
    hero: heroConfig,
    sections: [sectionConfig],
    footer: footerConfig
});

$('#container').append(layout.render());
```

### Benefits of Migration
- **Reduced Code**: 70% less code for common layouts
- **Consistency**: Standardized layout patterns
- **Maintainability**: Centralized layout logic
- **Responsiveness**: Built-in mobile optimization
- **Theming**: Easy theme switching

## Troubleshooting

### Common Issues

1. **Layout not rendering**
   - Check if LayoutComponent is included in build
   - Verify layout type is supported
   - Check browser console for errors

2. **Styling issues**
   - Ensure layout CSS is included
   - Check for CSS conflicts
   - Verify responsive breakpoints

3. **Navigation not working**
   - Check href attributes
   - Verify click handlers
   - Test mobile navigation

### Debug Mode
```javascript
// Enable debug logging
const layout = new LayoutComponent({
    type: 'landing',
    debug: true,
    // ... other config
});
```

## Support

For more help with the layout system:
- Check the [Layout Demo](../website/demos/layout-demo.html)
- Review example configurations in [website/pages](../website/pages/)
- See the [main documentation](../README.md)
