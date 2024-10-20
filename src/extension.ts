import * as vscode from 'vscode';

let startTime: Date;

export function activate(context: vscode.ExtensionContext) {
  "worktime-tracker.start";
    startTime = new Date();

    vscode.window.showInformationMessage('作業時間の記録を開始しました。');
    const formattedTime = formatDate(startTime);
    vscode.window.showInformationMessage('現在時刻：' + formattedTime);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒`;
}

// export function deactivate() {
//   recordWorkTime();
// }

// function recordWorkTime() {
//   const endTime = new Date();
//   const workDuration = (endTime.getTime() - startTime.getTime()) / 1000;
//   console.log(`作業時間: ${workDuration}秒`);
// }
