<script setup lang="ts">
import {setupMonacoEnv, loadOnigasm} from "./env";
import * as monaco from "monaco-editor";
import {loadGrammars, loadTheme} from "monaco-volar";
import {getOrCreateModel} from "../monaco/utils";
import {source as data} from "./source";
import {onMounted, ref} from "vue";

const editorContainer = ref<HTMLElement | null>(null);

const afterReady = (theme: string) => {

//   // extra libraries
//   const libSource = [
//     "declare class Facts {",
//     "    /**",
//     "     * Returns the next fact",
//     "     */",
//     "    static next():string",
//     "}",
//   ].join("\n");
//   const libUri = "ts:filename/facts.d.ts";
//   monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
// // When resolving definitions and references, the editor will try to use created models.
// // Creating a model for the library allows "peek definition/references" commands to work with the library.
//   monaco.editor.createModel(libSource, "typescript", monaco.Uri.parse(libUri));

  const model = getOrCreateModel(
      monaco.Uri.parse("file:///demo.vue"),
      "vue",
      data
  );

  const element = editorContainer.value!;
  const editorInstance = monaco.editor.create(element, {
    theme,
    model,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
    inlineSuggest: {
      enabled: false,
    },
    "semanticHighlighting.enabled": true,
  });

  editorInstance.updateOptions({
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false
  });

  // Support for semantic highlighting
  const t = (editorInstance as any)._themeService._theme;
  t.getTokenStyleMetadata = (
      type: string,
      modifiers: string[],
      _language: string
  ) => {
    const _readonly = modifiers.includes("readonly");
    switch (type) {
      case "function":
      case "method":
        return {foreground: 12};
      case "class":
        return {foreground: 11};
      case "variable":
      case "property":
        return {foreground: _readonly ? 21 : 9};
      default:
        return {foreground: 0};
    }
  };

  loadGrammars(monaco, editorInstance);
};

onMounted(() => {
  Promise.all([setupMonacoEnv(), loadOnigasm(), loadTheme(monaco.editor)]).then(
      ([languages, , theme]) => {
        console.log(languages)
        afterReady(theme.dark);
      }
  );
})
</script>

<template>
  <div ref="editorContainer" style="height: 100vh; width: 100%"></div>
</template>
