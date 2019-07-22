import * as classnames from "classnames";
//import { observer } from "mobx-react";
import * as React from "react";
import styles from "./siteMeganav.module.scss";
import { Navigation } from "spfx-navigation";

export interface IMeganavProps {
  siteUrl: string;
  termsetId: string;
  termsetName: string;
  searchCenterUrl: string;
  externalLinksOpenInNewWindow: boolean;
  indexDocIdOfSite: string;
  showBreadcrumbs: boolean;
  showMyLinks: boolean;
}
export interface IMeganavState {
  meganavElementHeight: number;
  meganavElementWidth: number;
}

const SiteLogo = (): JSX.Element => {
  let src = "https://m365x835701.sharepoint.com/sites/ATLSPUG/Shared%20Documents/atlspug-logo-white-transparent.png"
  return (
    <a href="https://m365x835701.sharepoint.com">
      <img src={src} alt="home" height="45" width="170" />
    </a>
  );
};

//@observer
class Meganav extends React.Component<IMeganavProps, IMeganavState> {
  private meganavElement;

  constructor(props: any) {
    super(props);
    this.state = {
      meganavElementHeight: 0,
      meganavElementWidth: 0
    };
    this.onSearch = this.onSearch.bind(this);
  }

  public onSearch(searchString: string): void {
    Navigation.navigate(
      `https://m365x835701.sharepoint.com/sites/home/SitePages/Search.aspx?title=Search#${searchString}`
    );
    //this.store.setSearchBoxClosed();
    //this.store.clearSearch();
  }
  public componentDidMount() {
    const meganavElementHeight = this.meganavElement.clientHeight;
    this.setState({ meganavElementHeight });
  }
  public render(): React.ReactElement<IMeganavProps> {

    const containerClass: string = [styles.container, "container"].join(" ");

    return (
      <div className={styles.meganavControl}>
        <header className={styles.header}>
          <div className={containerClass}>
            <div className={styles.row}>
              <div className={styles.column}>
                <nav className={classnames(styles.navigation, "navigation")}>
                  <div style={{ paddingTop: "5px" }}
                    ref={meganavElement => {
                      this.meganavElement = meganavElement;
                    }}
                  >
                    <SiteLogo />
                  </div>

                  <div className={styles.rightSideBox}>
                    searchform
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
        {this.props.showBreadcrumbs && (
          <div>
           breadcrumbs
          </div>
        )}
      </div>
    );
  }
}

export { Meganav };
