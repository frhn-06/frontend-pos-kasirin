import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import { useEffect } from "react";
import useCancelTransaction from "./useCancelTransaction";


interface TypeProps {
  onClose: () => void;
  isOpen: boolean;
  transactionId: string | null;
  refetch: () => void;
  status: "cancelled" | "paid";
}
const CancelTransaction = (props: TypeProps) => {
    const {
      onClose,
      isOpen,
      transactionId,
      refetch,
      status
    } = props

    const {
        onCancel,
        isPendingCancelTransaction,
        isSuccessCancelTransaction,

        onUnCancel,
        isPendingUnCancelTransaction,
        isSuccessUnCancelTransaction
    } = useCancelTransaction(`${transactionId}`);

    useEffect(() => {
      if(isSuccessCancelTransaction || isSuccessUnCancelTransaction) {
        refetch();
        onClose();
      }
    },[isSuccessCancelTransaction || isSuccessUnCancelTransaction])

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
          <ModalContent>
            <ModalHeader>
              Cancel Transaksi
            </ModalHeader>
            <ModalBody>
              <p>
                {status === "paid" ? "Apakah anda yakin ingin mencancel order ini ?" : "Apakah anda yakin ingin mensukseskan order ini ?"}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="flat" onPress={onClose}>
                Kembali
              </Button>
              <Button color="danger" onPress={status === "paid" ? onCancel : onUnCancel}>
                {status === "paid" ? 
                isPendingCancelTransaction || isPendingUnCancelTransaction ? <Spinner size="sm" color="default" /> : "Cancel"
                :
                isPendingCancelTransaction || isPendingUnCancelTransaction ? <Spinner size="sm" color="default" /> : "UnCancel"
                }
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default CancelTransaction;