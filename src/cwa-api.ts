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

import axios from 'axios';
import { PACKAGE_NAME, VERSION } from './common/info.js';
import { getUserAgent } from 'universal-user-agent';
import { GetTaiwanWeatherForecast } from './common/types.js';

const API_POINT = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore';
const USER_AGENT = `${PACKAGE_NAME}/v${VERSION} ${getUserAgent()}`;

const axiosInstance = axios.create({
  baseURL: API_POINT,
  headers: {
    'User-Agent': USER_AGENT,
  },
  params: {
    Authorization: process.env.CWA_API_KEY,
  },
});

/**
 * 取得臺灣各縣市天氣預報資料<br>
 * 一般天氣預報 - 今明 36 小時天氣預報
 */
export async function weatherForecast(args: GetTaiwanWeatherForecast) {
  const response = await axiosInstance.get('F-C0032-001', {
    params: args,
  });

  return response.data;
}
