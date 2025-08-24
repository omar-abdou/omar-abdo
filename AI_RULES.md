# AI Application Rules and Guidelines

This document outlines the technical stack and best practices for developing and maintaining this AI-powered IQ test application.

## Tech Stack Overview

*   **Frontend Framework**: React (version 19.1.0) for building dynamic and interactive user interfaces.
*   **Language**: TypeScript (version ~5.8.2) is used throughout the codebase for type safety, improved readability, and better maintainability.
*   **Styling**: Tailwind CSS is the exclusive utility-first CSS framework for all styling, ensuring responsive and consistent designs.
*   **Build Tool**: Vite (version ^6.2.0) provides a fast development server and optimized build process.
*   **AI Integration**: The Google Gemini API, accessed via the `@google/genai` library, powers the test generation and result analysis.
*   **Charting Library**: Recharts (version ^3.0.2) is used for creating interactive data visualizations, such as the radar chart in the results section.
*   **UI Components**: The application uses custom components (e.g., `Card`) and has shadcn/ui components readily available for building robust and accessible UI elements.
*   **Icons**: `lucide-react` is installed and available for integrating a wide range of scalable vector icons.
*   **Module Resolution**: ESM.sh is utilized for efficient module loading directly in the browser.

## Library Usage Rules

To maintain consistency, performance, and ease of maintenance, please adhere to the following guidelines when developing:

*   **UI Components**:
    *   **Prioritize shadcn/ui**: For common UI elements (e.g., buttons, inputs, dialogs, forms), always use components from the shadcn/ui library.
    *   **Custom Components**: If a specific shadcn/ui component does not meet the requirements or needs significant custom styling, create a new, small, and focused component in `src/components/`.
*   **Styling**:
    *   **Tailwind CSS Only**: All styling must be implemented using Tailwind CSS utility classes. Avoid writing custom CSS or using inline styles unless absolutely necessary for unique, complex scenarios.
    *   **Responsiveness**: Ensure all designs are inherently responsive and adapt well across various screen sizes.
*   **AI Interactions**:
    *   **`@google/genai`**: All communication with the Google Gemini API for generating questions or analyzing results must be handled through the `@google/genai` library, as demonstrated in `src/services/geminiService.ts`.
    *   **API Keys**: Manage API keys securely via environment variables, following the existing setup in `vite.config.ts`.
*   **Data Visualization**:
    *   **Recharts**: For any charting, graphs, or data visualization needs, use the `recharts` library.
*   **Icons**:
    *   **`lucide-react`**: Integrate icons into your components using the `lucide-react` package.
*   **Routing**:
    *   **React Router**: If the application expands to include multiple distinct pages requiring navigation, use React Router. All route definitions should be centralized and maintained within `src/App.tsx`.
*   **File Structure**:
    *   **Pages**: New top-level views or pages should be placed in `src/pages/`.
    *   **Components**: Reusable UI components should reside in `src/components/`.
    *   **Services/Utilities**: Application logic, API interactions, and utility functions should be organized in `src/services/` or `src/utils/`.
*   **TypeScript**:
    *   **Type Safety**: All new code should be written in TypeScript (`.tsx` or `.ts`).
    *   **Type Definitions**: Define clear interfaces and types for data structures in `src/types.ts` to ensure strong typing throughout the application.