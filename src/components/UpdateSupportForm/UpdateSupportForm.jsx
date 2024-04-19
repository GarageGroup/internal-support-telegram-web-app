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
    }, [searchParams]);

    useEffect(() => {
        if (support && support.description === description && support.title === title && parseInt(support.caseTypeCode) === parseInt(caseType) && parseInt(support.priorityCode) === parseInt(priorityType)){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    }, [tg, support, description, title, caseType, priorityType]);

    const onEditCustomerHandler = useCallback(() => {
        let data = {
            title: title,
            customer: null,
            contact: null,
            caseTypeCode: caseType,
            priorityCode: priorityType,
            owner: owner,
            description: description
        };
        tg.sendData(JSON.stringify(data));
    }, [tg, title, caseType, priorityType, owner, description]);

    const onEditContactHandler = useCallback(() => {
        let data = {
            title: title,
            customer: customer,
            contact: null,
            caseTypeCode: caseType,
            priorityCode: priorityType,
            owner: owner,
            description: description
        };
        tg.sendData(JSON.stringify(data));
    }, [tg, title, customer, caseType, priorityType, owner, description]);

    const onEditOwnerHandler = useCallback(() => {
        let data = {
            title: title,
            customer: customer,
            contact: contact,
            caseTypeCode: caseType,
            priorityCode: priorityType,
            owner: null,
            description: description
        };
        tg.sendData(JSON.stringify(data));
    }, [tg, title, customer, contact, caseType, priorityType, description]);

    const onSendData = useCallback(() => {
        let data = {
            title: title,
            customer: customer,
            contact: contact,
            caseTypeCode: caseType,
            priorityCode: priorityType,
            owner: owner,
            description: description
        };
        tg.sendData(JSON.stringify(data));
    }, [tg, title, customer, contact, caseType, priorityType, owner, description]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [tg, onSendData]);

    return(
        <div className='updateSupportForm'>
            <div className='update-support-form-item'>
                <p>Заголовок</p>
                <input
                    className='update-support-form-control'
                    type='text'
                    placeholder='Заголовок'
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}/>
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
                        onClick={onEditCustomerHandler}
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
                        onClick={onEditContactHandler}
                    >
                    <i className="fa-solid fa-pen-to-square fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className='update-support-form-item'>
                <p>Тип обращения</p>
                <select className='update-support-form-control' name="selectCaseType" value={parseInt(caseType)} onChange={(e) => setCaseType(e.target.value)}>
                    <option value={0}>Вопрос</option>
                    <option value={1}>Пролема</option>
                    <option value={2}>Запрос</option>
                </select>
            </div>
            <div className='update-support-form-item'>
                <p>Приоритет</p>
                <select className='update-support-form-control' name="selectPriorityType" value={parseInt(priorityType)} onChange={(e) => setPriorityType(e.target.value)}>
                    <option value={0}>Высокий</option>
                    <option value={1}>Обычный</option>
                    <option value={2}>Низкий</option>
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
                        onClick={onEditOwnerHandler}
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
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
}

export default UpdateSupportForm;