/// <reference types="chrome"/>
import './MainPage.scss';
import React from 'react';
import {Button, Radio, RadioChangeEvent, message} from 'antd';
import useForm from '../../../common/hooks/useForm';
import {EFormFields, IFormErrors, IFormValues} from '../../models/FormModel';
import testFormValidator from '../../validators/FormValidator';
import {isEmpty} from '../../../common/utils/commonUtils';
import {IObj} from '../../../common/models/commonModel';

/**
 * Главная страница
 */
const MainPage = (): JSX.Element => {
  const {fields, setField, errors, isSubmit, setIsSubmit, isValidForm} = useForm<IFormValues, IFormErrors>(
    testFormValidator,
    {},
    {}
  );

  /**
   * Обработка успешного запроса
   */
  const onSuccessResponse = () => message.success('Сообщение отправлено! УБЕДИТИТЕСЬ в его доставке.');

  /**
   * Обработка ответа на сообщение от страницы
   * @param response - Ответ на сообщение
   */
  const onReserveChromeMessage = (response: IObj) => {
    if (response.action === 'sendForm') {
      const form = document.createElement('form');
      form.action = 'https://hrm.ssp-soft.com/';
      form.method = 'post';

      const inputAuthor = document.createElement('input');
      inputAuthor.type = 'hidden';
      inputAuthor.name = 'author';
      inputAuthor.value = 'konevaas';
      form.appendChild(inputAuthor);

      const inputUrl = document.createElement('input');
      inputUrl.type = 'hidden';
      inputUrl.name = 'url';
      inputUrl.value = response.url;
      form.appendChild(inputUrl);

      const inputTitle = document.createElement('input');
      inputTitle.type = 'hidden';
      inputTitle.name = 'title';
      inputTitle.value = response.title;
      form.appendChild(inputTitle);

      const inputPosition = document.createElement('input');
      inputPosition.type = 'hidden';
      inputPosition.name = 'position';
      inputPosition.value = fields.position;
      form.appendChild(inputPosition);

      const inputLevel = document.createElement('input');
      inputLevel.type = 'hidden';
      inputLevel.name = 'level';
      inputLevel.value = fields.level;
      form.appendChild(inputLevel);

      const inputExpert = document.createElement('input');
      inputExpert.type = 'hidden';
      inputExpert.name = 'assignee';
      inputExpert.value = fields.expert;
      form.appendChild(inputExpert);

      const inputBody = document.createElement('input');
      inputBody.type = 'hidden';
      inputBody.name = 'body';
      inputBody.value = response.text;
      form.appendChild(inputBody);

      const inputHtml = document.createElement('input');
      inputHtml.type = 'hidden';
      inputHtml.name = 'body_html';
      inputHtml.value = response.html;
      form.appendChild(inputHtml);

      document.body.appendChild(form);
      form.submit();
      onSuccessResponse();
      setIsSubmit(false);
    }
  };

  /**
   * Смена значения
   * @param field - Изменяемое значения
   */
  const handleChangeField =
    (field: EFormFields) =>
    (event: RadioChangeEvent): void =>
      setField(field, event.target.value);

  /**
   * Отправка формы
   */
  const handleSubmit = (): void => {
    if (isValidForm()) {
      setIsSubmit(true);
      chrome.runtime.onMessage.addListener(onReserveChromeMessage);
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id ? tabs[0].id : 0, {
          code: `var html = document.body.innerHTML; var text = document.body.innerText; chrome.runtime.sendMessage({action: "sendForm", url: '${tabs[0].url}', title: '${tabs[0].title}', text: text, html: html});`,
        });
      });
    }
  };

  return (
    <div className="main-page">
      <div className="main-page__content">
        <div className="main-page__block main-page__block--top">
          <h3>
            <span>HRM</span> resume <span>loader</span>
          </h3>
        </div>
        <div className="main-page__block main-page__block--center">
          <div className="main-page__form">
            <div className="main-page__form-field">
              <div className="main-page__form-field-title">
                <h5>Позиция:</h5>
                {!isEmpty(errors.position) && <p>{errors.position}</p>}
              </div>
              <Radio.Group
                disabled={isSubmit}
                onChange={handleChangeField(EFormFields.position)}
                value={fields.position}
              >
                <Radio value="#arch">Архитектор</Radio>
                <Radio value="#BE">BE</Radio>
                <Radio value="#FE">FE</Radio>
                <Radio value="#iOS">iOS</Radio>
                <Radio value="#Android">Android</Radio>
                <Radio value="#SA">SA</Radio>
                <Radio value="#QA">QA</Radio>
                <Radio value="#QAA">QAA</Radio>
                <Radio value="#HR">HR</Radio>
              </Radio.Group>
            </div>
            <div className="main-page__form-field">
              <div className="main-page__form-field-title">
                <h5>Уровень:</h5>
                {!isEmpty(errors.level) && <p>{errors.level}</p>}
              </div>
              <Radio.Group disabled={isSubmit} onChange={handleChangeField(EFormFields.level)} value={fields.level}>
                <Radio value="#junior">Junior</Radio>
                <Radio value="#middle">Middle</Radio>
                <Radio value="#senior">Senior</Radio>
                <Radio value="#lead">TeamLead</Radio>
                <Radio value="#expert">Expert</Radio>
              </Radio.Group>
            </div>
            <div className="main-page__form-field">
              <div className="main-page__form-field-title">
                <h5>Эксперт:</h5>
                {!isEmpty(errors.expert) && <p>{errors.expert}</p>}
              </div>
              <Radio.Group disabled={isSubmit} onChange={handleChangeField(EFormFields.expert)} value={fields.expert}>
                <Radio value="@asa">Анохин А.</Radio>
                <Radio value="@ria">Руденко И.</Radio>
                <Radio value="@bsv">Безверхов С.</Radio>
                <Radio value="@lai">Лыхина А.</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="main-page__block main-page__block--bottom">
          <Button loading={isSubmit} type="primary" onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
