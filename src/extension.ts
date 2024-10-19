import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand(
    'vs-devio-opener.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello World from vs-devio-opener!');
    }
  );

  context.subscriptions.push(disposable);
}
