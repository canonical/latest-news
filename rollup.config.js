import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";

import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: {
      file: pkg.iife,
      format: "iife",
      name: "canonicalLatestNews",
      sourcemap: true,
    },
    plugins: [
      babel({
        babelrc: false,
        exclude: ["node_modules/**/*"],
        presets: [["@babel/env", { modules: false }]],
      }),
      commonjs(),
      resolve(),
      uglify(),
    ],
  },
  {
    input: "src/index.js",
    output: {
      file: pkg.main,
      format: "esm",
      name: "canonicalLatestNews",
      sourcemap: true,
    },
    plugins: [
      babel({
        babelrc: false,
        exclude: ["node_modules/**/*"],
        presets: [["@babel/env", { modules: false }]],
      }),
      commonjs(),
      resolve(),
    ],
  },
];
