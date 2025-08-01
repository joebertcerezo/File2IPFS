# File2IPFS

A modern web application for uploading files to IPFS (InterPlanetary File System) using Pinata's pinning service. Built with Nuxt 4 and featuring a clean, responsive interface for seamless file uploads to the decentralized web.

## 🚀 Features

- **Drag & Drop File Upload**: Intuitive file upload interface
- **IPFS Integration**: Files are pinned to IPFS via Pinata for decentralized storage
- **Real-time Upload Progress**: Visual feedback during file uploads
- **Secure Authentication**: JWT-based authentication for Pinata API
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **File Management**: View uploaded files with IPFS hashes and gateway URLs

## 🛠️ Tech Stack

### Frontend
- **[Nuxt 4](https://nuxt.com/)** - Vue.js framework with SSR/SSG capabilities
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** (likely) - Utility-first CSS framework

### Backend
- **[Nitro](https://nitro.unjs.io/)** - Server engine (built into Nuxt)
- **[H3](https://h3.unjs.io/)** - HTTP framework for server-side API routes
- **[Pinata API](https://docs.pinata.cloud/)** - IPFS pinning service

### Development Tools
- **[PNPM](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### Storage & Infrastructure
- **[IPFS](https://ipfs.io/)** - Distributed file system
- **[Pinata](https://pinata.cloud/)** - IPFS pinning and gateway service
- **[Unstorage](https://unstorage.unjs.io/)** - Universal storage layer

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PNPM (recommended) or npm
- Pinata account and API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/file2ipfs.git
   cd file2ipfs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PINATA_JWT=your_pinata_jwt_token_here
   GATEWAY_URL=your_pinata_gateway_url_here
   ```

4. **Development Server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
file2ipfs/
├── app/                    # Nuxt 4 app directory
│   ├── app.vue            # Main app component
│   └── ...
├── server/                # Server-side code
│   └── api/
│       └── file.ts        # File upload API endpoint
├── public/                # Static assets
├── .nuxt/                 # Auto-generated Nuxt files
├── components.json        # UI components configuration
├── nuxt.config.ts         # Nuxt configuration
└── package.json
```

## 🔧 API Endpoints

### POST `/api/file`

Upload a file to IPFS via Pinata.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Headers: `Authorization: Bearer <PINATA_JWT>`
- Body: FormData with file

**Response:**
```json
{
  "IpfsHash": "QmYourFileHashHere",
  "PinSize": 1234567,
  "Timestamp": "2024-01-01T00:00:00.000Z",
  "Name": "filename.ext",
  "ipfsUrl": "ipfs://QmYourFileHashHere",
  "gatewayUrl": "https://gateway.pinata.cloud/ipfs/QmYourFileHashHere"
}
```

## 🎯 Usage

1. **Upload Files**: Drag and drop files or click to select files for upload
2. **Authentication**: Provide your Pinata JWT token for authentication
3. **View Results**: Get IPFS hash and gateway URLs for your uploaded files
4. **Access Files**: Use the IPFS hash or gateway URL to access your files

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Deploy to Vercel/Netlify

The project is ready for deployment on modern hosting platforms that support Nuxt applications.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pinata](https://pinata.cloud/) for IPFS pinning services
- [Nuxt Team](https://nuxt.com/) for the amazing framework
- [IPFS](https://ipfs.io/) for decentralized storage technology

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ and the power of decentralized storage**
