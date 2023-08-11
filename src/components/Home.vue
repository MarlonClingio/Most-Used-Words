<template>
  <v-content fluid>
    <v-form class="form">
      <v-file-input label="Selecione as Legendas" prepend-icon="mdi-message-text" outlined append-outer-icon="mdi-send"
        multiple chips v-model="files" @click:append-outer="processSubtitles" />
    </v-form>
    <div class="pills">
      <Pill v-for="word in groupedWords" :key="word.name" :name="word.name" :amount="word.amount" />
    </div>
  </v-content>
</template>

<script>
import Pill from './Pill.vue'

export default {
  components: { Pill },
  data: function () {
    return {
      files: [],
      groupedWords: []
    }
  },
  methods: {
    processSubtitles() {
      const paths = this.files.map(f => f.path)

      Electron.ipcRenderer.send('process-subtitles', paths)
      Electron.ipcRenderer.on('process-subtitles', (event, resp) => {
        this.groupedWords = resp
      })
    }
  }
};
</script>

<style>
.form {
  padding: 15px;
}

.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>