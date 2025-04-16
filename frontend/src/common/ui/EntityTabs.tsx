import { ReactNode, useMemo } from "react";
import { Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

interface EntityTabsProps {
  route: string;
  defaultActiveKey: string;
  children: ReactNode;
}

const EntityTabs = ({ route, defaultActiveKey, children }: EntityTabsProps) => {
  const location = useLocation();
  const activeKey = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean); // removes empty strings
    return segments[segments.length - 1] || defaultActiveKey;
  }, [location.pathname, defaultActiveKey]);
  const navigate = useNavigate();

  const handleOnSelect = (tab: string | null) => {
    navigate(route + "/" + tab);
  };

  return (
    <Tabs activeKey={activeKey} onSelect={handleOnSelect}>
      {children}
    </Tabs>
  );
};

export default EntityTabs;
