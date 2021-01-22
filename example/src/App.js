import React, {useState} from 'react'
import FinderSelect from 'react-finderselect'
import 'react-finderselect/dist/index.css'
import chargingImage from './chargingImage.png'


const request = async (url) => {
    
    const init = {
	method: "GET",
	cache: 'no-cache',
    };

    const response = await fetch(url, init);
    const data = await response.json();
    return data;
};

const Form = () => {
    const [charging, setCharging] = useState(false)

    const [normalSelectData, setNormalSelectData] = useState([])
    const [finderSelectData, setFinderSelectData] = useState([])

    const consultNormalSelectData = async () => {
	if (normalSelectData.length > 0) return
	setCharging(true)
	const data = await request("https://restcountries.eu/rest/v2/lang/en")
	setCharging(false)
	setNormalSelectData(data)
    }

    const consultFinderSelectData = async () => {
	if (finderSelectData.length > 0) return
	setCharging(true)
	const data = await request("https://restcountries.eu/rest/v2/all")
	setCharging(false)
	setFinderSelectData(data)
    }

    const printValue = (target, which) => {
	console.log(`New ${which} select value: ${target.value}`)
    }

    return (
        <div id="formContainer">
	    <form onSubmit={(e) => e.preventDefault()}>
                <div id="inputContainer">
		    <label style={{margin: '0 0 5px 2px'}}>Normal select</label>
			<select onMouseDown={consultNormalSelectData} onChange={(e) => printValue(e.target, 'normal')} id="normalSelect" name='country'>
			<option value=''>Select a country</option>
                        {normalSelectData.map((e, i) => (
                            <option key={i} value={e.alpha2Code}>{e.name}</option>
                        ))}
                    </select>
		    
		    <label style={{margin: '20px 0 5px 2px'}}>Finder select</label>
			<FinderSelect data={finderSelectData} label='name' value='alpha2Code' onClick={consultFinderSelectData} onChange={(target) => printValue(target, 'finder')} name='country' placeholder='Select a country' extraInfo='capital' />
                </div>
            </form>
	<p className='openConsole'>Open the console</p>
	<a href='https://github.com/fabiosaac12/react-finderselect' className='github'>GitHub</a>
    	<img id='chargingImage' style={{display: charging ? '' : 'none'}} src={chargingImage} alt='chargingImage' />
        </div>
    );
};

export default Form;
