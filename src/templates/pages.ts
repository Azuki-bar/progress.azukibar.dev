import { html } from "hono/html";
import { AllowedProject, ProgressStats } from "..";
type Props = {
  projectName: AllowedProject;
  progressStats: ProgressStats;
};
const UnixTimeToJapaneseDateTime = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);
  if (!date) return "不明";
  // UnixTimeはUTCなので、日本時間に変換する
  date.setHours(date.getHours() + 9);
  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDay()}日 ${date.getHours()}時${date.getMinutes()}分`;
};

const japaneseProjectNames: Record<AllowedProject, string> = {
  sotsuron: "卒論",
};
export const PageHTML = (props: Props) => {
  const japaneseProjectName = japaneseProjectNames[props.projectName];

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
  <title>あずきバーくんの${japaneseProjectName}進捗</title>
</head>

<body class="wf-notosansjapanese">
  <p>あずきバーくんの現在の「${japaneseProjectName}」進捗は<span id="progress" style="color: red">${
    props.progressStats.pagesCount
  }</span>ページです</p>
  <p><a href="/${props.projectName}/json">json</a></p>
  <p>最終更新日時: ${UnixTimeToJapaneseDateTime(props.progressStats.lastUpdatedAt)}</p>
<a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
  class="twitter-share-button"
  data-text="あずきバーくんの現在の${japaneseProjectName}進捗は${props.progressStats.pagesCount}ページです。"
  data-url="https://progress.azukibar.dev/${props.projectName}"
  data-dnt="true"
  data-show-count="false">Tweet</a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "1d37d03b746548c4bd334c6e622295e7"}'></script><!-- End Cloudflare Web Analytics -->
</body>
</html>
`;
};
