# React Finder Select
This is a small project whose objective is to supply an effective and easy to use solution for the common problems about the normal html select's, which are some boring and does not let you to search inside the options, so, if the select has too options, finding the desired option will be tedious.

The Finder Select let you to set an "onClick" function and an "onChange" function, so, yo will be able to use the Finder Select as you like. The main Finder Select characteristic is that it provides the user the way to make effective searches inside the select options only writing in the select.

if you want to see how the Finder Select looks/works and compare it with a normal select, you can visit [this URL](https://react-finderselect-example.herokuapp.com).

<br/>

## To install the Finder Select in your app
`npm install --save react-finderselect`

<br/>

## To use the Finder Select in your app
```jsx
import React, { Component } from 'react'

import FinderSelect from 'react-finderselect'
import 'react-finderselect/dist/index.css'

const Example = () => {
    return <FinderSelect data={data} label={label} value={value}/>
}
```

<br/>

## Props:
| prop         | required | type             | description                                                        |
|:------------:|:--------:|:----------------:|:------------------------------------------------------------------:|
| `data`       | true     | array of objects | data that will be used for the options                             |
| `label`      | true     | string           | how is named the label key in the data                             |
| `value`      | true     | string           | how is named the value key in the data                             |
| `extraInfo`  | false    | string           | how is named the extraInfo key in the data                         |
| `name`       | false    | string           | which will be the valueInput name                                  |
| `className`  | false    | string           | which will the labelInput class                                    |
| `placeholder`| false    | string           | which will the labelInput placeholder                              |
| `onClick`    | false    | function         | function that will be executed when the user press the labelInput  |
| `onChange`   | false    | function         | function that will be executed when the user leaves the labelInput |
  
<br/>
  
## Use example:
```jsx
const data = [
    {
        name: 'Venezuela',
        capital: 'Caracas',
        code: 'VE'
    },{
        name: 'Peru',
        capital: 'Lima',
        code: 'PE'
    },{
        name: 'Argentina',
        capital: 'Buenos Aires',
        code: 'AR'
    },
    // ...
]

<FinderSelect 
    data={data} 
    label='name' 
    value='code' 
    extraInfo='capital' 
    name='country' 
    className='anyClass' 
    placeholder='Select a country'
    onClick={() => console.log('entering')} 
    onChange={() => console.log('leaving')} 
/>
``` 
### Example preview:
[![examplePreview](examplePreview.png)](https://react-finderselect-example.herokuapp.com)


## License
MIT © [fabiosaac12](https://github.com/fabiosaac12)
