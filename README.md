# Weather API with Express & Redis

https://roadmap.sh/projects/weather-api-wrapper-service


A simple weather API using **Express.js**, **Redis**, and **Axios** to fetch and cache weather data from **Visual Crossing**.

## Features

-   Fetches weather data for a city
-   Caches results using Redis
-   Error handling included

## Requirements

-   **Node.js** (v16+ recommended)
-   **Redis** (running locally or remotely)

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/weather-api.git && cd weather-api
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Add a `.env` file:
    ```sh
    VISUALCROSSING_API_KEY=your_api_key
    PORT=3000
    ```
4. Start Redis:
    ```sh
    redis-server
    ```
5. Run the server:
    ```sh
    npm start
    ```

## Usage

Request weather data:

```sh
http://localhost:3000/weather-api/{city}
```
