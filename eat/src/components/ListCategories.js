import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';

const Icon = ({nama}) => {
  if(nama === 'Makanan') return <FontAwesomeIcon icon={faUtensils} className='mr-3' />
   if(nama === 'Minuman') return <FontAwesomeIcon icon={faCoffee} className='mr-3' />
    if(nama === 'Cemilan') return <FontAwesomeIcon icon={faCheese} className='mr-3' />

    return <FontAwesomeIcon icon={faUtensils} className='mr-3' />
}

export default class ListCategories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       categories: []
    }
  }

  componentDidMount() {
    axios
    .get(API_URL+"categories")
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(error => {
        console.log(error);
      })
    }

    changeCategory = (value) => {
      this.setState({
        categoriYangDipilih: value,
      })


    }
  
  render() {
    const { categories } = this.state
    const { changeCategory, categoriYangDipilih } = this.props
    return (
      <Col md={2} mt="2">
        <h3>Daftar kategori</h3> 
    <ListGroup>
      {categories && categories.map((category) => ( 
         <ListGroup.Item key={category.id} 
         onClick={() => changeCategory(category.nama)}
         className={categoriYangDipilih === category.nama && "category-aktif"}
         style={{cursor: 'pointer'}}
         >
        <Icon nama={category.nama} /> {category.nama}
         </ListGroup.Item>
      ))}

    </ListGroup>
      </Col>
    )
  }
}
