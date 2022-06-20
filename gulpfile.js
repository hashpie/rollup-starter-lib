const {task, src, dest, parallel, series} = require("gulp");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const {rollup} = require("rollup");
const rollupTypescript = require("@rollup/plugin-typescript");
const pkg = require("./package.json");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

const build = ({format, file, name, plugins}) => {
    task(format + "-merge", async function () {
        plugins = plugins || [];
        plugins.push(rollupTypescript());
        const bundle = await rollup({input: "./src/index.ts", plugins});
        await bundle.write({sourcemap: true, file, format, name});
    });

    task(format + "-min", () => src(file)
        .pipe(terser())
        .pipe(rename({extname: ".min.js"}))
        .pipe(dest("./dist"))
    );

    task(format, series(format + "-merge", format + "-min"));
};

build({
    format: "cjs",
    file  : pkg.main
});

build({
    format: "es",
    file  : pkg.module
});

build({
    format : "umd",
    file   : pkg.browser,
    name   : "howLongUntilLunch",
    plugins: [resolve, commonjs()]
});

task("default", parallel("cjs", "es", "umd"));
