import { IFormData, IFormValues, IUseListQuery, IUseReadQuery } from "@reactionable/core";

import { ICreateProps } from "./create/Create";
import { IUpdateProps } from "./update/Update";

export type IUseCrudConfigResult<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData
> = {
  onCreate: ICreateProps<Values, Data>["form"]["onSubmit"];
  onUpdate: IUpdateProps<Values, Data>["form"]["onSubmit"];
  onDelete: (id: string | number) => unknown;
  useRead: IUseReadQuery<Data>;
  useList: IUseListQuery<Data>;
  initialValues: ICreateProps<Values, Data>["form"]["initialValues"];
  validationSchema: ICreateProps<Values, Data>["form"]["validationSchema"];
  formChildren: ICreateProps<Values, Data>["form"]["children"];
};
