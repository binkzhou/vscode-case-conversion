import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // 转换为大写
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "extension.uppercase",
      (editor) => {
        return editor.edit((builder) => {
          editor.selections.forEach((selection) => {
            const range = new vscode.Range(selection.start, selection.end);
            const text = editor.document.getText(range) || "";
            const matches = text.match(/(?=.*[a-zA-Z]).+/g);

            if (!matches || !matches.length) {
              return;
            }

            const newText = text.replace(/[A-Z]/g, (a) => {
              return `_${a}`;
            });
            builder.replace(selection, newText.toUpperCase());
          });
        });
      }
    )
  );

  // 转换为小写
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "extension.lowercase",
      (editor) => {
        return editor.edit((builder) => {
          editor.selections.forEach((selection) => {
            const range = new vscode.Range(selection.start, selection.end);
            const text = editor.document.getText(range) || "";
            const matches = text.match(/(?=.*[a-zA-Z]).+/g);

            if (!matches || !matches.length) {
              return;
            }
            const lowercase = text.toLowerCase();
            const newText = lowercase.replace(/_[a-z]/g, (a) => {
              return a.replace("_", "").toLocaleUpperCase();
            });
            builder.replace(selection, newText);
          });
        });
      }
    )
  );
}
