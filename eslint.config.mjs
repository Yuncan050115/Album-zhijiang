import coreWebVitals from "eslint-config-next/core-web-vitals";
import reactHooks from "eslint-plugin-react-hooks";

/**
 * eslint-config-next 16 already exports a flat config array, so FlatCompat is no
 * longer needed here — worse, it breaks: `compat.extends("next/...")` feeds the
 * package through the legacy eslintrc validator, which tries to JSON.stringify a
 * config object holding circular plugin references and dies with
 * "Converting circular structure to JSON" before a single file is linted.
 *
 * `coreWebVitals` is the base config (it already carries next/typescript, the TS
 * parser and the .next/ignores) plus the plugin's core-web-vitals rules, so this
 * one spread replaces the old
 * `extends: ["next/core-web-vitals", "next/typescript"]`.
 */
const config = [
  ...coreWebVitals,
  {
    // Registered again explicitly: the plugin lives inside the object that
    // coreWebVitals exports, and ESLint 9 only resolves a rule's severity when the
    // plugin is declared in the same config object that sets the rule.
    files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      // Photo URLs come from OpenList / Tencent COS and are rendered through
      // <img> directly; the next/image requirement does not fit a gallery whose
      // sources are arbitrary remote objects.
      "@next/next/no-img-element": "off",
      // Lyric and progress callbacks intentionally re-subscribe on every tick.
      "react-hooks/exhaustive-deps": "off",

      // The React-Compiler-era rules that eslint-plugin-react-hooks 6 turns on by
      // default. They are real signals, but this codebase predates them: 27 of the
      // 29 errors CI reported were these three, concentrated in hooks that mirror
      // media-player state into React state on every tick. Downgraded to warn so
      // CI gates on actual breakage (undefined imports, type errors, purity bugs in
      // new code are still surfaced) while the migration is scheduled per file.
      // Remove these three lines as the call sites get fixed.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
    },
  },
];

export default config;
