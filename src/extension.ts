// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('extension.multifile', (e) => {
		const folders: any = vscode.workspace.workspaceFolders || [];
		const activeTextEditor: any = vscode.window.activeTextEditor;
		const workspacePath: string = folders[0].uri.path;
		const activePath: string = activeTextEditor.document.fileName;
		const relativePath: string = path.relative(workspacePath, activePath);
		if (!relativePath.match(/^source/)) {
			return;
		}
		vscode.workspace.openTextDocument(path.resolve(workspacePath, relativePath.replace(/^source/, 'dist'))).then(document => {
			vscode.window.showTextDocument(document, vscode.ViewColumn.Beside, true)
		});
	})
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
