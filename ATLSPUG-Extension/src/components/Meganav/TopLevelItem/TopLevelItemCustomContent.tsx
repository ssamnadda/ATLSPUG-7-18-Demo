import * as classnames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';

import MegaMenuList from '../MegaMenuList';
import { MeganavStore, meganavStore } from '../MeganavStore';
import styles from '../siteMeganav.module.scss';
import TopLevelItemContainer from './TopLevelItemContainer';
import { observable, action, computed } from 'mobx';

const Ionicon = (require("react-ionicons") as any).default;

export interface ITopLevelItemCustomContentProps {
    readonly heading: string;
}

@observer
export default class TopLevelItemCustomContent extends React.Component<ITopLevelItemCustomContentProps, {}> {

    @observable subMenuIsOpen = false;
    @action openSubMenu() {
        if (!this.store.lastClickWasCloseButtonPopout) {
            this.subMenuIsOpen = true;
            this.store.additionalPopoutOpen = true;
            this.store.activeMenuItemHeadingText = null;
        } else {
            this.subMenuIsOpen = false;
            this.store.additionalPopoutOpen = false;
        }
        this.store.lastClickWasCloseButtonPopout = false;
    }
    @action closeSubMenu() {
        this.subMenuIsOpen = false;
    }

    @computed get isActive() {
        return this.store.additionalPopoutOpen;
    }

    constructor(props) {
        super(props);
    }

    private store: MeganavStore = meganavStore;

    public render(): JSX.Element {

        const activeClass = this.isActive ? 'active' : '';

        return (
            <li className={classnames(activeClass, "additional-meganav-content")} onClick={() => this.openSubMenu()}>
                <a href="#">
                    {this.props.heading}

                    <span className={styles.accordionIcons}>
                        <Ionicon
                            icon="md-add"
                            fontSize="1em"
                            className={[styles.accordionIcon, styles.plusIcon].join(' ')}
                        />
                        <Ionicon
                            icon="md-remove"
                            fontSize="1em"
                            className={[styles.accordionIcon, styles.minusIcon].join(' ')}
                        />
                    </span>
                </a>
                <TopLevelItemContainer display={this.isActive} onClick={() => meganavStore.closeAdditionalPopout()}>
                    {
                        this.props.children
                    }
                </TopLevelItemContainer>
            </li>
        );
    }
}