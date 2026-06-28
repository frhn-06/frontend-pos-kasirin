import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteCategory from "./useDeleteCategory";
import { useEffect } from "react";


interface TypeProps {
  onClose: () => void;
  isOpen: boolean;
  categoryId: string;
  refetch: () => void;
}
const DeleteCategory = (props: TypeProps) => {
    const {
      onClose,
      isOpen,
      categoryId,
      refetch
    } = props

    const {
      onDelete,
      isPendingDeleteCategory,
      isSuccessDeleteCategory
    } = useDeleteCategory(`${categoryId}`);

    useEffect(() => {
      if(isSuccessDeleteCategory) {
        refetch();
        onClose();
      }
    },[isSuccessDeleteCategory])

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
          <ModalContent>
            <ModalHeader>
              Hapus Kategori
            </ModalHeader>
            <ModalBody>
              <p>
                Apakah anda yakin ingin mengahpus kategori ini ?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="flat" onPress={onClose}>
                Kembali
              </Button>
              <Button color="danger" onPress={onDelete} isDisabled={isPendingDeleteCategory}>
                {isPendingDeleteCategory ? <Spinner size="sm" color="default" /> : "Hapus"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default DeleteCategory;