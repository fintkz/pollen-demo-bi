# Pollen.tech - AI Landing Page & Dashboard

This project is a React-based landing page for Pollen.tech with an integrated dashboard demo.

## Architecture

- **Main Site**: Marketing landing page with company information, features, and case studies
- **Dashboard**: Separate Notion-style dashboard at `/dashboard` showcasing AI inventory liquidation demo

## Dashboard Demo

The dashboard demonstrates a multi-agent AI inventory liquidation system with:
- Inventory upload and processing
- Real-time agent monitoring for demand analysis, pricing optimization, and marketplace management
- Product enhancement and marketplace listing generation
- Inventory liquidation styling

**Note**: Dashboard styling uses CSS scoping (`data-theme="institutional"`) to maintain separate design systems for the inventory liquidation interface. Future consolidation planned.

## Project Setup

-   **Framework:** React (v18.2.0)
-   **Build Tool:** Vite (v5.4.1)
-   **Language:** TypeScript
-   **UI Components:** Shadcn UI
-   **Styling:** Tailwind CSS
-   **Package Manager:** `bun`

## Application Structure

The application is structured into several key directories. For a detailed overview of the application architecture and component structure, please see the [architecture.md](./docs/architecture.md) file.

## Routing

The application uses `react-router-dom` for routing. The main routes are defined in `src/App.tsx` and include:

-   `/`: The main landing page (`Index`)
-   `/about`: The About page
-   `/product`: The Product page
-   `/case-studies`: The Case Studies page
-   `/security`: The Security page
-   `/privacy`: The Privacy page
-   `/terms`: The Terms page
-   `*`: A catch-all route for handling 404 Not Found errors.

## How to Run the Project

1.  **Install dependencies:**
    ```bash
    bun install
    ```
2.  **Run the development server:**
    ```bash
    bun run dev
    ```
3.  **Build for production:**
    ```bash
    bun run build
    ```
4.  **Deploy to Cloudflare Pages:**
    ```bash
    bun run deploy
    ```

## Key Scripts

-   `dev`: Starts the Vite development server.
-   `build`: Builds the project for production.
-   `lint`: Lints the codebase using ESLint.
-   `preview`: Serves the production build locally for previewing.
-   `deploy`: Builds the project and deploys it to Cloudflare Pages.
-   `format`: Formats the code using Prettier.
