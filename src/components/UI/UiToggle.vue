<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    label: string
    isDisabled?: boolean
  }>(),
  {
    isDisabled: false,
  }
)

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="ui-toggle" role="switch">
    <div class="ui-toggle__control" @click="!isDisabled && (value = !value)">
      <div class="ui-toggle__track" :class="{ 'ui-toggle__track--on': value }">
        <div class="ui-toggle__thumb" :class="{ 'ui-toggle__thumb--on': value }"></div>
      </div>
    </div>
    <div class="ui-toggle__label">{{ label }}</div>
  </div>
</template>

<style scoped lang="scss">
.ui-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.ui-toggle__control {
  display: inline-flex;
  align-items: center;
}

.ui-toggle__track {
  width: 44px;
  height: 24px;
  background: var(--ui-line);
  border-radius: 999px;
  position: relative;
  transition: 0.2 linear;

  &--on {
    background: #22c55e;
  }
}

.ui-toggle__thumb {
  position: absolute;
  top: 1px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ui-bg);
  border: 1px solid var(--ui-line-strong);
  transition: transform 0.2s;

  &--on {
    transform: translateX(20px);
  }
}

.ui-toggle__label {
  color: var(--ui-text);
  font-size: 14px;
}
</style>
