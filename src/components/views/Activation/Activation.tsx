const Activation = (props: {status: "success" | "failed"}) => {
    const {
      status
    } = props;

    return (
        <div>
          {status === "success" ? "sukses aktivasi" : "gagal aktivasi"}
        </div>
    )
}

export default Activation;