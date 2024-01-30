## これはなに？
@Azuki-bar が人に監視されながら進捗を生みたかったために生み出された進捗共有サイトです。

## how works?

このサイトは[特定のJSONフォーマット](./#想定するデータ形式)でcloudflare KVに保存された値を表示することで動的なサイトを構築しています。

Cloudflare Workersの上で動かすことを想定しています。

## 想定するデータ形式

TBD
```json
{
  "lastUpdatedAt": "number型のunixtimeを意図。単位は秒",
  "page": "ページ数"
}
```

## 動かすまで

### 依存解決
```bash
pnpm install
```

### テストデータ投入
あとで書きます

### 開発環境の起動
```
pnpm dev
```