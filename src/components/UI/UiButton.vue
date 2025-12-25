<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    isDisabled?: boolean
  }>(),
  {
    isDisabled: false,
  }
)

const emit = defineEmits(['click'])

const click = (): void => {
  if (props.isDisabled) return
  emit('click')
}
</script>

<template>
  <button class="ui-button" type="button" :disabled="isDisabled" @click="click">
    {{ text }}
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border: 1px solid var(--ui-line);
  background: var(--ui-bg);
  color: var(--ui-text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0px;
  outline: none;
  padding: 0 20px;
  transition: none;

  &:hover:not(:disabled) {
    border: 1px solid var(--ui-line-hover);
  }

  &:active:not(:disabled) {
    border: 1px solid var(--ui-line-strong);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
