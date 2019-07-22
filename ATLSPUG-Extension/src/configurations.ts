import { urlBasedSettingsInjector } from "./utils/urlBasedSettingsInjector";

export default class Configurations {
  public static readonly FOOTER_LOGO_URL = urlBasedSettingsInjector("FOOTER_LOGO_URL");
  public static readonly HOME_SITE_PATH = urlBasedSettingsInjector("HOME_SITE_PATH");
  public static readonly SOCIAL_LINKS_URLS_FACEBOOK = urlBasedSettingsInjector("SOCIAL_LINKS_URLS_FACEBOOK");
  public static readonly SOCIAL_LINKS_URLS_TWITTER = urlBasedSettingsInjector("SOCIAL_LINKS_URLS_TWITTER");
  public static readonly SOCIAL_LINKS_URLS_LINKEDIN = urlBasedSettingsInjector("SOCIAL_LINKS_URLS_LINKEDIN");
  public static readonly SOCIAL_LINKS_URLS_YOUTUBE = urlBasedSettingsInjector("SOCIAL_LINKS_URLS_YOUTUBE");
  public static readonly LOG_LEVEL = urlBasedSettingsInjector("LOG_LEVEL");
  public static readonly AUTHENTICATION = urlBasedSettingsInjector("AUTHENTICATION");
}
