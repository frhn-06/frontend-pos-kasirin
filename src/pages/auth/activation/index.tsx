import ActivationLayout from "@/components/layouts/ActivationLayout"
import Activation from "@/components/views/Activation";
import AuthService from "@/services/auth.service";

const PageActivation = (props: {status : "success" | "failed"}) => {
    const {
      status
    } = props;
    return (
        <ActivationLayout title="Activation">
          <Activation status={status} />
        </ActivationLayout>
    )
}


interface Context {
  query: {
    code: string;
  }
}
export async function getServerSideProps(context: Context) {
    try {
      const result = await AuthService.activation({code: context.query.code});
      if(result.data.data) {
        return {
          props: {
            status: "success"
          }
        }
      } else {
        return {
          props: {
            status: "failed"
          }
        }
      }

    } catch(error) {
      return {
        props: {
          status: "failed"
        }
      }
    }
}


export default PageActivation;