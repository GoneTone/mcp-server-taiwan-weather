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

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { GetTaiwanWeatherForecastSchema } from './common/types.js';
import { z } from 'zod';
import { VERSION } from './common/info.js';
import { LocationNames } from './common/utils.js';
import { weatherForecast } from './cwa-api.js';

const server = new Server(
  {
    name: '臺灣氣象 - 中央氣象署',
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_taiwan_weather_forecast',
        description: `取得臺灣各縣市天氣預報資料 - 今明 36 小時天氣預報。 (可用縣市名稱： ${LocationNames.join('、')})`,
        inputSchema: zodToJsonSchema(GetTaiwanWeatherForecastSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
    case 'get_taiwan_weather_forecast': {
      const args = GetTaiwanWeatherForecastSchema.parse(request.params.arguments);
      const data = await weatherForecast(args);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(data.records, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${request.params.name}`);
    }
  }
  catch (error) {
    let errorMessage = error instanceof Error ? error.message : String(error);
    if (error instanceof z.ZodError) {
      errorMessage = `Invalid input: ${JSON.stringify(error.errors)}`;
    }

    return {
      content: [{ type: 'text', text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

async function runServer() {
  if (typeof process.env.CWA_API_KEY === 'undefined' || process.env.CWA_API_KEY === '') {
    throw new Error('Env CWA_API_KEY is not set');
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Taiwan Weather MCP Server running on stdio');
}

runServer().catch((error) => {
  console.error('Fatal error running server:', error);
  process.exit(1);
});
