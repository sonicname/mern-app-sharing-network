export interface ISources {
  sources: {
    url: string;
    proxy_url: string;
  };
}

export interface IPostImage {
  page: string;
  files: ISources[];
}

export interface IRequestGetImage extends IPostImage {
  totalPages: number;
}
