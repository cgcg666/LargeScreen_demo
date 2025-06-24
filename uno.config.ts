/*
 * @Description: file content
 * @Author: cg
 * @Date: 2025-06-24 15:20:48
 * @LastEditors: cg
 * @LastEditTime: 2025-06-24 16:15:04
 */
// uno.config.ts
import { defineConfig } from 'unocss'
import presetMini from '@unocss/preset-mini'

export default defineConfig({
  presets: [
    presetMini(),
    // unocss 默认rem，转成px
    // presetRemToPx({
    //   baseFontSize: 4,
    // }),
  ],
  shortcuts: {
    'f-b': 'flex justify-between items-center',
    'f-c': 'flex justify-center items-center',
    'f-s': 'flex justify-start items-center',
    'f-e': 'flex justify-end items-center',
    'text-overflow': 'truncate',
    'wh-full': 'w-full h-full',
  },
  rules: [
    [/^b-(\d+)$/, (match) => ({ 'border-width': `${match[1]}px` })],
    [/^b-(\d+)-#([\w]+)$/, (match) => ({ border: `solid ${match[1]}px #${match[2]}` })],
    [/^bt-(\d+)-#([\w]+)$/, (match) => ({ 'border-top': `solid ${match[1]}px #${match[2]}` })],
    [/^bb-(\d+)-#([\w]+)$/, (match) => ({ 'border-bottom': `solid ${match[1]}px #${match[2]}` })],
    [/^bl-(\d+)-#([\w]+)$/, (match) => ({ 'border-left': `solid ${match[1]}px #${match[2]}` })],
    [/^br-(\d+)-#([\w]+)$/, (match) => ({ 'border-right': `solid ${match[1]}px #${match[2]}` })],
    [
      /^px-(\d+)$/,
      (match) => ({ 'padding-left': `${match[1]}px`, 'padding-right': `${match[1]}px` }),
    ],
    [
      /^py-(\d+)$/,
      (match) => ({ 'padding-top': `${match[1]}px`, 'padding-bottom': `${match[1]}px` }),
    ],
    [
      /^mx-(\d+)$/,
      (match) => ({ 'margin-left': `${match[1]}px`, 'margin-right': `${match[1]}px` }),
    ],
    [
      /^my-(\d+)$/,
      (match) => ({ 'margin-top': `${match[1]}px`, 'margin-bottom': `${match[1]}px` }),
    ],
    [/^pt-(\d+)$/, (match) => ({ 'padding-top': `${match[1]}px` })],
    [/^pb-(\d+)$/, (match) => ({ 'padding-bottom': `${match[1]}px` })],
    [/^pl-(\d+)$/, (match) => ({ 'padding-left': `${match[1]}px` })],
    [/^pr-(\d+)$/, (match) => ({ 'padding-right': `${match[1]}px` })],
    [/^mt-(\d+)$/, (match) => ({ 'margin-top': `${match[1]}px` })],
    [/^mb-(\d+)$/, (match) => ({ 'margin-bottom': `${match[1]}px` })],
    [/^ml-(\d+)$/, (match) => ({ 'margin-left': `${match[1]}px` })],
    [/^mr-(\d+)$/, (match) => ({ 'margin-right': `${match[1]}px` })],
  ],
})
