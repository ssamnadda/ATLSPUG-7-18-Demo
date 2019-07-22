import * as classnames from "classnames";
import { observer } from "mobx-react";
import * as React from "react";

import MegaMenuList from "../MegaMenuList";
import { MeganavStore, meganavStore } from "../MeganavStore";
import styles from "../siteMeganav.module.scss";
import TopLevelItemContainer from "./TopLevelItemContainer";
import MdAdd from "react-ionicons";
import MdRemove from "react-ionicons";

export interface ITopLevelItemProps {
  readonly heading: string;
  readonly subLinks?: Array<any>;
  onClick?: (any) => void;
  url?: string;
}

const TopLevelItemNoLinks = () => {
  return (
    <p className={styles.noSublinks}>No links configured for this menu.</p>
  );
};

const ATagNoLink = ({ children }): JSX.Element => {
  return <a className={styles.pointer}>{children}</a>;
};

const ATag = ({
  children,
  url
}: {
  children: any;
  url?: string;
}): JSX.Element => {
  return url ? (
    <a style={{ cursor: "pointer" }} href={url} target={"_blank"}>
      {children}
    </a>
  ) : (
    <ATagNoLink>{children}</ATagNoLink>
  );
};

@observer
export class TopLevelItem extends React.Component<ITopLevelItemProps, {}> {
  constructor(props) {
    super(props);
  }

  private store: MeganavStore = meganavStore;

  public render(): JSX.Element {
    const { heading, subLinks } = this.props;
    const store = this.store;
    const activeMenuItemHeadingText = store.activeMenuItemHeadingText;
    const isActive = activeMenuItemHeadingText === heading;

    return (
      <li
        className={isActive ? styles.active : ""}
        onClick={e =>
          this.props.onClick
            ? this.props.onClick(e)
            : store.openMenuAtItem(heading, e)
        }
      >
        <ATag url={this.props.url}>
          {heading}
          <span className={styles.accordionIcons}>
            <MdAdd
              fontSize="1em"
              className={[styles.accordionIcon, styles.plusIcon].join(" ")}
            />
            <MdRemove
              fontSize="1em"
              className={[styles.accordionIcon, styles.minusIcon].join(" ")}
            />
            <TopLevelItemContainer display={isActive}>
              {subLinks ? (
                subLinks.map((item, index) => {
                  return (
                    <MegaMenuList
                      parentHeading={heading}
                      key={index}
                      {...item}
                    />
                  );
                })
              ) : (
                <TopLevelItemNoLinks />
              )}
            </TopLevelItemContainer>
          </span>
        </ATag>
      </li>
    );
  }
}
