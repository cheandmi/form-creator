import { createStore } from 'vuex'

export type FieldType = 'input' | 'select' | 'checkbox' | 'textarea' | 'toggle'

export type SelectOption = {
  label: string
  value: string | number
}

export type FieldItem = {
  name: string
  type: FieldType
  label: string
  props?: Record<string, unknown>
  options?: SelectOption[]
}

export type FormDefinition = {
  id: number
  title: string
  fields: FieldItem[]
  values: Record<string, unknown>
  saveText: string
  cancelText: string
}

type State = {
  forms: FormDefinition[]
}

export type RootState = State

const createFormId = () => Date.now() + Math.floor(Math.random() * 1000)

const store = createStore<State>({
  state: {
    forms: [
      {
        id: createFormId(),
        title: 'Базовая форма',
        values: {
          name: '',
          email: '',
          category: 'personal',
          agree: false,
        },
        saveText: 'Сохранить',
        cancelText: 'Сбросить',
        fields: [
          { name: 'name', type: 'input', label: 'Имя', props: { placeholder: 'Ваше имя' } },
          {
            name: 'email',
            type: 'input',
            label: 'Почта',
            props: { placeholder: 'you@example.com', type: 'email' },
          },
          {
            name: 'category',
            type: 'select',
            label: 'Категория',
            options: [
              { label: 'Личное', value: 'personal' },
              { label: 'Работа', value: 'work' },
              { label: 'Другое', value: 'other' },
            ],
          },
          { name: 'agree', type: 'checkbox', label: 'Согласен с условиями' },
        ],
      },
      {
        id: createFormId(),
        title: 'Форма профиля',
        values: {
          firstName: 'Владимир',
          lastName: 'Иванов',
          bio: '',
        },
        saveText: 'Сохранить',
        cancelText: 'Отменить',
        fields: [
          { name: 'firstName', type: 'input', label: 'Имя', props: { placeholder: 'Анна' } },
          { name: 'lastName', type: 'input', label: 'Фамилия', props: { placeholder: 'Иванова' } },
          {
            name: 'bio',
            type: 'textarea',
            label: 'О себе',
            props: { placeholder: 'Коротко о себе', rows: 4 },
          },
        ],
      },
      {
        id: createFormId(),
        title: 'Настройки',
        values: {
          notifications: true,
          theme: 'light',
          notes: '',
          autoSave: false,
        },
        saveText: 'Сохранить',
        cancelText: 'Отменить',
        fields: [
          { name: 'notifications', type: 'checkbox', label: 'Включить уведомления' },
          { name: 'autoSave', type: 'toggle', label: 'Автосохранение' },
          {
            name: 'theme',
            type: 'select',
            label: 'Тема',
            options: [
              { label: 'Светлая', value: 'light' },
              { label: 'Темная', value: 'dark' },
            ],
          },
          {
            name: 'notes',
            type: 'textarea',
            label: 'Заметки',
            props: { placeholder: 'Дополнительные настройки...', rows: 4 },
          },
        ],
      },
    ],
  },
  mutations: {
    updateFormValue(state: State, { id, values }: { id: number; values: Record<string, unknown> }) {
      const form = state.forms.find((item) => item.id === id)
      if (form) form.values = values
    },
    resetForm(state: State, id: number) {
      const form = state.forms.find((item) => item.id === id)
      if (!form) return
      for (const key in form.values) {
        form.values[key] = typeof form.values[key] === 'boolean' ? false : ''
      }
    },
    addForm(state: State, payload: { title: string; fields: FieldItem[] }) {
      const values: Record<string, unknown> = {}
      payload.fields.forEach((field) => {
        values[field.name] = field.type === 'checkbox' || field.type === 'toggle' ? false : ''
      })

      state.forms.push({
        id: createFormId(),
        title: payload.title,
        fields: payload.fields,
        values,
        saveText: 'Сохранить',
        cancelText: 'Отменить',
      })
    },
  },
})

export default store
