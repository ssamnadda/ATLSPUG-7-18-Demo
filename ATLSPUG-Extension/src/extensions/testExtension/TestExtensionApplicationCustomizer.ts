import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';

import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import { SPPermission } from '@microsoft/sp-page-context';
import * as jQuery from "jquery";
import MeganavRootContainer from "../../components/Meganav/MeganavRootContainer";

import * as React from "react";
import * as ReactDom from "react-dom";

import Footer, { IFooterProps } from "../../components/Footer/Footer";
import Configurations from '../../configurations';


import * as strings from 'TestExtensionApplicationCustomizerStrings';

const LOG_SOURCE: string = 'TestExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITestExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TestExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<ITestExtensionApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

   /* let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);*/

    this.renderTopNav();
    this.setupFooter();

    //https://m365x835701.sharepoint.com/sites/ATLSPUG/SiteAssets/localstyle-overrides.css
    //SPComponentLoader.loadCss(InjectedSettings.PATH_TO_CSS_OVERRIDE_FILE);
    
    /*let permissionsToCheck = [SPPermission.editListItems];
    if (this.context.pageContext.web.permissions.hasAllPermissions(...permissionsToCheck)) {
      console.log("unhiding suite nav because user has editListItems");
      jQuery("#SuiteNavPlaceHolder").attr('style', 'display: flex !important');
    }*/


    return Promise.resolve();
  }
  
  private renderTopNav() {
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        {
          onDispose: this._onDispose
        }
      );

     const element: React.ReactElement<any> = React.createElement(
        MeganavRootContainer,
        {
          siteUrl: '#',//Configurations.HOME_SITE_PATH,
          termsetId: '#',//Configurations.SITEMAP_TERMSET_ID,
          termsetName: "SiteMap",
          searchCenterUrl: '#',//Configurations.GLOBAL_SEARCH_PAGE_PATH,
          externalLinksOpenInNewWindow: false,
          indexDocIdOfSite: 1,
          showBreadcrumbs: false,
          store: '#'//meganavStore
        }
      );

      setTimeout(
        () => ReactDom.render(element, this._topPlaceholder.domElement),
        1
      );
    }
  }

  public setupFooter() {
    this._renderFooterPlaceHolder();
  }

  private _renderFooterPlaceHolder() {
    // handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      // the extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }
/**/
      if (this.properties) {
        if (this._bottomPlaceholder.domElement) {
          const footerProps: IFooterProps = {
            logoImageUrl: 'https://m365x835701.sharepoint.com/sites/ATLSPUG/Shared%20Documents/atlspug-logo-white-transparent.png',//Configurations.FOOTER_LOGO_URL,
            logoLinkUrl: '#',//Configurations.HOME_SITE_PATH,
            facebookUrl: '#',//Configurations.SOCIAL_LINKS_URLS_FACEBOOK,
            twitterUrl: '#',//Configurations.SOCIAL_LINKS_URLS_TWITTER,
            youTubeUrl: '#',//Configurations.SOCIAL_LINKS_URLS_YOUTUBE,
            linkedInUrl: '#',//Configurations.SOCIAL_LINKS_URLS_LINKEDIN
          };

          const footerElement = React.createElement(Footer, footerProps);
          setTimeout(() => {
            ReactDom.render(footerElement, this._bottomPlaceholder.domElement);
          }, 1);
        }
      }
      
    }
  }
  
  private _onDispose(): void {
    // disposeNewPageButtonInterceptor();

    if (this._topPlaceholder) {
      ReactDom.unmountComponentAtNode(this._topPlaceholder.domElement);
    }

    if (this._bottomPlaceholder) {
      ReactDom.unmountComponentAtNode(this._bottomPlaceholder.domElement);
    }
  }
}
