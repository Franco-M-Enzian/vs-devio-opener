import * as vscode from 'vscode';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GEMINI_API_KEY } from "./env";

let startTime: Date | undefined;
let endTime: Date | undefined;

export function activate(context: vscode.ExtensionContext) {
    // 「作業開始」コマンドの登録
    let startCommand = vscode.commands.registerCommand('worktime-tracker.start', () => {
        startTime = new Date();
        const formattedStartTime = formatDate(startTime);
        vscode.window.showInformationMessage('作業を開始しました！ 開始時刻: ' + formattedStartTime);
    });

    // 「作業終了」コマンドの登録
    let stopCommand = vscode.commands.registerCommand('worktime-tracker.stop', () => {
        if (!startTime) {
            vscode.window.showInformationMessage('作業を開始していません。');
            return;
        }
        endTime = new Date();
        const formattedEndTime = formatDate(endTime);
        const workDuration = calculateDuration(startTime, endTime);
        vscode.window.showInformationMessage(`作業を終了しました！ 終了時刻: ${formattedEndTime} 作業時間: ${workDuration}`);
    });

    // コマンドをcontextに登録
    context.subscriptions.push(startCommand);
    context.subscriptions.push(stopCommand);
}

export function deactivate() {}

// 日付をフォーマットする関数
function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるので+1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒`;
}

// 作業時間を計算する関数
function calculateDuration(start: Date, end: Date): string {
    const diffMs = end.getTime() - start.getTime(); // ミリ秒差
    const diffSec = Math.floor(diffMs / 1000); // 秒に変換
    const hours = Math.floor(diffSec / 3600);
    const minutes = Math.floor((diffSec % 3600) / 60);
    const seconds = diffSec % 60;
    return `${hours}時間${minutes}分${seconds}秒`;
}