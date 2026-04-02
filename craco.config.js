const path = require("path");

/** Ensure absolute imports (`services/...`, `components/...`) and .ts/.tsx resolve reliably. */
module.exports = {
  webpack: {
    configure(config) {
      const srcPath = path.resolve(__dirname, "src");
      const modules = config.resolve.modules || [];
      const normalized = modules.map((m) => path.resolve(m));
      if (!normalized.includes(srcPath)) {
        config.resolve.modules = [...modules, srcPath];
      }
      const exts = config.resolve.extensions || [];
      for (const e of [".tsx", ".ts"]) {
        if (!exts.includes(e)) {
          config.resolve.extensions = [e, ...exts];
        }
      }
      return config;
    },
  },
};
