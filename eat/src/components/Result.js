import React, { Component } from "react";
import { Badge, Col, ListGroup, Row, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import Total from "./Total";
import KeranjangModal from "./KeranjangModal";
import { API_URL } from '../utils/constant.js'
import axios  from 'axios'
import swal from 'sweetalert'

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      totalHarga: menuKeranjang.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah+1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
    })
  }

  kurang = () => {
    if(this.state.jumlah !== 1) {
      this.setState({
      jumlah: this.state.jumlah-1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah - 1)
    })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

      this.handleClose();

     const data = {
        jumlah: this.state.jumlah,
        total_harga: this.state.totalHarga,
        product: this.state.keranjangDetail.product,
        keterangan: this.state.keterangan,
      }

     axios
      .put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Update Pesanan!",
          text: "Pesanan Anda sudah Update!" + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
      });
      })
      .catch(error => {
        console.log(error);
      });

  }
  
   hapusPesanan = (id) => {
  
      this.handleClose();

     axios
      .delete(API_URL+"keranjangs/".id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan!",
          text: "Suksess Hapus Pesanan!" + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
      });
      })
      .catch(error => {
        console.log(error);
      });

  }

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="4">
        <h3>
          {" "}
          <strong> keranjang Pesanan </strong>
        </h3>
        <hr />{" "}
        {keranjangs.lenght !== 0 && (
          <ListGroup variant="flush">
            {" "}
            {keranjangs.map((menuKeranjang) => (
              <Card className="overflow-auto hasil">
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h3>
                      <Badge pill variant="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h3>
                  </Col>
                  <Col>
                    <h4> {menuKeranjang.product.nama} </h4>
                    <p> Rp. {numberWithCommas(menuKeranjang.product.harga)} </p>
                  </Col>
                </Row>
              </ListGroup.Item>
              </Card>
              
            ))}
              <KeranjangModal handleClose={this.handleClose} {...this.state} 
              tambah={this.tambah}
               kurang={this.kurang} 
               handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan} 
                />
          </ListGroup>
        )}
        <Total keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
