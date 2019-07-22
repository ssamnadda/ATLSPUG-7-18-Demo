//import { StringRepresentable } from "lodash";

export interface INewPageObject {
  title: string;
  contentTypeId: string;
  pageTemplateName: string;
  pageTemplateId: string;
}
export interface ILinkField {
  id?: number;
  title: string;
  href: string;
}
export interface IAlert {
  message: string;
  link?: { title: string; href: string };
}
