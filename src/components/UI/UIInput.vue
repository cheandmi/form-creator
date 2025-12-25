<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    type?: string
    placeholder?: string
    label?: string
    error?: string
    isRequired?: boolean
    isDisabled?: boolean
    inputmode?: string
    maxlength?: number
  }>(),
  {
    type: 'text',
    required: false,
    isDisabled: false,
  }
)

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event): void => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const clearInput = (): void => {
  emit('update:modelValue', '')
}

const showClear = computed(() => props.modelValue.length)

const stateClasses = computed(() => ({
  'ui-input--disabled': props.isDisabled,
  'ui-input--error': Boolean(props.error),
}))
</script>

<template>
  <div class="ui-input" :class="stateClasses">
    <div class="ui-input__input-container">
      <label v-if="label" class="ui-input__label">
        {{ label }}
        <span v-if="isRequired" class="ui-input__required">*</span>
      </label>

      <div class="ui-input__row">
        <input
          class="ui-input__input"
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          :disabled="isDisabled"
          :maxlength="maxlength"
          autocomplete="false"
          @input="onInput"
        />

        <button v-if="showClear" type="button" class="ui-input__clear" @click="clearInput">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 6L6 18M6 6l12 12"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="square"
            />
          </svg>
        </button>
      </div>

      <div class="ui-input__underline"></div>
    </div>

    <p v-if="error" class="ui-input__error">Ошибка</p>
  </div>
</template>

<style scoped lang="scss">
.ui-input {
  display: block;
  position: relative;

  &__input-container {
    background: var(--ui-bg);
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:focus {
      .ui-input__underline {
        background: var(--ui-line-strong);
        height: 1px;
      }
    }
  }

  &__label {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--ui-label);
    user-select: none;
  }

  &__required {
    color: var(--ui-error);
  }

  &__row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0px 4px;
  }

  &__input {
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;
    color: var(--ui-text);
    font-size: 15px;
    line-height: 22px;
    padding: 0px 25px 0px 0px;
    &::placeholder {
      color: var(--ui-placeholder);
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__underline {
    height: 1px;
    width: 100%;
    background: var(--ui-line);
    transition: 0.2s;
  }

  &__error {
    margin: 0;
    font-size: 12px;
    color: var(--ui-error);
    position: absolute;
    bottom: -25px;
    left: 0px;
  }

  &__clear {
    color: rgba(15, 23, 42, 0.35);
    cursor: pointer;
    padding: 0px;
    background: none;
    transition: 1s linear;
    position: absolute;
    right: 5px;
    top: 5px;
    outline: none;
    border: none;
    &:hover {
      color: rgba(15, 23, 42, 0.7);
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }

  &--disabled {
    .ui-input__underline {
      background: rgba(15, 23, 42, 0.1);
    }
    .ui-input__clear {
      display: none;
    }
  }

  &--error {
    .ui-input__underline {
      background: var(--ui-error) !important;
    }
    .ui-input__label {
      color: var(--ui-error);
    }
  }
}
</style>
