import { ReactNode, useMemo } from "react";
import { Tabs } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";

interface EntityTabsProps {
  defaultActiveKey: string;
  children: ReactNode;
  tabKey?: string;
}

const EntityTabs = ({
  defaultActiveKey,
  tabKey = "tab",
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
    if (location.pathname.includes(activeKey) && tab) {
      navigate(location.pathname.replace(activeKey, tab));
    } else {
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
