import { ReactNode, useMemo } from "react";
import { Tabs } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";

interface EntityTabsProps {
  defaultActiveKey: string;
  children: ReactNode;
  onSelect?: (tab: string | null) => void;
  tabKey?: string;
}

const EntityTabs = ({
  defaultActiveKey,
  tabKey = "tab",
  onSelect,
  children,
}: EntityTabsProps) => {
  const params = useParams();
  const location = useLocation();
  const activeKey = useMemo(
    () => params[tabKey] || defaultActiveKey,
    [location.pathname, defaultActiveKey]
  );
  const navigate = useNavigate();

  const handleOnSelect = (tab: string | null) => {
    if (onSelect) onSelect(tab);
    if (location.pathname.includes(activeKey) && tab) {
      console.log(
        `Case1 replacing [${activeKey}] with [${tab}] result: [${location.pathname.replace(
          activeKey,
          tab
        )}]`
      );
      navigate(location.pathname.replace(activeKey, tab));
    } else {
      console.log("case2");
      navigate(location.pathname.replace(activeKey, "") + "/" + tab);
    }
  };

  return (
    <Tabs activeKey={activeKey} onSelect={handleOnSelect}>
      {children}
    </Tabs>
  );
};

export default EntityTabs;
