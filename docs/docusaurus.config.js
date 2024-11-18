const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Snapper',
  tagline: 'Snapper',
  url: 'https://asifqatar.github.io/Snapper',
  baseUrl: '/Snapper/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://avatars.githubusercontent.com/u/105142204?s=48&v=4', 
  organizationName: 'asifqatar',
  projectName: 'Snapper',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Opens Docs as the homepage
          // Please change this to your repo.
          editUrl: 'https://github.com/sayfer-io/Snapper/blob/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Snapper',
        logo: {
          alt: 'Snapper',
          src: 'https://avatars.githubusercontent.com/u/105142204?s=200&v=4',
        },
        // items: [
        //   {
        //     type: 'doc',
        //     docId: 'index',
        //     position: 'left',
        //     label: 'Docs',
        //   },
        // ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'API',
                to: '#',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://sayfer.io/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/sayfer-io/Snapper',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Snapper, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
