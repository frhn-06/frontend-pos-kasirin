import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import { useEffect } from "react";
import useDeleteProduct from "./useDeleteProduct";


interface TypeProps {
  onClose: () => void;
  isOpen: boolean;
  productId: string;
  refetch: () => void;
}
const DeleteProduct = (props: TypeProps) => {
    const {
      onClose,
      isOpen,
      productId,
      refetch
    } = props

    const {
        onDelete,
        isPendingDeleteProduct,
        isSuccessDeleteProduct
    } = useDeleteProduct(`${productId}`);

    useEffect(() => {
      if(isSuccessDeleteProduct) {
        refetch();
        onClose();
      }
    },[isSuccessDeleteProduct])

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
          <ModalContent>
            <ModalHeader>
              Hapus Produk
            </ModalHeader>
            <ModalBody>
              <p>
                Apakah anda yakin ingin mengahpus produk ini ?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="flat" onPress={onClose}>
                Kembali
              </Button>
              <Button color="danger" onPress={onDelete} isDisabled={isPendingDeleteProduct}>
                {isPendingDeleteProduct ? <Spinner size="sm" color="default" /> : "Hapus"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default DeleteProduct;