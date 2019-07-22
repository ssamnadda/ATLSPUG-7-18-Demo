import * as React from "react";
import styles from "./footer.module.scss";
import FacebookSVG from "../../common/Icons/Facebook";
import TwitterSVG from "../../common/Icons/Twitter";
import LinkedInSVG from "../../common/Icons/LinkedIn";
// /import { ListService } from "services/ListService";
import { ILinkField } from "../../common/Types";

export interface ISocialIcon {
  href: string;
  icon: JSX.Element;
  className?: string;
}

// if you dont put a url for one of the social links it doesn't show up in the footer
export interface IFooterProps {
  logoImageUrl: string;
  logoLinkUrl: string;
  facebookUrl?: string;
  twitterUrl?: string;
  youTubeUrl?: string;
  linkedInUrl?: string;
}

export interface IFooterState {
  isOpen: boolean;
  footerLinks: Array<ILinkField>;
}

export default class Footer extends React.Component<
  IFooterProps,
  IFooterState
> {
  constructor(props: IFooterProps) {
    super(props);

    this.state = {
      isOpen: false,
      footerLinks: []
    };
  }
  public componentDidMount() {
   /* ListService.getFooterLinks().then((links: Array<ILinkField>) => {
      this.setState({ footerLinks: links });
    });*/
  }
  private handleSocialMediaClick(): void {
    this.setState({ isOpen: !this.state.isOpen });
  }

  public render() {
    const socialItems: ISocialIcon[] = [
      {
        href: this.props.facebookUrl,
        icon: <FacebookSVG />,
        className: styles.facebook
      },
      {
        href: this.props.twitterUrl,
        icon: <TwitterSVG />,
        className: styles.twitter
      },
      {
        href: this.props.linkedInUrl,
        icon: <LinkedInSVG />,
        className: styles.linkedin
      }
    ];

    return (
      <footer className={styles.siteFooter}>
        <div className={styles.container}>
          <div className={styles.row}>
            { 
            <div
              className={styles.socialIcons}
              style={{ display: this.state.isOpen ? "" : "none" }}
            >
              {socialItems
                .filter(p => p.href)
                .map((item, i) => {
                  return (
                    <a
                      key={i}
                      href={item.href}
                      className={item.className}
                      target="_blank"
                    >
                      {item.icon}
                    </a>
                  );
                })}
            </div> }
            <div className={styles.logo}>
                <a href={this.props.logoLinkUrl}>
                  <img src={this.props.logoImageUrl} alt="logo" />
                </a>
              </div>



          </div>
        </div>
      </footer>
    );
  }
}
