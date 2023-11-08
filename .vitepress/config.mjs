import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TAB Docs",
  description: "Documentation for The Aussie BroadWAN Community",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: [
      homeSidebar(),
      snailraceSidebar()
    ],
  },
})


function nav() {
  return [
    {
      text: 'Home',
      link: '/index',
      activeMatch: '/'
    },
    {
      text: 'Snailrace',
      link: '/snailrace/',
      activeMatch: '/snailrace/'
    }
  ]
}

function homeSidebar() {
  return {
    text: 'TAB Docs',
    items: [
      { text: 'Welcome to the TAB', link: '/index' }        
    ]
  }
}

function snailraceSidebar() {
  return {
    text: 'Snailrace',
    link: '/snailrace/',
    items: [
      {
        text: 'World Design',
        items: [
          { text: 'Nations', link: '/snailrace/worlddesign/nations' },
          { text: 'The Great Snail War', link: '/snailrace/worlddesign/great_snail_war' },
          { text: 'Illicit Racing', link: '/snailrace/worlddesign/snailrace_underground' }
        ] 
      },
      { 
        text: 'Species', 
        items: [
          { text: 'Lustrous Prismshell', link: '/snailrace/species/lustrous_prismshell' },
          { text: 'Stormstrike Thunderhorn', link: '/snailrace/species/stormstrike_thunderhorn' },
          { text: 'Gilded Royalcrest', link: '/snailrace/species/gilded_royalcrest' },
          { text: 'Bioengineered Circuitshell', link: '/snailrace/species/bioengineered_circuitshell' },
          { text: 'Emberwing Infernoshell', link: '/snailrace/species/emberwing_infernoshell' },
          { text: 'Shadowflare Obsidianshell', link: '/snailrace/species/shadowflare_obsidianshell' },
          { text: 'Frostglacier Chillshell', link: '/snailrace/species/frostglacier_chillshell' },
          { text: 'Terraforge Stoneclad', link: '/snailrace/species/terraforge_stoneclad' },
        ]
      },
    ]
  }
}