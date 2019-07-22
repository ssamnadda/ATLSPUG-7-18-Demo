import * as React from "react";
import * as classnames from "classnames";
//import { observer } from "mobx-react";
import styles from "./siteMeganav.module.scss";

const SiteLogo = (): JSX.Element => {
  let src = "https://m365x835701.sharepoint.com/sites/ATLSPUG/Shared%20Documents/atlspug-logo-white-transparent.png"
  return (
    <a href="https://m365x835701.sharepoint.com">
      <img src={src} alt="home" height="45" width="170" />
    </a>
  );
};

export class RootComponent extends React.Component<any, {}> {
  public render() {

    const containerClass: string = [styles.container, "container"].join(" ");

    return (
      <div className={styles.meganavControl}>
        <header className={styles.header}>
          <div className={containerClass}>
            <div className={styles.row}>
              <div className={styles.column}>
                <nav className={classnames(styles.navigation, "navigation")}>
                  <div style={{ paddingTop: "5px" }}>
                    <SiteLogo />
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

export default RootComponent;
