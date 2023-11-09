import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TAB Docs",
  description: "Documentation for The Aussie BroadWAN Community",
  // cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: [
      homeSidebar(),
      tabbycatSidebar(),
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
      text: 'Tabby Cat',
      link: '/tabby_cat/system_design',
      activeMatch: '/snailrace/system_design'
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

function tabbycatSidebar() {
  return {
    text: 'Tabby Cat',
    link: '/tabby_cat/system_design',
    items: [
      {text: 'System Design', link: '/tabby_cat/system_design' },
    ]
  }
}

function snailraceSidebar() {
  return {
    text: 'Snailrace',
    link: '/snailrace/',
    items: [
      {text: 'Teams', link: '/snailrace/teams' },
      {text: 'Circuits', link: '/snailrace/circuits' },
      {
        text: 'World Design',
        link: '/snailrace/worlddesign/nations',
        items: [
          { text: 'Nations', link: '/snailrace/worlddesign/nations' },
          { text: 'The Great Snail War', link: '/snailrace/worlddesign/great_snail_war' },
          { text: 'Illicit Racing', link: '/snailrace/worlddesign/snailrace_underground' }
        ] 
      },
      { 
        text: 'Species', 
        link: '/snailrace/species/lustrous_prismshell',
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
      {
        text: 'Stories',
        link: '/snailrace/stories/snail_and_storm',
        items: [
          { text: 'The Snail and The Storm', link: '/snailrace/stories/snail_and_storm' },
        ] 
      },
    ]
  }
}