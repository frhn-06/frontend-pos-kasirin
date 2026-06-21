import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import useStore from "./useStore";
import TabLogo from "./TabLogo/TabLogo";
import TabInfo from "./TabInfo";

const Store = () => {
    const {
      dataStore,
      isLoadingStore,
      refetchStore,
      isRefetchingStore
    } = useStore();

    const isTotalLoad = isLoadingStore || isRefetchingStore

    return (
        <div className="py-12 px-4 lg:px-8">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Detail Store" color="primary" variant="bordered" className="bg-white w-fit rounded-2xl">
              <Tab key="avatar" title="Avatar" className="max-w-3xl">
                <TabLogo 
                  data={dataStore?.data?.logo}
                  isLoading={isTotalLoad}
                  refetch={refetchStore}
                />
              </Tab>
              <Tab key="info" title="Info" className="max-w-3xl">
                <TabInfo 
                  data={dataStore?.data}
                  isLoading={isTotalLoad}
                  refetch={refetchStore}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
    )
}

export default Store;