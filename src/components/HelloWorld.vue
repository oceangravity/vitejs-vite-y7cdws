<template>
  <div ref="editorContainer" style="height: 500px; width: 100%"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import * as monaco from 'monaco-editor-core';
import { useVolar } from 'monaco-volar';

export default defineComponent({
  name: 'MonacoVolar',
  props: {
    sourceCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const editorContainer = ref<HTMLElement | null>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;

    onMounted(() => {
      if (editorContainer.value) {
        editor = monaco.editor.create(editorContainer.value, {
          value: props.sourceCode,
          language: 'typescript',
        });

        useVolar(editor);
      }
    });

    watch(
      () => props.sourceCode,
      (newCode) => {
        if (editor) {
          editor.setValue(newCode);
        }
      }
    );

    return {
      editorContainer,
    };
  },
});
</script>
