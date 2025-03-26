/*
 * Copyright (c) 2014-2025 旋風之音 GoneTone
 *
 * Website: https://blog.reh.tw/
 * GitHub: https://github.com/GoneTone
 * Facebook: https://www.facebook.com/GoneToneDY
 * Twitter: https://twitter.com/TPGoneTone
 *
 *                               _oo0oo_
 *                              o8888888o
 *                              88" . "88
 *                              (| -_- |)
 *                              0\  =  /0
 *                            ___/`---'\___
 *                          .' \\|     |# '.
 *                         / \\|||  :  |||# \
 *                        / _||||| -:- |||||- \
 *                       |   | \\\  -  #/ |   |
 *                       | \_|  ''\---/''  |_/ |
 *                       \  .-\__  '-'  ___/-. /
 *                     ___'. .'  /--.--\  `. .'___
 *                  ."" '<  `.___\_<|>_/___.' >' "".
 *                 | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *                 \  \ `_.   \_ __\ /__ _/   .-` /  /
 *             =====`-.____`.___ \_____/___.-`___.-'=====
 *                               `=---='
 *           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *               佛祖保佑                       永無 BUG
 */

import { defineConfig } from 'tsup';
import * as fs from 'node:fs';
import path from 'node:path';

const indexFile = path.resolve(__dirname, 'src/index.ts');
const indexContent = fs.readFileSync(indexFile, 'utf-8');
const headerCommentRegex = /^\/\*[\s\S]*?\*\//;
const headerComment = indexContent.match(headerCommentRegex)?.[0] || '';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  bundle: true,
  dts: false,
  minify: true,
  tsconfig: 'tsconfig.json',
  format: ['esm'],
  target: 'es2022',
  splitting: false,
  skipNodeModulesBundle: true,
  sourcemap: false,
  shims: false,
  keepNames: false,
  banner: {
    js: headerComment,
  },
});
