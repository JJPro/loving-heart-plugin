/* eslint-disable prettier/prettier */
module.exports = {
	important: true,
  // caveat: https://tailwindcss.com/docs/content-configuration#styles-rebuild-in-an-infinite-loop
  content: [
    "./assets/js/**/*.{js,jsx}",
    "./views/**/*.twig",
    "./app/**/*.php",
  ],
  safelist: [
    "rtl","home","blog","archive","date","error404","logged-in","admin-bar","no-customize-support","custom-background","wp-custom-logo","alignnone",
    "alignright","alignleft","wp-caption","wp-caption-text","screen-reader-text","comment-list","wp-social-link","wp-admin","alignfull","alignwide",
    "ul","ol","li","blockquote","dl","dd","h1","h2","h3","h4","h5","h6","figure",
    "pre","video","canvas","audio","iframe","embed","object",
  ],
  theme: {
    colors: {
      "inherit":       "inherit",
      "transparent":   "transparent",
      "white":         "#fff",
      "black":         "#000",
      "primary":       "#97a269", // tag text, tag outline /50 OR +'7f'
      "secondary":     "#4f1909", // section title
      "tertiary":      "#446851", // vector icons
      "dark":          "#71794f", // footer text
      "darker":        "#3c3e20", // nav item
      "darker-2":      "#8d8d6f", // tag text
      "trivial":       "#91979d", // social icons
      "accent":        "#f35426", // call to action button
      'background-1':  "#f9f9f7", // background
      "background-2":  "#e5e5e5", // background
    },
    boxShadow: {
      sm: "0px 2px 4px rgba(0,0,0,.24)",
    },
    fontSize: {
      xxs:  ["12px", { lineHeight: "16px" }],
      xs:   ["14px", { lineHeight: "20px" }],
      sm:   ["16px", { lineHeight: "24px" }],
      md:   ["18px", { lineHeight: "20px" }],
      lg:   ["24px", { lineHeight: "28px" }], // section title mobile
      xl:   ["36px", { lineHeight: "42px" }], // section title desktop
    },
    fontFamily: {
      sansita:      ["Sansita", "sans-serif"],
      "open-sans":  ["Open Sans", "sans-serif"],
      "noto-serif": ["Noto Serif", "serif"],
    },
    extend: {
      aspectRatio: {
        hero: '1200 / 530',
      },
    },
  },
  plugins: [],
};
