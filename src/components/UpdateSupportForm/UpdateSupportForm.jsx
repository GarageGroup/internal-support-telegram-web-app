import React, { useEffect, useState, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './UpdateSupportForm.css';

const UpdateSupportForm = () => {

    const { tg } = useTelegram();

    return(
        <div className='updateSupportForm'>
            <div className='update-support-form-item'>
                <p>Заголовок</p>
                <input
                    className='update-support-form-control'
                    type='text'
                    placeholder='Заголовок' />
            </div>
            <div className='update-support-form-item'>
                <p>Клиент</p>
                <div className="input-button-container">
                    <input
                         className='update-support-form-control'
                          type="text"
                          // value={}
                          // title={}
                          readOnly={true} />
                     <button
                        type='button'
                        title='Редактировать клиента'
                    // onClick={}
                    >
                    <i className="fa-solid fa-pen-to-square fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className='update-support-form-item'>
                <p>Контакт</p>
                <div className="input-button-container">
                    <input
                        className='update-support-form-control'
                        type="text"
                          // value={}
                          // title={}
                        readOnly={true} />
                    <button
                        type='button'
                        title='Редактировать контакт'
                    // onClick={}
                    >
                    <i className="fa-solid fa-pen-to-square fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className='update-support-form-item'>
                <p>Тип обращения</p>
                <select className='update-support-form-control' name="select">
                    <option value="value1">Значение 1</option>
                    <option value="value2">Значение 2</option>
                    <option value="value3">Значение 3</option>
                </select>
            </div>
            <div className='update-support-form-item'>
                <p>Приоритет</p>
                <select className='update-support-form-control' name="select">
                    <option value="value1">Значение 1</option>
                    <option value="value2">Значение 2</option>
                    <option value="value3">Значение 3</option>
                </select>
            </div>
            <div className='update-support-form-item'>
                <p>Ответственный</p>
                <div className="input-button-container">
                    <input
                        className='update-support-form-control'
                        type="text"
                          // value={}
                          // title={}
                        readOnly={true} />
                    <button
                        type='button'
                        title='Редактировать ответственного'
                    // onClick={}
                    >
                    <i className="fa-solid fa-pen-to-square fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className='update-support-form-item'>
                <p>Описание</p>
                <textarea
                    className='update-support-form-text'
                    placeholder='Описание'
                    rows='5'
                    // value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
}

export default UpdateSupportForm;