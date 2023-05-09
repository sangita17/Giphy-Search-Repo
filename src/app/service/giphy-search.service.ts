import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { distinct } from 'rxjs/operators';
import { GifData, SearchReqeust, GiphyResult } from './giphy-model';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  static readonly giphyUrl = 'https://api.giphy.com/v1/gifs/search';
  static readonly giphyApiKey = 'fplmvx8SXBNfVr2lvEKkibWPwyky5KXG'; 

  private readonly rating = 'G';
  private readonly lang = 'en';

  currentOffset = 0;
  currentSearchTerm = '';
  pageSize = 20;

  imageResult:GifData[] = [];

  searchResultsSubject = new Subject<Array<GifData>>();
  searchResults$ = new Observable<Array<GifData>>();
  loadingSubject = new Subject<boolean>();
  loading$ = new Observable<boolean>();

  searchRequest = new Subject<SearchReqeust>();
  refreshStoreImage = new Subject<boolean>();

  resetSearch = new Subject<any>();

  constructor(private http: HttpClient) {
    //Observable to reflect the Result back to Component
    this.searchResults$ = this.searchResultsSubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();
    this.searchRequest.pipe(
      distinct(request => request.offset, this.resetSearch),
    ).subscribe((request) => {
      this.getSearchResults(request.searchTerm, request.offset, request.pageSize);
    });
  }

  private getSearchResults(searchTerm: string, offset: number, pageSize: number) {
    const params = {
      api_key: GiphyService.giphyApiKey,
      q: searchTerm,
      limit: pageSize.toString(),
      offset: offset.toString(),
      rating: this.rating,
      lang: this.lang
    };

    this.http.get<GiphyResult>(GiphyService.giphyUrl, { params }).subscribe((giphyResult) => {
      this.imageResult = this.imageResult.concat(giphyResult.data);
      this.currentOffset = giphyResult.pagination.offset + giphyResult.pagination.count;
      this.searchResultsSubject.next(this.imageResult);
      this.loadingSubject.next(false)
    });
  }

  search(searchTerm: string) {
    this.resetSearch.next(searchTerm);
    this.currentSearchTerm = searchTerm;
    this.currentOffset = 0;
    this.imageResult = [];
    this.searchResultsSubject.next(this.imageResult);
    this.loadingSubject.next(true)
    //Load First 20
    this.searchRequest.next({ searchTerm: this.currentSearchTerm, offset: this.currentOffset, pageSize: this.pageSize });
  }

  next() {
    //Load next 20
    this.searchRequest.next({ searchTerm: this.currentSearchTerm, offset: this.currentOffset, pageSize: this.pageSize });
  }

 downloadFile(targetUrl:string,filename: string){
  this.http.get(targetUrl,{ observe: 'body', responseType: 'blob' as 'json' })
        .subscribe(
          (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
        )
      }
}
