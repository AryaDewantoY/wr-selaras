import React, { Component } from 'react'
import { Row , Col, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/constant'
import { Link } from 'react-router-dom'


export default class Total extends Component {
  submitTotal = (Total) => {
    const pesanan = {
      total_bayar: Total,
      menus: this.props.keranjangs
    }

    axios.post(API_URL+"pesanans", pesanan).then((res) => {
      this.props.history.push('/sukses')
    })
  };

  render() {
    const Total = this.props.keranjangs.reduce(function (result, item) {
     return result + item.total_harga;
        }, 0);

    return (
      <div className='fixed-bottom'>
        <Row>
            <Col md={{ span: 3, offset:9 }} className='px-4'>
                <h3>Total Harga : <strong className='float-right mr-2'>
                     Rp. {numberWithCommas(Total)}</strong></h3>
                     <Button variant='primary' block>
                        <strong onClick={ () => this.submitTotal(Total)} as={Link} to="/sukses">BAYAR</strong>
                        <FontAwesomeIcon icon={faShoppingCart} /> 
                     </Button>
            </Col>
        </Row>
      </div>
    )
  }
}
