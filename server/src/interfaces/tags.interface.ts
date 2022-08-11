interface IName {
  name: string;
}

export interface ITag extends IName {}

export interface ICreateTagRequest extends IName {}

export interface IUpdateTagRequest extends IName {
  newName: string;
}

export interface IDeleteTagRequest extends IName {}
