import * as vscode from 'vscode';

let startTime: Date;

export function activate(context: vscode.ExtensionContext) {
    startTime = new Date();

    const formattedTime = formatDate(startTime);
    
    const workTimeProvider = new WorkTimeProvider(formattedTime);
    vscode.window.registerTreeDataProvider('WorkTimeTracker.View', workTimeProvider);
    vscode.window.showInformationMessage('現在時刻：' + formattedTime);
    vscode.window.showInformationMessage('作業時間の記録を開始しました。');
}

export function deactivate() {
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

class WorkTimeProvider implements vscode.TreeDataProvider<WorkTimeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<WorkTimeItem | undefined> = new vscode.EventEmitter<WorkTimeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<WorkTimeItem | undefined> = this._onDidChangeTreeData.event;

    private workTime: string;

    constructor(workTime: string) {
        this.workTime = workTime;
    }

    getTreeItem(element: WorkTimeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: WorkTimeItem): Thenable<WorkTimeItem[]> {
        return Promise.resolve([new WorkTimeItem(this.workTime)]);
    }
}

class WorkTimeItem extends vscode.TreeItem {
    constructor(public readonly label: string) {
        super(label);
        this.tooltip = `${this.label}`;
        this.description = '';
    }
}

