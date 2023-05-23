import { faMinus, faPlus, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Button, Form } from 'react-bootstrap'
// import { numberWithComas } from "../utils/utils";

const KeranjangModal = ({ showModal, handleClose, keranjangDetail, jumlah, tambah, kurang, totalHarga, handleSubmit, hapusPesanan }) => {
    if(keranjangDetail) {
         return (
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                {keranjangDetail.product.nama} {" "}
                <storng>
                   <p>Rp. {(keranjangDetail.product.harga)}</p>
                </storng>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>z
               <Form>
                 <Form.Group controlId='exampleForm.controlInput'>
                   <Form.Label>Total Harga :</Form.Label>
                   <p>{totalHarga}</p>
                  
                 </Form.Group>

                 <Form.Group controlId='exampleForm. ControlInput'>
                  <Form.Label>Jumlah :</Form.Label>
                  <br />
                  <Button variant="primary" size="sm" className="mr-8" onClick={ () => kurang()}>
                     <FontAwesomeIcon icon={faMinus}/>
                  </Button>
                  <strong>{jumlah}</strong>
                  <Button variant="primary" size="sm" className="ml-8" onClick={ () => tambah()}>
                     <FontAwesomeIcon icon={faPlus}/>
                  </Button>
                 </Form.Group>
                 <Button variant="primary" onClick={handleSubmit}>
                   Submit
                 </Button>
               </Form> 
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="success" onClick={() => hapusPesanan(keranjangDetail.id)}>
                  <FontAwesomeIcon icon={<i class="fa fa-trash" aria-hidden="true"></i>} />
                  Hapus Pesanan 
                </Button>
              </Modal.Footer>
            </Modal>
         )
    }
}
 
  
export default KeranjangModal;