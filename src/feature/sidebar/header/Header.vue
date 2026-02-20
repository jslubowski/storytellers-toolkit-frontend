<script setup lang="ts">
</script>

<template>
  <div class="header">
    <div class="title font-display text-glow tracking-wider">Storyteller's Toolkit</div>
    <div class="text-muted-foreground subtitle">Your RPG companion</div>
  </div>
</template>

<style scoped>
.header {
  flex-direction: column;
  border-bottom: 1px solid hsl(var(--divide-border));
  padding: 1rem 1rem;

  .title {
    color: hsl(var(--primary));
    font-size: x-large;
  }

  .subtitle {
    font-size: small;
  }
}
</style>
