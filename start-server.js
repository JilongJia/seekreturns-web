/* eslint-disable @typescript-eslint/no-require-imports */
require("@google-cloud/profiler").start({
  serviceContext: {
    service: "seekreturns-web",
    version: process.env.K_REVISION,
  },
});

require("./server.js");
