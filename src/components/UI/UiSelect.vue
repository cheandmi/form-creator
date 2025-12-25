<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    options: Array<{ label: string; value: string | number }>
    label: string
    isRequired?: boolean
    placeholder?: string
    isDisabled?: boolean
  }>(),
  {
    label: '',
    isRequired: false,
    placeholder: '',
    isDisabled: false,
  }
)

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value: string | number) => {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="ui-select">
    <label class="ui-select__label">
      {{ props.label }}
      <span v-if="props.isRequired" class="ui-select__required">*</span>
    </label>
    <div class="ui-select__row">
      <select
        v-model="value"
        class="ui-select__control"
        :disabled="props.isDisabled"
        autocomplete="off"
      >
        <option v-if="props.placeholder && props.modelValue === ''" disabled hidden value="">
          {{ props.placeholder }}
        </option>
        <option v-for="option in props.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <span class="ui-select__chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 10l5 5 5-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-select {
  position: relative;
  display: grid;
  gap: 0;
  width: 100%;
}

.ui-select__label {
  font-size: 11px;
  line-height: 12px;
  height: 12px;
  text-transform: uppercase;
  color: var(--ui-label);
  user-select: none;
  text-align: left;
  justify-self: start;
  margin-bottom: 4px;
}

.ui-select__required {
  color: var(--ui-error);
}

.ui-select__control {
  appearance: none;
  width: 100%;
  border: 1px solid var(--ui-line);
  background: var(--ui-bg);
  color: var(--ui-text);
  font-size: 14px;
  font-weight: 500;
  height: 36px;
  padding: 0 32px 0 10px;
  outline: none;
  cursor: pointer;
  transition: border-color 140ms ease;

  &:hover:not(:disabled) {
    border-color: var(--ui-line-strong);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.ui-select__row {
  position: relative;
  width: 100%;
}

.ui-select__chevron {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ui-text);
  pointer-events: none;
}

.ui-select__chevron svg {
  width: 16px;
  height: 16px;
  display: block;
}

.ui-select__control option {
  background: var(--ui-bg);
  color: var(--ui-text);
}

.ui-select__control option:hover {
  background: var(--ui-bg-hover);
}
</style>
