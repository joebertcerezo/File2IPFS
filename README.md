# File2IPFS

A modern web application that simplifies IPFS file uploads through Pinata, specifically designed for NFT developers who need to upload images and metadata JSON files to IPFS quickly and securely.

## About

File2IPFS is a user-friendly interface for uploading files to IPFS using Pinata's pinning service. The application streamlines the process of uploading NFT assets (images and JSON metadata) to IPFS, making it easier for developers to deploy their NFT collections without dealing with complex IPFS configurations.

### Key Features

- 🔐 **Secure JWT Authentication** - Uses Pinata JWT tokens for secure API access
- 🌐 **Custom Gateway Support** - Configure your own Pinata gateway for faster access
- 📁 **Drag & Drop Upload** - Intuitive file upload interface
- 🎨 **NFT-Focused** - Optimized for common NFT file types (images and JSON metadata)
- ⚡ **Fast & Reliable** - Built with modern web technologies for optimal performance
- 📱 **Responsive Design** - Works seamlessly across desktop and mobile devices

## Tech Stack

This project is built with modern web technologies:

### Frontend

- **[Nuxt.js 3](https://nuxt.com/)** - Full-stack Vue.js framework
- **[Vue.js 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Modern component library

### Backend & API

- **[Nuxt Server API](https://nuxt.com/docs/guide/directory-structure/server)** - Server-side API routes
- **[Pinata API](https://pinata.cloud/)** - IPFS pinning service
- **[VueUse Integrations](https://vueuse.org/)** - Composition utilities (JWT handling, cookies)

### Development Tools

- **[PNPM](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting

## Use Cases for NFT Developers

### 🖼️ Image Upload

- Upload NFT artwork and get IPFS hashes instantly
- Support for common image formats (PNG, JPG, GIF, SVG, WebP)
- Automatic IPFS URL generation for marketplace integration

### 📄 Metadata Upload

- Upload JSON metadata files containing NFT attributes
- Validate JSON structure before uploading
- Get IPFS links ready for smart contract deployment

### 🚀 Collection Deployment

- Batch upload multiple assets for NFT collections
- Consistent naming and organization
- Quick integration with popular NFT marketplaces (OpenSea, Rarible, etc.)

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM package manager
- Pinata account and JWT token

### Installation

1. Clone the repository:

```bash
git clone https://github.com/joebertcerezo/File2IPFS.git
cd File2IPFS
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Configuration

1. **Get your Pinata JWT token**:

   - Sign up at [Pinata.cloud](https://pinata.cloud/)
   - Generate a JWT token from your API keys section

2. **Configure your gateway** (optional):

   - Set up a custom Pinata gateway for faster access
   - Use format: `your-gateway.mypinata.cloud`

3. **Enter credentials**:
   - Paste your JWT token in the configuration panel
   - Add your gateway URL if using a custom gateway
   - Click "Configure" to save settings

## How It Works

1. **Authentication**: Enter your Pinata JWT token for secure API access
2. **Gateway Setup**: Configure your preferred IPFS gateway (optional)
3. **File Upload**: Drag and drop or select files to upload
4. **IPFS Integration**: Files are automatically pinned to IPFS via Pinata
5. **URL Generation**: Get instant IPFS URLs for your uploaded files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you find this project helpful for your NFT development workflow, please consider:

- ⭐ Starring this repository
- 🐛 Reporting bugs or requesting features
- 🤝 Contributing to the codebase

---

**Made for Web3 developers, by developers** 🚀
