# Yield Logic Dashboard

An intuitive, farmer-centric web dashboard for managing autonomous agricultural supply chains. This application translates complex supply chain data—such as IoT storage telemetry, autonomous fleet routing, and predictive market pricing—into simple, actionable insights that farmers can easily understand and trust.

## Features

- **Animated Landing Page**: A visually appealing, conceptually driven landing page ensuring users instantly understand the system workflow.
- **My Dashboard Overview**: A cohesive look at critical data including farm status and summary metrics.
- **Truck Pickups (Fleet Map)**: Real-time map powered by Leaflet to monitor the location and ETA of autonomous pickup fleets.
- **Storage Health**: Telemetry dashboard providing actionable data on temperature, cooling fans, and spoilage warnings.
- **Market Prices**: An interactive exchange chart predicting the best times to sell crops for maximum profit.

## Tech Stack

- **React 19**
- **Vite**
- **TypeScript**
- **Vanilla CSS** (Custom Light-themed UI with glassmorphism)
- **Lucide Icons**
- **Recharts** (Market pricing charts)
- **React Leaflet** (Fleet map)

## Running Locally

To run this application locally, you will need [Node.js](https://nodejs.org/) installed.

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173/](http://localhost:5173/) in your browser.
