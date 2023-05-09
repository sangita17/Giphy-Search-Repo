import { Component, Input, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/service/giphy-search.service';

@Component({
  selector: 'app-search-giphy',
  templateUrl: './search-giphy.component.html',
  styleUrls: ['./search-giphy.component.scss']
})
export class SearchGiphyComponent implements OnInit {
  @Input()
  storedImages: any

  @Input()
  localStore: any
  @Input()
  imageCount :any

  constructor(public giphyService: GiphyService) { }
  
  ngOnInit(): void {
  }
  search(searchText: string) {
    this.giphyService.search(searchText);
  }
  addToStore(url: string,id: string,title: string){
    let value=[url,title,Date.now()]
    localStorage.setItem('giphy*'+id,JSON.stringify(value))
    this.giphyService.refreshStoreImage.next(true)
  }
  onLoadMore() {
      this.giphyService.next();
  }

  saveImage(url: string,filename: string)
  {
    this.giphyService.downloadFile(url,filename)
  }

}
