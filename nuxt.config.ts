// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["shadcn-nuxt", "@nuxtjs/sitemap", "@nuxtjs/robots"],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "@/components/ui",
  },

  // Enhanced app configuration with SEO meta tags
  app: {
    head: {
      title: "File2IPFS - Decentralized File Storage for NFT Developers",
      titleTemplate: "%s | File2IPFS",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Upload NFT images and metadata to IPFS effortlessly with File2IPFS. Modern, secure, and fast decentralized file storage using Pinata pinning service.",
        },
        {
          name: "keywords",
          content:
            "IPFS, NFT, file upload, Pinata, decentralized storage, blockchain, Web3, metadata, NFT images",
        },
        { name: "author", content: "File2IPFS Team" },
        { name: "robots", content: "index, follow" },

        // Open Graph tags
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "File2IPFS - Decentralized File Storage for NFT Developers",
        },
        {
          property: "og:description",
          content:
            "Upload NFT images and metadata to IPFS effortlessly. Modern, secure, and fast decentralized file storage using Pinata.",
        },
        { property: "og:url", content: "https://file2ipfs.netlify.app" },
        { property: "og:site_name", content: "File2IPFS" },
        {
          property: "og:image",
          content: "https://file2ipfs.netlify.app/og-image.jpg",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "en_US" },

        // Twitter Card tags
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "File2IPFS - Decentralized File Storage for NFT Developers",
        },
        {
          name: "twitter:description",
          content:
            "Upload NFT images and metadata to IPFS effortlessly. Modern, secure, and fast decentralized file storage.",
        },
        {
          name: "twitter:image",
          content: "https://file2ipfs.netlify.app/og-image.jpg",
        },
        { name: "twitter:site", content: "@File2IPFS" },
        { name: "twitter:creator", content: "@File2IPFS" },

        // Additional SEO tags
        { name: "theme-color", content: "#0ea5e9" },
        { name: "msapplication-TileColor", content: "#0ea5e9" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "apple-mobile-web-app-title", content: "File2IPFS" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://file2ipfs.netlify.app" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "File2IPFS",
            url: "https://file2ipfs.netlify.app",
            description:
              "Upload NFT images and metadata to IPFS effortlessly with File2IPFS. Modern, secure, and fast decentralized file storage using Pinata pinning service.",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "File2IPFS Team",
            },
            featureList: [
              "Secure JWT Authentication",
              "Custom Gateway Support",
              "Drag & Drop Upload",
              "NFT-Focused",
              "Fast & Reliable",
              "Responsive Design",
            ],
          }),
        },
      ],
    },
  },

  // Robots configuration
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },

  // Runtime config for SEO
  runtimeConfig: {
    public: {
      siteUrl: "https://file2ipfs.netlify.app",
      siteName: "File2IPFS",
      siteDescription:
        "Upload NFT images and metadata to IPFS effortlessly with File2IPFS. Modern, secure, and fast decentralized file storage using Pinata pinning service.",
      language: "en",
    },
  },
});
