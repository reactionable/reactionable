import { IId } from "@reactionable/core/lib/crud/Crud";
import { IUseListOptions, IUseListResult } from "@reactionable/core/lib/crud/list/useList";
import { IUseReadOptions, IUseReadResult } from "@reactionable/core/lib/crud/read/useRead";
import { IFormData, IFormValues } from "@reactionable/core/lib/form/Form";

import { ICreateProps } from "./create/Create";
import { IUpdateProps } from "./update/Update";

export type ICrudConfig<
  Values extends IFormValues = IFormValues,
  Data extends IFormData = IFormData,
  Id extends IId = IId
> = {
  onCreate: ICreateProps<Values, Data>["form"]["onSubmit"];
  onUpdate: IUpdateProps<Values & { id: Id }, Data>["form"]["onSubmit"];
  onDelete: (id: Id) => Promise<unknown>;
  useRead: (variables?: IUseReadOptions<Data>["variables"]) => IUseReadResult<Data>;
  useList: (variables?: IUseListOptions<Data>["variables"]) => IUseListResult<Data>;
  initialValues: ICreateProps<Values, Data>["form"]["initialValues"];
  validationSchema: ICreateProps<Values, Data>["form"]["validationSchema"];
  formChildren: ICreateProps<Values, Data>["form"]["children"];
};
