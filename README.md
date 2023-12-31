# Fund Management System

An open source fund management system built with Nuxt.js and Nuxt UI.

## Features

- Authentication with GitHub
- Fund data in details (name, description, investment type, performance history, and current net asset value (NAV))
- Fund historical performance data in charts
- Fund comparison tools, with historical charts and performance data
- Purchase Fund in units
- Fund transaction history
- Portfolio management
- Total investment value
- Account balance management
- Account balance transaction history
- View Fund details with Chart
- Mock funds data from a real backend (Nuxt Nitro server) and database (SQLite)
- ORM with drizzle-orm

## Tech Stack

- Nuxt.js - Framework
- Nuxt UI - UI Library
- Nitro - Backend Server
- Better-sqlite3 - Database
- Drizzle ORM - ORM
- Apexcharts - Chart
- Authjs-nuxt - Authentication
- Tailwind CSS - Styling

## Requirements

- Node.js (>= v20.x)
- Pnpm (>= v8.x)

## Installation

1. Clone the repository.
1. Duplicate .env file from .env.example and fill in the required environment variables.
1. Install the dependencies.
1. Generate and seed the database with mock data.
1. Start the development server.

## Step-by-step

Start the development server on `http://localhost:3000`:

```bash

cp .env.example .env

pnpm install

pnpm run db:all # For generating, deploying migrations and seeding

pnpm run dev # For starting the development server

```

If you need to start over with new data, you can run the following commands:

```bash

pnpm run db:reset

```

Then, run the following command again to generate and seed the database with mock data:

```bash

pnpm run db:all

```
