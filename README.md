
<h1>
  <img src="public/assets/images/floki.svg" alt="Project Icon" width="50" >
  <strong>Floki – User Management Dashboard</strong>
</h1>

<img src="https://github.com/user-attachments/assets/8f13e429-5be3-4a66-a265-dcbc7e8f9d9a" alt="Project Icon" width="850"/>


## Overview
This project is a user management dashboard that displays a table of users with filtering, pagination, and selection functionalities. It allows you to fetch users from an API, filter them by gender or search query, and paginate through the results. The interface also provides options to select and remove users from the list. It handles various edge cases, such as loading states, error handling, and offline support.

It was built using React (with Vite), React Query, and Zustand for state management, while styled with Tailwind CSS.

The project handles edge cases like network connectivity (offline/online detection) and provides error-handling mechanisms, including retries for failed queries. It uses react-query for fetching data, with pagination and search/filter capabilities.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Versioning](#versioning)
- [Filtering Challenges](#filtering-challenges)

---

## Features

- **User Table with Pagination**: View and manage a list of users.
- **Search and Filter**: Search by name and filter by gender.
- **State Management**: Manage selected and removed users using Zustand.
- **Error Handling**: Retry failed queries and handle offline scenarios.
- **Responsive UI**: Tailwind CSS for responsive design.
- **Offline Mode**: Detect and handle offline mode with a custom page.
- **Edge Case Handling**: Retry actions, manage loading/error states.
- **Custom Hooks**: Optimized with hooks like `useFetchUsers` and `useMediaQuery`.

---

## Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**

---

## Tech Stack

- **React**: Frontend framework for building UI components.
- **TypeScript**: Strongly typed programming language for JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zustand**: State management solution for handling global state.
- **Lucide Icons**: Icon library used to display various icons in the UI.
- **Axios**: HTTP client for making API requests and handling responses.
- **React Query**: Data-fetching library for managing server-state, caching, and synchronizing data.
- **React Testing Library**: Tool for testing React components by simulating user behavior.
- **Vitest**: Testing framework and runner for writing and executing tests.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pedrobadm7/floki-test.git
   cd floki-test
    ```
   or using SSH
    ```bash
   git clone git@github.com:pedrobadm7/floki-test.git
   cd floki-test
    ```

2. Install dependencies:
    ```bash
    npm install
      # or
    yarn install
    ```

3. Run the development server:
   ```bash
   npm run dev
      # or
   yarn dev
   ```
   
---

## Testing

This project is fully tested using Vitest and React Testing Library. Tests include:
- **User Actions** (selecting and deselecting users)
- **Pagination** (navigating through pages)
- **Edge Cases** (offline detection, API errors)
- Custom Hooks (e.g., ```useFetchUsers```, ```useMediaQuery```)

Run tests with:
```bash
npm run test
# or
yarn test
```

---

## Project Structure

```bash
src/
│
├── assets/          # Static assets like images or icons
├── components/      # Reusable UI components (Avatar, Card, etc.)
├── hooks/           # Custom React hooks
├── interfaces/      # TypeScript interfaces (e.g., Users)
├── pages/           # App pages (UserTable, OfflinePage)
├── services/        # API service files
├── store/           # Zustand store configuration
├── utils/           # Utility functions (e.g., helpers, debounce, etc.)
└── App.tsx          # Main app entry
```

---

## Versioning

The project follows semantic versioning:

- 1.0.0: Initial Release
- 1.1.0: Full-featured release with user management, pagination, hook tests, and filtering.

Releases are tracked on GitHub under [Releases](https://github.com/yourusername/yourproject/releases).

---

## Filtering Challenges

### Problem Overview

One of the main challenges in this project was implementing efficient filtering of users by name and gender while using a random user API. The API provides random user data, and the results change on every request, which posed a difficulty when trying to filter and paginate users consistently. In addition, the API does not provide direct filtering for names, which means that name-based searches had to be done manually on the client side.

### Issues with API and Seed

The random user API lacks a direct `filterByName` functionality, which led to performance issues when trying to filter users manually after fetching a large dataset. Additionally, by default, the API returns different results with each request, making it challenging to ensure consistent data between user interactions (such as switching pages or applying filters). To address this inconsistency, we implemented a fixed `seed` parameter, which ensures the API returns the same set of users across requests.

However, while using a fixed seed, the `gender` filter provided by the API stopped functioning correctly. This was due to the fact that when the seed is fixed, the random user API does not apply gender filtering efficiently. As a result, filtering by gender had to be handled manually on the client-side as well, similar to the name filtering.

### Solution

1. **Client-side Filtering**: We implemented client-side filtering for both names and gender. After fetching the data from the API, the application performs additional filtering operations based on the user's search query and selected filters (gender, country, etc.). This approach ensured that even though the API didn't provide a `filterByName` option, users could still search for specific names.

2. **Using Seed for Consistency**: By using a fixed `seed` parameter, we ensured that the same dataset is returned for each request, making the pagination more consistent. This approach allowed users to navigate between pages and maintain the same set of data.

3. **Handling Performance**: To mitigate performance issues with manual filtering, we reduced the dataset size on each request by adjusting the number of items per page. This allowed us to limit the volume of data being processed client-side.

While this approach isn't ideal for large datasets, it worked well within the scope of this project and ensured consistent behavior across filters and pagination.

### Future Improvements

A potential improvement could be to switch to a backend solution for more efficient data filtering and processing, which would handle large datasets better and reduce client-side overhead. This would allow for direct querying and filtering through a database instead of relying on the limitations of the random user API.
