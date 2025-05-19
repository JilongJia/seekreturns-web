export async function register() {
  // The `NEXT_RUNTIME` environment variable is available in Next.js 13.4+
  // It's good practice to ensure this code runs only in the Node.js runtime environment.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Only initialize the profiler in the production environment
    if (process.env.NODE_ENV === "production") {
      try {
        console.log(
          "[Instrumentation] Attempting to initialize Google Cloud Profiler...",
        );

        const { start } = await import("@google-cloud/profiler");

        const serviceName = process.env.K_SERVICE;
        const serviceVersion = process.env.K_REVISION;

        await start({
          serviceContext: {
            service: serviceName,
            version: serviceVersion,
          },
        });

        console.log(
          `[Instrumentation] Google Cloud Profiler initialization requested for service: ${serviceName}, version: ${serviceVersion}.`,
        );
      } catch (error) {
        console.error(
          "[Instrumentation] Failed to initialize Google Cloud Profiler:",
          error,
        );
      }
    } else {
      console.log(
        '[Instrumentation] Google Cloud Profiler is NOT being initialized (NODE_ENV is not "production").',
      );
    }
  } else {
    console.log(
      `[Instrumentation] Skipping Google Cloud Profiler initialization (NEXT_RUNTIME: ${process.env.NEXT_RUNTIME}).`,
    );
  }
}
