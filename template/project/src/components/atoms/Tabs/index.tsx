import {
  Tabs as TabsM,
  Tab as TabM,
  TabsProps,
} from "@mui/material";
import { classNames } from "utils";


export const Tab = TabM;
type TabsProp = TabsProps;

export const Tabs: React.FC<TabsProp> = ({ children, className, ...ref }) => {
  return (
    <TabsM {...ref} className={classNames("Tabs", className)}>
      {children}
    </TabsM>
  );
};
