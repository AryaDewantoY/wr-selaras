import React from 'react'
import Button from 'react-bootstrap/Button';
import { Col, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils.js'

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={8} className='mb-4'>
    <Card className='shadow' onClick={() => masukKeranjang(menu)}>
      <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
      <Card.Body>
        <Card.Title>{menu.nama}</Card.Title>
        <Card.Text>
          Rp. {numberWithCommas(menu.harga)}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
  );
}

export default Menus;
