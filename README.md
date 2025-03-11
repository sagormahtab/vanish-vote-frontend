# VanishVote Frontend

Frontend application for VanishVote - A platform for creating anonymous polls that disappear after a set time.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```


2. Create a `.env` file in the root directory and add:

```bash
VITE_API_BASE_URL=http://localhost:4200/api
```

3. Start the development server:

```bash
npm run dev
```


### Building for Production

```bash
npm run build
```


## Features

- Create anonymous polls with multiple options
- Set poll expiration time (1, 12, or 24 hours)
- Vote on polls anonymously
- View real-time results
- Add reactions (trending/like) to polls
- Comment on polls anonymously
- Share polls via unique links
- Hide results until poll ends
- Private polls (accessible only via link)

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- DayJS
