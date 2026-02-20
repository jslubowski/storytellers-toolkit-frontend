<script setup lang="ts">
defineProps({
  scenarioId: String,
  scenarioName: String
});
</script>

<template>
  <div class="scenario-container">
    <div class="icon-wrapper">
      <i class="pi pi-book text-glow"/>
    </div>
    <div class="scenario-name">{{ scenarioName }}</div>
  </div>
</template>

<style scoped>
.scenario-container {
  display: flex;
  align-items: center;
  padding: 8px 4px;
}

.pi-book {
  padding-right: 1rem;
  color: hsl(var(--primary));
  font-size: 0.8rem;
}

.icon-wrapper {
  justify-self: center;
  align-self: center;
}

.scenario-name {
  align-self: center;
  justify-self: center;
  font-size: 0.8rem;
  color: hsl(var(--sidebar-foreground));
  font-weight: 500;
}
</style>
