# **$Floki - User Management Dashboard**

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
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [License](#license)

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

### Instalation

1. Clone the repository:
   ```bash
   git clone https://github.com/pedrobadm7/floki-test.git
   cd your-repo```

   or using SSH

    ```bash
   git clone git@github.com:pedrobadm7/floki-test.git
   cd your-repo```

2. Install dependencies:
    ```bash
    npm install
      # or
    yarn install```
