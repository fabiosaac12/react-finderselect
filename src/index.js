import React from 'react'
import styles from './styles.module.css'

const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const getInnerText = (e) => {
    const elem = e.cloneNode(true);
    for (var i = elem.childNodes.length - 1; i >= 0; i--) {
        if (elem.childNodes[i].tagName) elem.removeChild(elem.childNodes[i]);
    }
    var innerText = elem['innerText' in elem ? 'innerText' : 'textContent'];
    return innerText
}

const isEven = (num) => {
    return ((num % 2) === 0)
}


const FinderSelect = ({ data, label, value, extraInfo, name, className, placeholder, onClick, onChange }) => {

    const handleInputFocus = async (e) => {
        const labelInput = e.target
        try {
            if (onClick) onClick(labelInput)
        } catch (e) {
            console.log(e)
        }
        // making the options visible
        const ul = labelInput.parentNode.parentNode.getElementsByClassName('fsOptionsList')[0]
        ul.style.display = ''
    }

    const handleInputOnBlur = async (e) => {
        const labelInput = e.target
        // making the options no visible
        const ul = labelInput.parentNode.parentNode.getElementsByClassName('fsOptionsList')[0]
        ul.style.display = 'none'

        const valueInput = labelInput.parentNode.getElementsByClassName('fsValueInput')[0]

        // verifying if the input value matches with any option
        const lis = ul.getElementsByClassName('fsOption')
        let match = false
        for (let i = 0; i < lis.length; i++) {
            const li = lis[i];
            const liText = getInnerText(li)
            if (liText === labelInput.value) {
                match = true
            }
        }

        // if no match, reset the input values
        if (!match) {
            labelInput.value = ''
            valueInput.value = ''
            doSearch(e)
        }
    }


    const doSearch = (e, reset=false) => {
        const labelInput = e.target
        
        const whereSearch = labelInput.parentNode.parentNode.getElementsByClassName('fsOption')
        const whatSearch = reset ? '' : removeAccents(labelInput.value.toLowerCase());

        // verifying if the input value matches with any option
        for (let i = 0; i < whereSearch.length; i++) {
            const li = whereSearch[i];
            const liText = removeAccents(getInnerText(li).toLowerCase());
            // if match or null input value, then set the option visible
            if ((whatSearch.length === 0) || (liText.indexOf(whatSearch) > -1)) {
                li.hidden = false
                // if no match, set the option hidden
            } else {
                li.hidden = true
            }
        }
    }

    const handleLiOnMouseDown = (e) => {
        const label = getInnerText(e.target)
        const value = e.target.getElementsByClassName('fsOptionValue')[0].innerHTML
        const labelInput = e.target.parentNode.parentNode.parentNode.getElementsByClassName('fsLabelInput')[0]
        const valueInput = e.target.parentNode.parentNode.parentNode.getElementsByClassName('fsValueInput')[0]
        // setting the input label and value
        labelInput.value = label
        valueInput.value = value

        try {
            if (onChange) onChange(valueInput)
        } catch (e) {
            console.log(e)
        }
    }

    const handleExtendIconMouseDown = (e) => {
        const labelInput = e.target.parentNode.getElementsByClassName('fsLabelInput')[0]
        const ulVisible = e.target.parentNode.parentNode.getElementsByClassName('fsOptionsList')[0].style.display !== 'none'
        if (!ulVisible) {
            // if we dont avoid the default event, then the focus will go to the extendIcon because of the click event
            e.preventDefault()
            labelInput.focus()
        }
    }

    const options = data.map((e, i) => {
        const style = {
            display: e.display === false ? 'none' : ''
        }
        const even = isEven(i) ? styles.even : ''
	return <li key={i} onMouseDown={handleLiOnMouseDown} style={style} className={`${name}LI fsOption ${styles.fsOption} ${even}`}>{e[label]}
            <span className='fsOptionValue' hidden>{e[value]}</span>
            <p className={`${styles.fsOptionExtraInfo} fsOptionExtraInfo`}>{e[extraInfo]}</p>
        </li>
    })

    return <div className={`${name}Div fsContainer ${styles.fsContainer}`} >
	<div className={`fsInputContainer ${styles.fsInputContainer}`}>
	    <input className={`${name}LabelInput fsLabelInput ${styles.fsLabelInput} ${className ? className : ''}`} placeholder={placeholder ? placeholder : ''} onChange={doSearch} onFocus={handleInputFocus} onBlur={handleInputOnBlur} />
	    <div onMouseDown={handleExtendIconMouseDown} className={`${styles.fsExtendIcon} fsExtendIcon`} />
	    <input name={name ? name : ''} className={`${name} ${name}LabelInput fsValueInput`} type='hidden'></input>
	</div>
	<div className={styles.fsOptionsListContainer}>
	    <ul style={{ display: 'none' }} className={`${name}UL fsOptionsList ${styles.fsOptionsList}`}>
		{options}
	    </ul>
	</div>
    </div>
}

export default FinderSelect
