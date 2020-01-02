import React from 'react';
import { PanelContext } from '../Tabs';

interface ITabsPanelProps {
  children: React.ReactNode;
  index: number;
}

const TabsPanel: React.FC<ITabsPanelProps> = ({
  children,
  index,
  ...rest
}) => {
  const props = { children, index, ...rest };

  return (
    <PanelContext.Consumer>
      {({panelValue}) => (
        <div
          role="tabpanel"
          hidden={panelValue !== index}
          {...props}
        >
          {children}
        </div>
      )}
    </PanelContext.Consumer>
  );
}

export { TabsPanel };
