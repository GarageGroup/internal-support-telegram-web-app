import React, { useEffect, useState, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { inflate } from 'pako';
import { useSearchParams } from 'react-router-dom';
import './UpdateSupportForm.css';

const UpdateSupportForm = () => {

    const { tg } = useTelegram();
    const [searchParams] = useSearchParams();
    const [support, setSupport] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [customer, setCustomer] = useState(undefined);
    const [contact, setContact] = useState(undefined);
    const [caseType, setCaseType] = useState(undefined);
    const [priorityType, setPriorityType] = useState(undefined);
    const [owner, setOwnert] = useState(undefined);
    const [description, setDescription] = useState(undefined);

    useEffect(() => {
        tg.ready();
        tg.MainButton.setParams({
            text: 'Сохранить'
        });
    }, [tg]);

    useEffect(() => {
        const support = decodeAndDecompressJson(searchParams.get("data"));
        setSupport(support);
        setTitle(support.title);
        setCustomer(support.customer);
        setContact(support.contact);
        setCaseType(support.caseTypeCode);
        setPriorityType(support.priorityCode);
        setOwnert(support.owner);
        setDescription(support.description);

        function decodeAndDecompressJson(encodedData) {
            const binaryData = new Uint8Array(window.atob(encodedData).split('').map(c => c.charCodeAt(0)));
            const decodedData = inflate(binaryData, { to: 'string' });
            return JSON.parse(decodedData);
        }
    }, [searchParams])

    return(
        <div className='updateSupportForm'>
            <div className='update-support-form-item'>
                <p>Заголовок</p>
                <input
                    className='update-support-form-control'
                    type='text'
                    placeholder='Заголовок'
                    value={title} />
            </div>
            <div className='update-support-form-item'>
                <p>Клиент</p>
                <div className="input-button-container">
                    <input
                         className='update-support-form-control'
                          type="text"
                          value={customer && customer.title}
                          title={customer && customer.title}
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
                          value={contact && contact.fullName}
                          title={contact && contact.fullName}
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
                <select className='update-support-form-control' name="selectCaseType" value={caseType}>
                    <option value={1}>Вопрос</option>
                    <option value={2}>Пролема</option>
                    <option value={3}>Запрос</option>
                </select>
            </div>
            <div className='update-support-form-item'>
                <p>Приоритет</p>
                <select className='update-support-form-control' name="selectPriorityType" value={priorityType}>
                    <option value={1}>Высокий</option>
                    <option value={2}>Обычный</option>
                    <option value={3}>Низкий</option>
                </select>
            </div>
            <div className='update-support-form-item'>
                <p>Ответственный</p>
                <div className="input-button-container">
                    <input
                        className='update-support-form-control'
                        type="text"
                        value={owner && owner.fullName}
                        title={owner && owner.fullName}
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
                    rows='7'
                    value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
}

export default UpdateSupportForm;