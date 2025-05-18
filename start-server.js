/* eslint-disable @typescript-eslint/no-require-imports */

// Check if we are in a production environment to run the profiler
if (process.env.NODE_ENV === "production") {
  try {
    console.log("Attempting to initialize Google Cloud Profiler...");

    // K_SERVICE and K_REVISION are automatically injected by Cloud Run.
    // Provide fallbacks if running in other environments or for clarity.
    const serviceName = process.env.K_SERVICE || "seekreturns-web";
    const serviceVersion = process.env.K_REVISION || "local-unknown-version"; // Fallback for version

    require("@google-cloud/profiler").start({
      serviceContext: {
        service: serviceName,
        version: serviceVersion,
      },
      // Optional: You might want to add projectId if it's not correctly inferred.
      // projectId: process.env.GOOGLE_CLOUD_PROJECT, // Usually inferred in Cloud Run
      // Optional: For debugging the profiler itself, you can set a log level
      // logLevel: 4, // Check profiler documentation for valid levels (e.g., 0-4)
    });
    console.log(
      `Google Cloud Profiler initialization requested for service: ${serviceName}, version: ${serviceVersion}.`,
    );
  } catch (err) {
    console.error("Failed to initialize Google Cloud Profiler:", err);
    // You can decide if a profiler failure should prevent the app from starting.
    // For now, we log the error and continue, allowing the main app to start.
  }
} else {
  console.log(
    'Google Cloud Profiler is NOT being initialized (NODE_ENV is not "production").',
  );
}

// Proceed to start the main application server
console.log("Starting Next.js application (server.js)...");

require("./server.js");
