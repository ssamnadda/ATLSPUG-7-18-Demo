import * as React from 'react';
import TopLevelItemCustomContent from "./TopLevelItem/TopLevelItemCustomContent";

export interface IMeganavPopoutMenuProps {
    popoutTitle: string;
    children?: any;
}

class MeganavPopoutMenu extends React.Component<IMeganavPopoutMenuProps, {}> {
    public render() {
        return <TopLevelItemCustomContent heading={this.props.popoutTitle}>
                {
                    this.props.children
                }
        </TopLevelItemCustomContent>;
    }
}

export default MeganavPopoutMenu;