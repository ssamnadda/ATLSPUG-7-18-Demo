declare var window: any;
var LOG_LEVEL = 0;

if (window.location.href.toLowerCase().indexOf('log=verbose') > 0)
{
  LOG_LEVEL = 1;
}

const settings = {
    "rptest395.sharepoint.com": {

    },
    "https://m365x835701.sharepoint.com": {
        "FOOTER_LOGO_URL": "https://m365x835701.sharepoint.com/sites/ATLSPUG/Shared%20Documents/atlspug-logo-white-transparent.png",
        "HOME_SITE_PATH": "https://m365x835701.sharepoint.com",
        "SOCIAL_LINKS_URLS_FACEBOOK": "https://www.facebook.com",
        "SOCIAL_LINKS_URLS_TWITTER": "https://www.twitter.com",
        "SOCIAL_LINKS_URLS_YOUTUBE": "https://www.youtube.com",
        "SOCIAL_LINKS_URLS_LINKEDIN": "https://www.linkedin.com",
        "LOG_LEVEL": LOG_LEVEL,
        "AZURE_API_URL": "https://rptest395-api.azurewebsites.net/api/",
        "AUTHENTICATION": {
          instance: "https://login.microsoftonline.com/",
          tenant: "rptest.onmicrosoft.com",
          cacheLocation: "localStorage",
          //NOTE: need to use the GUID instead of the APP ID URL because we are bypassing the SP client and essentially requesting access to itself which requires the use of the Application ID GUID
          clientId: "40602b7b-ce54-4d30-9426-960cb2acb52b" //this is from "Application ID" property of AzureAD app in Azure
        }
    }
};

if (window.location.href.toLowerCase().indexOf('home-uat') > 0)
{
    settings["https://m365x835701.sharepoint.com"]["AZURE_API_URL"] = "https://rptest395-apiv1.azurewebsites.net/api/";
}

/// Get a configuration value based on the url of the tenant
export const urlBasedSettingsInjector = (settingName: string) => {
  let url = window.location.hostname;

  if (!settings[url]) {
    throw new Error(`App does not contain configuration for ${url} site`);
  }
  if (!settings[url][settingName]) {
    console.warn(`App does not contain a setting for ${url} and ${settingName}`);
  }
  return settings[url][settingName];
};
