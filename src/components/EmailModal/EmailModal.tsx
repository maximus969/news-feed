import React, { FormEvent, useState } from 'react'
import './EmailModal.css'
import cross from '../../images/cross.svg'
import { MODAl_DESCRIPTION_ID, MODAl_LABEL_ID, ModalWrapper } from '@components/ModalWrapper/ModalWrapper'
import { Button } from '@components/Button/Button'
import { subscribeUrl } from '@components/apiUrls'
import { useTranslation } from 'react-i18next'

interface EmailModalType {
  onModalClose: VoidFunction
  shown: boolean
}

export const EmailModal: React.FC<EmailModalType> = ({ onModalClose, shown }) => {
  const [sendingRequest, setSendingRequest] = useState(false)
  const { t } = useTranslation()

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
            <img src={cross} className="email-modal__cross-img" alt={t(`email_modal_button_close`)} />
          </button>
          <h2
            className="email-modal__title"
            id={MODAl_LABEL_ID}
            dangerouslySetInnerHTML={{
              __html: t(`email_modal_title`, {
                link: `<a href="https://karpov.courses/new" target="_blank" rel="noreferrer" className="email-modal__link">
              Karpov.Courses
            </a>
            ?`,
              }),
            }}
          ></h2>
          <p className="email-modal__text" id={MODAl_DESCRIPTION_ID}>
            {t(`email_modal_text`)}
          </p>
          <form className="email-modal__form" onSubmit={onFormSubmit}>
            <input
              type="email"
              required
              className="email-modal__input"
              placeholder={t(`email_modal_input_placeholder`)}
            />
            <Button loading={sendingRequest} type="submit">
              {t(`email_modal_button_action`)}
            </Button>
          </form>
        </div>
      </ModalWrapper>
    </>
  )
}
