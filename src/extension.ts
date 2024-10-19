import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand(
    'vs-devio-opener.helloWorld',
    () => {
      vscode.window.showInformationMessage('Hello World from vs-devio-opener!');
    }
  );

  let newDisposable = vscode.commands.registerCommand(
    'vs-devio-opener.newCommand',
    () => {
      vscode.window.showInformationMessage('Hello World new Function!');
    }
  );


  context.subscriptions.push(disposable);
  context.subscriptions.push(newDisposable);

}
