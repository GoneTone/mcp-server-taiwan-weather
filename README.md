# 臺灣氣象 - 中央氣象署 MCP Server (非官方)

用於取得臺灣中央氣象署 API 資料的 Model Context Protocol (MCP) Server。

### Model Context Protocol (MCP) 是什麼？

MCP 是一個開放協議，它標準化了應用程式如何為大型語言模型（LLMs）提供上下文。可以將 MCP 想像成 AI 應用程式的 USB-C 接口。就像 USB-C 為您的設備提供了一種標準化的方式來連接各種外圍設備和配件，MCP 提供了一種標準化的方式來將 AI 模型連接到不同的數據源和工具。

詳細介紹請參考 [Model Context Protocol](https://modelcontextprotocol.io/introduction) 頁面。

## 功能

- 取得臺灣各縣市天氣預報資料 - 今明 36 小時天氣預報

## API

### Tools

1. `get_taiwan_weather_forecast`
   - 取得臺灣各縣市天氣預報資料 - 今明 36 小時天氣預報
   - 輸入參數：
     - `locationName` (string): 臺灣縣市名稱
   - 返回值：中央氣象署 API `F-C0032-001` 資料 Json (key records)

README 文件未完成 TODO...

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
