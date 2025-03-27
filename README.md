# 臺灣氣象 - 中央氣象署 MCP Server (非官方)

用於取得臺灣中央氣象署 API 資料的 Model Context Protocol (MCP) Server。

### Model Context Protocol (MCP) 是什麼？

MCP 是一個開放協議，它標準化了應用程式如何為大型語言模型 (LLMs) 提供上下文。可以將 MCP 想像成 AI 應用程式的 USB-C 接口。就像 USB-C 為您的設備提供了一種標準化的方式來連接各種外圍設備和配件，MCP 提供了一種標準化的方式來將 AI 模型連接到不同的數據源和工具。

詳細介紹請參考 [Model Context Protocol](https://modelcontextprotocol.io/introduction) 官方頁面。

## 功能

- 取得臺灣各縣市天氣預報資料 - 今明 36 小時天氣預報

## API

### Tools

1. `get_taiwan_weather_forecast`
   - 取得臺灣各縣市天氣預報資料 - 今明 36 小時天氣預報
   - 輸入參數：
     - `locationName` (string): 臺灣縣市名稱
   - 返回值：中央氣象署 API `F-C0032-001` 資料 Json (key records)

## 對話例子

### 取得臺灣各縣市天氣預報資料 - 今明 36 小時天氣預報
- 高雄今天天氣如何呢？
- 我想知道屏東的天氣
- 台北氣象預報

## 設置

### 臺灣中央氣象署 API 授權碼

您必須先取得臺灣中央氣象署 API 授權碼：
- 前往 https://opendata.cwa.gov.tw/user/authkey (需登入帳號，沒有的話請註冊)
- 點擊 "取得授權碼" 按鈕
- 複製授權碼

### 用於 Claude Desktop 或其他支援 MCP 的應用程式

要在 Claude Desktop 中使用，請將以下內容添加到您的 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "taiwan-weather": {
      "command": "npx",
      "args": [
        "-y",
        "@gonetone/mcp-server-taiwan-weather"
      ],
      "env": {
        "CWA_API_KEY": "<您的中央氣象署 API 授權碼>"
      }
    }
  }
}
```

如果要在其他支援 MCP 的應用程式中使用，請參考該應用程式的設定文件。

## 貢獻

Issues 和 Pull requests 可以在 GitHub 上的 https://github.com/GoneTone/mcp-server-taiwan-weather 提出。

### Build

```bash
yarn build
```

### Test

可以使用 [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) 來測試 MCP Server：

```bash
npx -y @modelcontextprotocol/inspector -e CWA_API_KEY={您的中央氣象署 API 授權碼} node .
```

詳情請參考 [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) 官方頁面。

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
