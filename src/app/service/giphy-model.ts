export interface GiphyResult {
    data: GifData[];
    pagination: {
      count: number;
      offset: number;
    };
  }
  
  export interface GifData {
    images: {
      fixed_width: {
        url: string;
      };
    };
    title: string;
    id:string;
  }
  
  export interface SearchReqeust {
    searchTerm: string;
    offset: number;
    pageSize: number;
  }