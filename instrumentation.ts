export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "production"
  ) {
    try {
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
        `Google Cloud Profiler initialized (service: ${serviceName}, version: ${serviceVersion})`,
      );
    } catch (error) {
      console.error("Google Cloud Profiler initialization failed:", error);
    }
  } else {
    console.log(
      `Google Cloud Profiler initialization skipped (NEXT_RUNTIME: ${process.env.NEXT_RUNTIME}, NODE_ENV: ${process.env.NODE_ENV})`,
    );
  }
}
