# Node.js Template with Express and TypeScript

This is a boilerplate template for building a scalable REST API using **Node.js**, **Express**, and **TypeScript**. It includes essential tools and configurations for development, testing, and production, such as logging (Pino), environment management (dotenv), and Docker support. This template is designed to ensure consistency across projects with standardized configurations like `.env` formatting.

## Features

- **Express** for building RESTful APIs
- **TypeScript** for type safety and scalability
- **Pino** and **Morgan** for logging
- **Dotenv** for environment variable management
- **Docker** support for containerized deployment
- Pre-configured `tsconfig.json` and linting

## Prerequisites

- **Node.js**: v22.13.1 or higher
- **npm**: v10.x or higher
- **Docker**: (optional) for containerized deployment
- **Git**: For cloning the repository

## Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

   This installs both production and development dependencies listed below.

2. **Install production dependencies**:

   ```bash
   npm i config dayjs dotenv express lodash morgan pino
   ```

3. **Install development dependencies**:
   ```bash
   npm i -D @types/config @types/express @types/lodash @types/morgan @types/node pino-pretty ts-node tsx typescript
   ```

## Environment Variables

1. **Create a `.env` file** in the project root:

   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your configuration. All values **must** be enclosed in double quotes (`"`) for consistency:

   ```env
   PORT="3000"
   NODE_ENV="development"
   ACCESS_TOKEN_PRIVATE_KEY="<Private Key>"
   ACCESS_TOKEN_PUBLIC_KEY="<Public Key>"
   REFRESH_TOKEN_PRIVATE_KEY="<Refresh Private Key>"
   REFRESH_TOKEN_PUBLIC_KEY="<Refresh Public Key>"
   ```

3. **Example `.env.example`** (included in the repository):

   ```env
   PORT="3000"
   NODE_ENV="development"
   ACCESS_TOKEN_PRIVATE_KEY=""
   ACCESS_TOKEN_PUBLIC_KEY=""
   REFRESH_TOKEN_PRIVATE_KEY=""
   REFRESH_TOKEN_PUBLIC_KEY=""
   ```

4. **Generate RSA key pairs** for JWT authentication:
   - Use a tool like [JSEncrypt](https://travistidwell.com/jsencrypt/demo/) to generate 2048-bit RSA key pairs.
   - Copy the private and public keys into the `.env` file as shown above.

**Note**: Keep `.env` out of version control by ensuring it is listed in `.gitignore`.

## Running the Project

### Development

Run the project in development mode with hot-reloading:

```bash
npm run dev
```

This uses `tsx` or `ts-node` to run TypeScript files directly.

### Production

1. Build the project:

   ```bash
   npm run build
   ```

   This compiles TypeScript to JavaScript in the `dist/` folder.

2. Start the server:
   ```bash
   npm start
   ```

### Docker

1. Build the Docker image:

   ```bash
   docker build -t nodejs-template .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env nodejs-template
   ```

The server will be available at `http://localhost:3000` (or the port specified in `.env`).

## Project Structure

```
nodejs-template/
├── src/                   # Source code (TypeScript)
│   └── index.ts           # Main entry point
├── dist/                  # Compiled JavaScript (after build)
├── .env                   # Environment variables (not committed)
├── .env.example           # Template for .env
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── Dockerfile             # Docker configuration
└── README.md              # Project documentation
```

## Scripts

- `npm run dev`: Run in development mode with hot-reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled JavaScript in production
- `npm test`: (Placeholder) Add your test script here

## Updating Dependencies

To keep dependencies up-to-date:

1. Check for outdated packages:
   ```bash
   npm outdated
   ```
2. Update dependencies to the latest versions:
   ```bash
   npx npm-check-updates -u
   npm install
   ```
