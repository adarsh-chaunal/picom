// Pre-built layout templates for easy use
const LayoutTemplates = {
    // Landing Page Template
    landing: {
        type: 'landing',
        navbar: {
            brand: {
                text: 'Your Brand',
                href: '#'
            },
            items: [
                { text: 'Home', href: '#', active: true },
                { text: 'About', href: '#about' },
                { text: 'Services', href: '#services' },
                { text: 'Contact', href: '#contact' }
            ],
            mobile: true
        },
        hero: {
            title: 'Welcome to Our Platform',
            subtitle: 'Build amazing things with our tools and services',
            buttons: [
                { text: 'Get Started', href: '#', variant: 'primary' },
                { text: 'Learn More', href: '#', variant: 'secondary' }
            ]
        },
        sections: [
            {
                title: 'Features',
                subtitle: 'What makes us special',
                className: 'light',
                content: [
                    {
                        type: 'card',
                        config: {
                            title: 'Feature 1',
                            description: 'Amazing feature description here',
                            buttons: [{ text: 'Learn More', href: '#', variant: 'outline' }]
                        }
                    },
                    {
                        type: 'card',
                        config: {
                            title: 'Feature 2',
                            description: 'Another great feature',
                            buttons: [{ text: 'Learn More', href: '#', variant: 'outline' }]
                        }
                    },
                    {
                        type: 'card',
                        config: {
                            title: 'Feature 3',
                            description: 'Third amazing feature',
                            buttons: [{ text: 'Learn More', href: '#', variant: 'outline' }]
                        }
                    }
                ]
            }
        ],
        footer: {
            text: '© 2024 Your Company. All rights reserved.',
            links: [
                { text: 'Privacy Policy', href: '#' },
                { text: 'Terms of Service', href: '#' },
                { text: 'Contact', href: '#' }
            ]
        }
    },

    // Dashboard Template
    dashboard: {
        type: 'dashboard',
        sidebar: {
            title: 'Dashboard',
            items: [
                { text: 'Overview', href: '#', active: true },
                { text: 'Analytics', href: '#' },
                { text: 'Users', href: '#' },
                { text: 'Settings', href: '#' },
                { text: 'Reports', href: '#' }
            ]
        },
        topbar: {
            title: 'Dashboard Overview',
            actions: [
                { text: 'Export', onClick: () => alert('Export clicked') },
                { text: 'Settings', onClick: () => alert('Settings clicked') }
            ]
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Welcome to Dashboard',
                    description: 'Manage your data and analytics from here',
                    buttons: [
                        { text: 'View Reports', href: '#', variant: 'primary' }
                    ]
                }
            }
        ]
    },

    // Blog Template
    blog: {
        type: 'blog',
        header: {
            title: 'My Blog',
            subtitle: 'Thoughts and insights'
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Blog Post Title',
                    description: 'This is a sample blog post content...',
                    buttons: [
                        { text: 'Read More', href: '#', variant: 'outline' }
                    ]
                }
            }
        ],
        sidebar: {
            title: 'Recent Posts',
            items: [
                { text: 'Post 1', href: '#' },
                { text: 'Post 2', href: '#' },
                { text: 'Post 3', href: '#' }
            ]
        },
        footer: {
            text: '© 2024 My Blog',
            links: [
                { text: 'About', href: '#' },
                { text: 'Contact', href: '#' }
            ]
        }
    },

    // Portfolio Template
    portfolio: {
        type: 'portfolio',
        navbar: {
            brand: {
                text: 'Portfolio',
                href: '#'
            },
            items: [
                { text: 'Home', href: '#', active: true },
                { text: 'About', href: '#about' },
                { text: 'Work', href: '#work' },
                { text: 'Contact', href: '#contact' }
            ]
        },
        hero: {
            title: 'Creative Portfolio',
            subtitle: 'Showcasing amazing work and projects',
            buttons: [
                { text: 'View Work', href: '#work', variant: 'primary' }
            ]
        },
        portfolio: {
            title: 'Featured Work',
            items: [
                {
                    title: 'Project 1',
                    description: 'Amazing project description',
                    image: 'https://via.placeholder.com/400x300'
                },
                {
                    title: 'Project 2',
                    description: 'Another great project',
                    image: 'https://via.placeholder.com/400x300'
                },
                {
                    title: 'Project 3',
                    description: 'Third awesome project',
                    image: 'https://via.placeholder.com/400x300'
                }
            ]
        },
        footer: {
            text: '© 2024 Portfolio',
            links: [
                { text: 'LinkedIn', href: '#' },
                { text: 'GitHub', href: '#' },
                { text: 'Email', href: '#' }
            ]
        }
    },

    // Minimal Template
    minimal: {
        type: 'minimal',
        header: {
            title: 'Simple & Clean',
            subtitle: 'Minimal design for maximum impact'
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Welcome',
                    description: 'This is a minimal layout example',
                    buttons: [
                        { text: 'Get Started', href: '#', variant: 'primary' }
                    ]
                }
            }
        ]
    },

    // Sidebar Template
    sidebar: {
        type: 'sidebar',
        sidebar: {
            title: 'Navigation',
            items: [
                { text: 'Home', href: '#', active: true },
                { text: 'About', href: '#' },
                { text: 'Services', href: '#' },
                { text: 'Portfolio', href: '#' },
                { text: 'Contact', href: '#' }
            ]
        },
        content: [
            {
                type: 'card',
                config: {
                    title: 'Main Content',
                    description: 'This is the main content area with sidebar navigation',
                    buttons: [
                        { text: 'Learn More', href: '#', variant: 'outline' }
                    ]
                }
            }
        ]
    },

    // Grid Template
    grid: {
        type: 'grid',
        header: {
            title: 'Grid Layout',
            subtitle: 'Organized in a clean grid structure'
        },
        grid: [
            {
                type: 'card',
                config: {
                    title: 'Grid Item 1',
                    description: 'First grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            },
            {
                type: 'card',
                config: {
                    title: 'Grid Item 2',
                    description: 'Second grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            },
            {
                type: 'card',
                config: {
                    title: 'Grid Item 3',
                    description: 'Third grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            },
            {
                type: 'card',
                config: {
                    title: 'Grid Item 4',
                    description: 'Fourth grid item content',
                    buttons: [{ text: 'Action', href: '#', variant: 'outline' }]
                }
            }
        ],
        footer: {
            text: '© 2024 Grid Layout',
            links: [
                { text: 'Home', href: '#' },
                { text: 'About', href: '#' }
            ]
        }
    }
};

// Helper function to get layout template
function getLayoutTemplate(templateName) {
    return LayoutTemplates[templateName] || LayoutTemplates.landing;
}

// Helper function to list available templates
function getAvailableTemplates() {
    return Object.keys(LayoutTemplates);
}

// Helper function to create custom layout
function createCustomLayout(config) {
    return {
        type: config.type || 'default',
        ...config
    };
}
