import { html } from 'hono/html'
type Props = {
  pagesCount: number
}
export const PageHTML = (props: Props) => {
  const title = "あずきバーくんの卒論進捗"
  return html`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />
  <style>
    .wf-notosansjapanese {
      font-family: "Noto Sans JP";
    }

  </style>
  <title>${title}</title>
</head>

<body class="wf-notosansjapanese">
  <p>あずきバーくんの現在の「卒論」進捗は<span id="progress" style="color: red">${props.pagesCount}</span>ページです</p>
<a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
  class="twitter-share-button"
  data-text="あずきバーくんの現在の卒論進捗は${props.pagesCount}ページです。"
  data-url="https://progress.azukibar.dev/sotsuron"
  data-dnt="true"
  data-show-count="false">Tweet</a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</body>
</html>
`
}