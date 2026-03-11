<script setup lang="ts">
import StorytellerSidebar from "@/feature/sidebar/StorytellerSidebar.vue";
</script>

<template>
  <div class="layout">
    <StorytellerSidebar />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>
