import express from 'express';
import { Request, Response } from 'express'; // Add this import
import fetch from 'node-fetch';

// import { pino } from 'pino';
// const log = pino({ transport: { target: "pino-pretty" } });
// const timeCapsules = new Map<string, { message: string, buriedAt: Date }>();


const app = express();
const PORT = 3018;

const REGISTRY_URL = "http://registry:3000";

async function registerWithRegistry() {
  try {
    await fetch(`${REGISTRY_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "service-18",
        url: `http://service-18:${PORT}`
      })
    });
    console.log("Registered with registry");
  } catch (err) {
    console.error("Registry error:", err);
  }
}

// // Update the route handler with proper types
// app.get('/', (req: Request, res: Response) => {
//   res.send('Service-18 (TypeScript) is working!');
// });

app.post('/test', (req: Request, res: Response) => {
  console.log("Received test request:", req.body);
  res.json({
    message: "Test successful!",
    received: req.body,
    from: "service-18"
  });
});


app.listen(PORT, () => {
  console.log(`Service-18 running on port ${PORT}`);
  registerWithRegistry();
});