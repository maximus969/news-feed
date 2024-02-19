import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useParams } from 'react-router-dom'
import { getErrors, getImage } from './helpers'
import { InputRefs, InputValues, InputError, InputNameType } from './types'

// страница редактирования партнерских статей
export const AdminArticlesItem: React.FC = () => {
  const { id } = useParams()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const inputRefs: InputRefs = {
    'company-name': useRef<HTMLInputElement>(),
    articleTitle: useRef<HTMLInputElement>(),
    description: useRef<HTMLTextAreaElement>(),
    text: useRef<HTMLTextAreaElement>(),
    image: useRef<HTMLInputElement>(),
  }
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [inputValues, setInputValues] = useState<InputValues>({
    'company-name': '',
    articleTitle: '',
    description: '',
    text: '',
    image: '',
  })
  const [inputErrors, setInputErrors] = useState<InputError>({
    'company-name': '',
    articleTitle: '',
    description: '',
    text: '',
    image: '',
  })

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.currentTarget
    const name = input.name
    const value = input.value

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // 1. сбор данных с формы
    const data = new FormData()

    Object.entries(inputValues).forEach(([name, value]) => {
      if (name === 'image') {
        data.append(name, inputFile || new File([], ''))
      } else {
        data.append(name, value)
      }
    })

    // 2. проверка данных на соответсвие условиям
    const errors = await getErrors(Array.from(data.entries()) as [InputNameType, FormDataEntryValue][])
    const errorEntries = Object.entries(errors)

    // 3. Подсветить ошибки
    setInputErrors(errors)

    // 3.1 Фокус на первом ошибочном инпуте
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const errorInput = errorEntries.find(([_, value]) => value.length > 0)
    if (errorInput) {
      const inputErrorName = errorInput[0] as InputNameType
      const inputRef = inputRefs[inputErrorName]
      if (inputRef.current) {
        inputRef.current.focus()
      }
      return
    }

    // 4. Если все ок, то отправить данные на бэк
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data,
    })
  }

  const showFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files

    if (files === null || !files.length) {
      return
    }

    const file = files[0]

    if (file.size === 0 || !file.type.startsWith('image/')) {
      return
    }

    setInputFile(file)

    getImage(file).then((image) => {
      setInputValues({
        ...inputValues,
        image: image.src,
      })
    })
  }

  return (
    <Box component={'form'} noValidate onSubmit={onSubmitForm}>
      <Grid container spacing={2}>
        <Grid item xs={9} sx={{ mb: 3 }}>
          {id ? (
            <Typography variant="h4" gutterBottom>
              Редактирование статьи
            </Typography>
          ) : (
            'Создать новую'
          )}
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" sx={{ mr: 1 }} color="success" variant="contained">
            Сохранить
          </Button>

          {id && (
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Удалить статью</MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="company-name"
                error={Boolean(inputErrors['company-name'].length)}
                label="Компания"
                variant="outlined"
                value={inputValues['company-name']}
                onChange={onInputChange}
                ref={inputRefs['company-name']}
                helperText={inputErrors['company-name']}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="articleTitle"
                error={Boolean(inputErrors.articleTitle.length)}
                label="Название статьи"
                variant="outlined"
                value={inputValues.articleTitle}
                onChange={onInputChange}
                ref={inputRefs.articleTitle}
                helperText={inputErrors.articleTitle}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                name="description"
                error={Boolean(inputErrors.description.length)}
                maxRows={4}
                label="Подводка"
                variant="outlined"
                value={inputValues.description}
                ref={inputRefs.description}
                onChange={onInputChange}
                helperText={inputErrors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                name="text"
                error={Boolean(inputErrors.text.length)}
                maxRows={12}
                label="Текст"
                variant="outlined"
                value={inputValues.text}
                onChange={onInputChange}
                ref={inputRefs.text}
                helperText={inputErrors.text}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardActionArea>
              <CardMedia height={140} image={inputValues.image} component="img" />
              <CardContent>
                <TextField
                  fullWidth
                  type={'file'}
                  name="image"
                  error={Boolean(inputValues.image.length && <img src={inputValues.image} alt="attached-file" />)}
                  onChange={showFile}
                  ref={inputRefs.image}
                  helperText={inputErrors.image}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
