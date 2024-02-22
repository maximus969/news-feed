import React, { FormEvent, useState } from 'react'
import './EmailModal.css'
import cross from '../../assets/cross.svg'
import { ModalWrapper } from '@components/ModalWrapper/ModalWrapper'
import { Button } from '@components/Button/Button'
import { subscribeUrl } from '@components/apiUrls'

interface EmailModalType {
  onModalClose: VoidFunction
}

export const EmailModal: React.FC<EmailModalType> = ({ onModalClose }) => {
  const [sendingRequest, setSendingRequest] = useState(false)

  const _onClose = () => {
    if (!sendingRequest) onModalClose()
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSendingRequest(true)
    fetch(subscribeUrl)
      .then(() => {
        setSendingRequest(false)
        _onClose()
      })
      .catch((err) => {
        setSendingRequest(false)
        throw new Error(err)
      })
  }

  return (
    <>
      <ModalWrapper onModalClose={_onClose}>
        <div className="email-modal">
          <h2 className="email-modal__title">
            Хотите получать последние новости от{' '}
            <a href="https://karpov.courses/new" target="_blank" rel="noreferrer" className="email-modal__link">
              Karpov.Courses
            </a>
            ?
          </h2>
          <p className="email-modal__text">Оставьте свой e-mail и будем на связи! </p>
          <form className="email-modal__form" onSubmit={onFormSubmit}>
            <input type="email" required className="email-modal__input" placeholder="Введите вашу почту" />
            <Button loading={sendingRequest} type="submit">
              Подписаться
            </Button>
          </form>
          <button className="email-modal__cross" onClick={_onClose}>
            <img src={cross} alt="Закрытие модального окна" />
          </button>
        </div>
      </ModalWrapper>
    </>
  )
}
