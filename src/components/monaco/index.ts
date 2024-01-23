export const loadTheme = async (
  editor: typeof import("monaco-editor").editor
) => {
  const themes = await import("./themes");
  return themes.loadTheme(editor);
};

export const loadGrammars = async (
  monaco: typeof import("monaco-editor"),
  editor: import("monaco-editor").editor.IStandaloneCodeEditor
) => {
  const grammars = await import("./grammars");
  return grammars.loadGrammars(monaco, editor);
};
