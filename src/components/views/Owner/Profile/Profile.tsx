import { Tab, Tabs } from "@heroui/react"
import useProfile from "./useProfile"
import TabAvatar from "./TabAvatar";
import TabInfo from "./TabInfo";

const Profile = () => {
    const {
      dataProfile,
      isLoadingDataProfile,
      refetchDataProfile,
      isRefetchingDataProfile
    } = useProfile();

    const totalLoad  = isRefetchingDataProfile || isLoadingDataProfile 

    return (
        <div className="py-12 px-4 lg:px-8">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Detail Store" color="primary" variant="bordered" className="bg-white w-fit rounded-2xl">
              <Tab key="avatar" title="Avatar" className="max-w-3xl">
                <TabAvatar 
                  data={dataProfile?.data?.avatar}
                  name={dataProfile?.data?.fullName}
                  isLoading={totalLoad}
                  refetch={refetchDataProfile}
                />
              </Tab>
              <Tab key="info" title="Info" className="max-w-3xl">
                <TabInfo 
                  data={dataProfile?.data}
                  isLoading={totalLoad}
                  refetch={refetchDataProfile}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
    )
}

export default Profile