import React, { useEffect, useState, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { inflate } from 'pako';
import { useSearchParams } from 'react-router-dom';
import './UpdateSupportForm.css';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const UpdateSupportForm = () => {
    const maxTitleLength = 200;
    const { t: translation, i18n } = useTranslation();
    const { tg } = useTelegram();
    const [searchParams] = useSearchParams();
    const [support, setSupport] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [customer, setCustomer] = useState(undefined);
    const [contact, setContact] = useState(undefined);
    const [caseType, setCaseType] = useState(undefined);
    const [priorityType, setPriorityType] = useState(undefined);
    const [owner, setOwner] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [fileNames, setFileNames] = useState(undefined);
    const [owners, setOwners] = useState(undefined);

    useEffect(() => {
        tg.ready();
        tg.MainButton.setParams({
            text: translation('save')
        });
    }, [tg, translation]);

    useEffect(() => {
        let language = searchParams.get("language");
        i18n.changeLanguage(language);

        const support = decodeAndDecompressJson(searchParams.get("data"));
        setSupport(support);
        setTitle(support.title);
        setCustomer(support.customer);
        setContact(support.contact);
        setCaseType(support.caseTypeCode);
        setPriorityType(support.priorityCode);
        setOwner(support.owner);
        setDescription(support.description);
        setFileNames(support.fileNames);
        setOwners(support.owners);

        function decodeAndDecompressJson(encodedData) {
            const binaryData = new Uint8Array(window.atob(encodedData).split('').map(c => c.charCodeAt(0)));
            const decodedData = inflate(binaryData, { to: 'string' });
            return JSON.parse(decodedData);
        }
    }, [searchParams, i18n]);

    useEffect(() => {
        if (support && support.description === description && support.owner.id === owner.id && support.title === title && parseInt(support.caseTypeCode) === parseInt(caseType) && parseInt(support.priorityCode) === parseInt(priorityType)) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [tg, support, description, owner, title, caseType, priorityType]);

    const validation = useCallback(() => {
        if (!title) {
            tg.showAlert(translation('titleEmpty'))
            return false;
        }

        if (title.length > maxTitleLength) {
            alert(translation('titleLength', { maxTitleLength }))
            return false;
        }

        return true;
    }, [tg, title, translation]);

    const onEditCustomerHandler = useCallback(() => {
        if (!validation()) {
            return;
        }

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
    }, [tg, title, caseType, priorityType, owner, description, validation]);

    const onEditContactHandler = useCallback(() => {
        if (!validation()) {
            return;
        }

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
    }, [tg, title, customer, caseType, priorityType, owner, description, validation]);

    const onSendData = useCallback(() => {
        if (!validation()) {
            return;
        }

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
    }, [tg, title, customer, contact, caseType, priorityType, owner, description, validation]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [tg, onSendData]);

    const caseTypeOptions = [
        { value: 0, label: translation('question') },
        { value: 1, label: translation('problem') },
        { value: 2, label: translation('request') }
    ];
    
    const priorityTypeOptions = [
        { value: 0, label: translation('high') },
        { value: 1, label: translation('normal') },
        { value: 2, label: translation('low') }
    ];
    
    const handleOwnerChange = (selectedOption) => {
        setOwner({
            id: selectedOption.value,
            fullName: selectedOption.label
        });
    };
    
    const handleCaseTypeChange = (selectedOption) => {
        setCaseType(selectedOption.value);
    };
    
    const handlePriorityTypeChange = (selectedOption) => {
        setPriorityType(selectedOption.value);
    };

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            borderColor: 'black',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'black'
            },
            fontFamily: 'Arial',
            fontSize: '16px',
            color: 'inherit'
        }),
        menu: (provided) => ({
            ...provided,
            fontFamily: 'Arial',
            fontSize: '16px',
            color: 'inherit'
        }),
        singleValue: (provided) => ({
            ...provided,
            fontFamily: 'Arial',
            fontSize: '16px',
            color: 'inherit'
        })
    };

    return (
        <div className='updateSupportForm'>
            <div className='update-support-form-item'>
                <p>{translation('title')}</p>
                <textarea
                    className='update-support-form-control'
                    type='text'
                    rows='3'
                    placeholder={translation('title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='update-support-form-item'>
                <p>{translation('customer')}</p>
                <div className="input-button-container">
                    <input
                        className='update-support-form-control'
                        type="text"
                        value={customer && customer.title}
                        title={customer && customer.title}
                        readOnly={true} />
                    <button
                        type='button'
                        title={translation('editCustomer')}
                        onClick={onEditCustomerHandler}
                    >
                        <i className="fa-solid fa-pen-to-square fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className='update-support-form-item'>
                <p>{translation('contact')}</p>
                <div className="input-button-container">
                    <input
                        className='update-support-form-control'
                        type="text"
                        value={contact && contact.fullName}
                        title={contact && contact.fullName}
                        readOnly={true} />
                    <button
                        type='button'
                        title={translation('editContact')}
                        onClick={onEditContactHandler}
                    >
                        <i className="fa-solid fa-pen-to-square fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className='update-support-form-item'>
                <p>{translation('caseType')}</p>
                <Select
                    className='update-support-form-select-control'
                    value={caseTypeOptions.find(option => option.value === parseInt(caseType))}
                    onChange={handleCaseTypeChange}
                    options={caseTypeOptions}
                    styles={customSelectStyles}
                />
            </div>
            <div className='update-support-form-item'>
                <p>{translation('priority')}</p>
                <Select
                    className='update-support-form-select-control'
                    value={priorityTypeOptions.find(option => option.value === parseInt(priorityType))}
                    onChange={handlePriorityTypeChange}
                    options={priorityTypeOptions}
                    styles={customSelectStyles}
                />
            </div>
            <div className='update-support-form-item'>
                <p>{translation('owner')}</p>
                    <Select
                        className='update-support-form-select-control'
                        value={owner && { value: owner.id, label: owner.fullName }}
                        onChange={handleOwnerChange}
                        options={owners && owners.map(owner => ({ value: owner.id, label: owner.fullName }))}
                        isSearchable={true}
                        styles={customSelectStyles}
                    />
            </div>
            <div className='update-support-form-item'>
                <p>{translation('description')}</p>
                <textarea
                    className='update-support-form-text'
                    placeholder={translation('description')}
                    rows='7'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            {fileNames && fileNames.length > 0 && (
                <div className='update-support-form-item'>
                    <p>{translation('attachments')}</p>
                    <div className="input-button-container">
                        <input
                            className='update-support-form-control'
                            type="text"
                            placeholder={translation('noAttachments')}
                            value={fileNames ? fileNames.join(', ') : ''}
                            title={fileNames ? fileNames.join(', ') : ''}
                            readOnly={true} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateSupportForm;
