/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Yuri Delgado",
    description: "I'm a creative software engineer",
    titleTemplate: "%s · Yuri Delgado",
    url: "https://yuridelgado.dev",
    image: "/images/cover-logo.jpg",
    author: "Yuri Delgado"
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-144749076-4",
        head: true,
        anonymize: true
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-anchor-links`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            resolve: `gatsby-remark-component`
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noreferrer noopener"
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
            },
          },
    //       {
    //         resolve: `gatsby-remark-prismjs`,
    //         options: {
    //           // Class prefix for <pre> tags containing syntax highlighting;
    //           // defaults to 'language-' (e.g. <pre class="language-js">).
    //           // If your site loads Prism into the browser at runtime,
    //           // (e.g. for use with libraries like react-live),
    //           // you may use this to prevent Prism from re-processing syntax.
    //           // This is an uncommon use-case though;
    //           // If you're unsure, it's best to use the default value.
    //           classPrefix: "language-",
    //           // This is used to allow setting a language for inline code
    //           // (i.e. single backticks) by creating a separator.
    //           // This separator is a string and will do no white-space
    //           // stripping.
    //           // A suggested value for English speakers is the non-ascii
    //           // character '›'.
    //           inlineCodeMarker: null,
    //           // This lets you set up language aliases.  For example,
    //           // setting this to '{ sh: "bash" }' will let you use
    //           // the language "sh" which will highlight using the
    //           // bash highlighter.
    //           aliases: {},
    //           // This toggles the display of line numbers globally alongside the code.
    //           // To use it, add the following line in gatsby-browser.js
    //           // right after importing the prism color scheme:
    //           //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
    //           // Defaults to false.
    //           // If you wish to only show line numbers on certain code blocks,
    //           // leave false and use the {numberLines: true} syntax below
    //           showLineNumbers: false,
    //           // If setting this to true, the parser won't handle and highlight inline
    //           // code used in markdown i.e. single backtick code like `this`.
    //           noInlineHighlight: false,
    //           // This adds a new language definition to Prism or extend an already
    //           // existing language definition. More details on this option can be
    //           // found under the header "Add new language definition or extend an
    //           // existing language" below.
    //           languageExtensions: [
    //             {
    //               language: "superscript",
    //               extend: "javascript",
    //               definition: {
    //                 superscript_types: /(SuperType)/,
    //               },
    //               insertBefore: {
    //                 function: {
    //                   superscript_keywords: /(superif|superelse)/,
    //                 },
    //               },
    //             },
    //             {
    //               language: "superscript",
    //               extend: "python",
    //               definition: {
    //                 superscript_types: /(SuperType)/,
    //               },
    //               insertBefore: {
    //                 function: {
    //                   superscript_keywords: /(superif|superelse)/,
    //                 },
    //               },
    //             },
    //           ],
    //           // Customize the prompt used in shell output
    //           // Values below are default
    //           prompt: {
    //             user: "root",
    //             host: "localhost",
    //             global: false,
    //           },
    //           // By default the HTML entities <>&'" are escaped.
    //           // Add additional HTML escapes by providing a mapping
    //           // of HTML entities and their escape value IE: { '}': '&#123;' }
    //           escapeEntities: {},
    //         },
    //       },
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/blog/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog/posts/`,
      },
    },
    
  ],
}
