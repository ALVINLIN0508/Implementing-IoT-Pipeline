# RDI AI Search Platform - Frontend

## Project Description

The RDI AI Search Frontend is a modern React application built with Vite that provides an intuitive interface for searching internship positions. It communicates with the FastAPI backend to deliver AI-powered search results. The frontend offers a responsive, user-friendly experience optimized for students, companies, and recruiters searching for internship opportunities.

This project was created to simplify the internship search process by leveraging artificial intelligence to understand natural language queries and match them with relevant job opportunities in the database.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Requirements](#requirements)
5. [Installation and Setup](#installation-and-setup)
6. [How to Use](#how-to-use)
7. [Project Structure](#project-structure)
8. [Configuration](#configuration)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)
11. [Credits](#credits)
12. [License](#license)

## Overview

The frontend provides the user interface for the RDI AI Search Platform. It allows users to search for internship positions using natural language queries, view detailed position information, browse companies, and manage their search preferences. The application is built with React 18 for component-based UI, Vite for fast development and optimized builds, modern CSS3 for responsive design, and Fetch API for backend communication.

## Features

Real-time search with AI-powered keyword extraction. Responsive design for mobile, tablet, and desktop devices. Position cards displaying key job information. Company profile pages with full details. Advanced filtering by location and role. Bookmark functionality to save favorite positions. Student dashboard with search history. Clean and intuitive user interface. Fast performance with Vite optimization.

## Tech Stack

We use React 18+ for building the UI, Vite 5.0+ for the build tool and dev server, JavaScript ES6+ for the code, CSS3 for styling, Fetch API to talk to the backend, and npm or yarn 8.0+ to manage packages.

## Requirements

You need Node.js version 16.0 or higher, npm version 8.0 or higher (or yarn 3.0+), a modern web browser like Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+, and the backend API running on http://127.0.0.1:8000.

## Installation and Setup

First, clone the repo. Go to the command line and run git clone with the repository URL, then cd into the frontend folder.

Next, install the dependencies. Run npm install or yarn install to get everything set up.

Then you need to set the backend URL. Create a .env file in the frontend directory and add VITE_API_URL=http://127.0.0.1:8000 (or whatever your backend URL is).

After that, start the dev server with npm run dev. Open http://127.0.0.1:5173 in your browser and you're good to go.

## How to Use

Just type in what you're looking for in the search bar. Something like "Python internship in Helsinki" works great. The backend will understand what you mean and show you matching positions. Click on a position card to see more details about it.

You can also browse companies to see what they're offering. Check out the student page to see your search history and bookmarked positions.

## Project Structure

The frontend folder has a src directory with main.jsx as the entry point, App.jsx as the root component, and components and pages folders for organizing the UI. The public folder has static assets. vite.config.js has the build settings, package.json has all the dependencies, and this README file explains everything.

## Configuration

You can create a .env.local file in the frontend directory to customize settings. Put the backend URL there with VITE_API_URL. You can also set VITE_ENV to development or production, and VITE_DEBUG to true if you want to see debug logs.

The Vite config in vite.config.js has settings for the dev server port (5173 by default) and other build options.

## Troubleshooting

Can't connect to backend? Make sure the backend is actually running, check that your .env file has the right URL, and verify your firewall isn't blocking the connection.

Port 5173 already in use? Just kill the process that's using it or run the dev server on a different port with npm run dev -- --port 3001.

Missing modules? Delete node_modules and package-lock.json, then run npm install again and clear your browser cache.

Dev server running slow? Clear the Vite cache with rm -rf node_modules/.vite and restart the dev server.

## Contributing

Want to help? Fork the repo, create a feature branch, make your changes, and send a pull request. Just use functional components with React Hooks, follow naming conventions, and test your stuff before submitting. Add comments if you're doing something complicated.

## Credits

This project is part of the RDI AI Search Platform, an internship search solution combining artificial intelligence with modern web technologies. Key technologies and their creators include the React team for the component library, Vite team for the fast build tool, and the open source community for various packages and tools. Special thanks to project lead Lin Tong and the development team and contributors.

## License

This project is licensed under the MIT License. This means you are free to use, modify, and distribute the software as long as you include the original license in your distribution.

For more details, see the LICENSE file in the project root.

## Building for Production

To create an optimized production build, run npm run build. This creates a dist folder with optimized files ready for deployment. To preview the production build locally, run npm run preview.

You can also use npm run dev to start the development server, npm run build to create a production build, and npm run preview to preview the production build locally.

For questions or support, please refer to the backend README or contact the development team.
