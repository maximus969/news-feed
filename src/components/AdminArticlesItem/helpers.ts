import { InputError, InputNameType } from './types'

export const getImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const url = URL.createObjectURL(file)

    image.onload = () => {
      resolve(image)
    }

    image.onerror = (error) => {
      reject(error)
    }

    image.src = url
  })
}

export const getErrors = async (data: [InputNameType, FormDataEntryValue][]): Promise<InputError> => {
  const errors: InputError = {
    'company-name': '',
    articleTitle: '',
    description: '',
    text: '',
    image: '',
  }

  for (const [inputName, value] of data) {
    if (inputName === 'image' && value instanceof File) {
      if (value.size === 0 || !value.type.startsWith('image/')) {
        errors[inputName] = 'Добавьте изображение'
        continue
      }
      await getImage(value).then((image) => {
        if (image.width < 200 || image.height < 200) {
          errors[inputName] = 'Изображение должно быть минимум 200x200'
        }
      })
      continue
    }

    if (typeof value === 'string') {
      if (value.length === 0) {
        errors[inputName] = 'Поле не должно быть пустым'
        continue
      }
    }

    switch (inputName) {
      case 'articleTitle': {
        if (typeof value !== 'string') {
          break
        }
        if (value.length > 20) {
          errors[inputName] = 'Название должно быть до 20 символов'
        }
        break
      }

      case 'description': {
        if (typeof value !== 'string') {
          break
        }

        if (value.length > 140) {
          errors[inputName] = 'Подводка должна быть до 140 символов'
        }
        break
      }

      case 'text': {
        if (typeof value !== 'string') {
          break
        }

        if (value.length < 140) {
          errors[inputName] = 'Текст должен быть от 140 символов'
        }
        break
      }

      default: {
        break
      }
    }
  }
  return errors
}
