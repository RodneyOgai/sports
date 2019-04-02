import React from 'react'
import {render} from 'react-dom'
import Sport from './sportTree/sportTree'
import SportTable from './sportTable/sportTable'
import 'bootstrap/dist/css/bootstrap.min.css';


render(<Sport />, document.getElementById('root'))
render(<SportTable />, document.getElementById('table'))