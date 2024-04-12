import React, { FormEvent, useState } from 'react'
import './EmailModal.css'
import cross from '../../images/cross.svg'
import { MODAl_DESCRIPTION_ID, MODAl_LABEL_ID, ModalWrapper } from '@components/ModalWrapper/ModalWrapper'
import { Button } from '@components/Button/Button'
import { subscribeUrl } from '@components/apiUrls'

interface EmailModalType {
  onModalClose: VoidFunction
  shown: boolean
}

export const EmailModal: React.FC<EmailModalType> = ({ onModalClose, shown }) => {
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
      <ModalWrapper onModalClose={_onClose} shown={shown}>
        <div className="email-modal">
          <button className="email-modal__cross" onClick={_onClose}>
            <img src={cross} className="email-modal__cross-img" alt="Закрыть модальное окно" />
          </button>
          <h2 className="email-modal__title" id={MODAl_LABEL_ID}>
            Хотите получать последние новости от{' '}
            <a href="https://karpov.courses/new" target="_blank" rel="noreferrer" className="email-modal__link">
              Karpov.Courses
            </a>
            ?
          </h2>
          <p className="email-modal__text" id={MODAl_DESCRIPTION_ID}>
            Оставьте свой e-mail и будем на связи!
          </p>
          <form className="email-modal__form" onSubmit={onFormSubmit}>
            <input type="email" required className="email-modal__input" placeholder="Введите вашу почту" />
            <Button loading={sendingRequest} type="submit">
              Подписаться
            </Button>
          </form>
        </div>
      </ModalWrapper>
    </>
  )
}
