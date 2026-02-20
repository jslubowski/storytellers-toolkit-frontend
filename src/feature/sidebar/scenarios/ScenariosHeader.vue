<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <div class="container-header">
    <div class="uppercase text-muted-foreground tracking-wider">Scenarios</div>
    <div class="add-scenario-button-container">
    </div>
    <Button severity="primary" class="add-scenario-button" size="small" icon="pi pi-plus"/>
  </div>
</template>

<style scoped>
.container-header {
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-between;

  > .uppercase {
    font-size: small;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
}

.add-scenario-button {
  background-color: transparent;
  color: hsl(var(--muted-foreground));
  border-color: transparent;
}

.add-scenario-button:hover {
  background: hsl(var(--sidebar-accent)) !important;
  border-color: hsl(var(--sidebar-accent)) !important;
  color: hsl(var(--primary)) !important;
}

</style>
